# Project Guidance

## Tech stack
- Build the app with React and TypeScript.
- Use React Router for client-side navigation; keep route definitions in `src/App.tsx`.
- Keep application source code under `src/`.
- Put page components in `src/pages/` and reusable UI components in `src/components/`.
- The default page is `src/pages/Index.tsx`; include newly created visible components there when appropriate.
- Use Tailwind CSS utility classes for layout, spacing, colors, typography, and responsive styling.
- Prefer the installed shadcn/ui components for common interface patterns, importing them rather than modifying their component files.
- Use `lucide-react` for interface icons.

## Library rules
- **Routing:** Use React Router for navigation and route rendering. Do not introduce another routing library; define routes in `src/App.tsx`.
- **UI primitives and accessible patterns:** Use existing shadcn/ui components (built on Radix UI) for buttons, dialogs, menus, form controls, and similar patterns. Create app-specific wrappers in `src/components/` rather than editing shadcn/ui files.
- **Styling:** Use Tailwind CSS classes. Avoid adding a separate styling framework or CSS-in-JS library; use a small CSS rule only when utility classes cannot reasonably express the needed styling.
- **Icons:** Use `lucide-react`; do not add another icon package.
- **Types:** Write new application code in TypeScript and use the types provided by the libraries in use.
- **Dependencies:** Prefer the libraries already installed for their intended purposes. Add a dependency only when the existing stack cannot reasonably meet the requirement.
