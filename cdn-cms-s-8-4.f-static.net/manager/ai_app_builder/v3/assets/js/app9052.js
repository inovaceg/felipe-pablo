// Explain: Interactions for booking forms, navigation, and scroll CTA.
document.addEventListener('DOMContentLoaded', function() {
    var mobileBookButton = document.getElementById('mobileBookButton');
    var bookingOverlay = document.getElementById('bookingOverlay');
    var closeBookingOverlay = document.getElementById('closeBookingOverlay');
    var bookingForm = document.getElementById('bookingForm');
    var overlayBookingForm = document.getElementById('overlayBookingForm');

    // Navigation Overlay Elements
    var navOpenButton = document.getElementById('navOpenButton');
    var navCloseButton = document.getElementById('navCloseButton');
    var navOverlay = document.getElementById('navOverlay');
    var navCloseLinks = document.querySelectorAll('.nav-close-link');

    function getValue(formEl, name) {
        var field = formEl && formEl.elements ? formEl.elements[name] : null;
        return field && typeof field.value === 'string' ? field.value : '';
    }

    // Form Status Handlers
    function showStatus(formEl, type, message) {
        var key = formEl && formEl.id === 'overlayBookingForm' ? 'overlay' : 'booking';
        var status = document.querySelector('[data-form-status="' + key + '"]');
        if (!status) {
            return;
        }
        status.textContent = message;
        status.classList.remove('success', 'error');
        status.classList.add(type);
    }

    function setSubmitting(formEl, isSubmitting) {
        if (!formEl) {
            return;
        }
        var button = formEl.querySelector('button[type="submit"]');
        if (!button) {
            return;
        }
        button.disabled = isSubmitting;
        button.textContent = isSubmitting ? 'Enviando...' : 'Enviar mensagem';
    }

    function submitBookingForm(formEl) {
        if (!formEl) {
            return;
        }
        if (!formEl.checkValidity()) {
            formEl.reportValidity();
            return;
        }
        if (!window.MessagesSystem || typeof window.MessagesSystem.submit !== 'function') {
            showStatus(formEl, 'error', 'O envio está indisponível no momento. Tente novamente em instantes.');
            return;
        }

        setSubmitting(formEl, true);
        showStatus(formEl, 'success', 'Enviando sua mensagem...');

        window.MessagesSystem.submit([
            { label: 'Nome', value: getValue(formEl, 'name'), type: 'text' },
            { label: 'E-mail', value: getValue(formEl, 'email'), type: 'email' },
            { label: 'Telefone', value: getValue(formEl, 'phone'), type: 'tel' },
            { label: 'Serviço de interesse', value: getValue(formEl, 'service'), type: 'select' },
            { label: 'Mensagem', value: getValue(formEl, 'message'), type: 'textarea' }
        ], formEl).then(function(response) {
            if (response && response.success) {
                formEl.reset();
                showStatus(formEl, 'success', 'Obrigado! Sua mensagem foi enviada e você receberá uma resposta em breve.');
            } else {
                showStatus(formEl, 'error', response && response.error ? response.error : 'Não foi possível enviar sua mensagem. Tente novamente.');
            }
        }).catch(function() {
            showStatus(formEl, 'error', 'Um problema de conexão impediu o envio. Tente novamente.');
        }).finally(function() {
            setSubmitting(formEl, false);
        });
    }

    // Overlay controls for Booking
    function openBookingOverlay() {
        if (!bookingOverlay) {
            return;
        }
        bookingOverlay.classList.add('is-open');
        bookingOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        var firstInput = bookingOverlay.querySelector('input[name="name"]');
        if (firstInput) {
            firstInput.focus();
        }
    }

    function closeBookingOverlayFn() {
        if (!bookingOverlay) {
            return;
        }
        bookingOverlay.classList.remove('is-open');
        bookingOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Overlay controls for Navigation
    function openNav() {
        if (!navOverlay) return;
        navOverlay.classList.remove('hidden');
        navOverlay.classList.add('flex');
        navOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        if (!navOverlay) return;
        navOverlay.classList.add('hidden');
        navOverlay.classList.remove('flex');
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Listeners for Forms and Bookings
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitBookingForm(event.currentTarget);
        });
    }

    if (overlayBookingForm) {
        overlayBookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitBookingForm(event.currentTarget);
        });
    }

    if (mobileBookButton) {
        mobileBookButton.addEventListener('click', openBookingOverlay);
    }

    if (closeBookingOverlay) {
        closeBookingOverlay.addEventListener('click', closeBookingOverlayFn);
    }

    if (bookingOverlay) {
        bookingOverlay.addEventListener('click', function(event) {
            if (event.target === bookingOverlay) {
                closeBookingOverlayFn();
            }
        });
    }

    // Listeners for Navigation Menu
    if (navOpenButton) {
        navOpenButton.addEventListener('click', openNav);
    }

    if (navCloseButton) {
        navCloseButton.addEventListener('click', closeNav);
    }

    if (navCloseLinks) {
        navCloseLinks.forEach(function(link) {
            link.addEventListener('click', closeNav);
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeBookingOverlayFn();
            closeNav();
        }
    });
});