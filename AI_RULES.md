# Project Guidance

## Tech stack
- Build the app with React and TypeScript.
- Use React Router for client-side routing; keep route definitions in `src/App.tsx`.
- Put all application source code under `src/`.
- Put page components in `src/pages/` and reusable UI components in `src/components/`.
- The default page is `src/pages/Index.tsx`; include new components there when they should appear on the main page.
- Use Tailwind CSS for styling, including layout, spacing, responsive behavior, and colors.
- Prefer the installed shadcn/ui components and their Radix UI foundations for standard interface elements.
- Use `lucide-react` for interface icons.

## Library and implementation rules
- Use React for UI and TypeScript for application code; do not introduce another UI framework.
- Use React Router for navigation and route handling. Keep routes in `src/App.tsx` rather than scattering route definitions across pages.
- Use shadcn/ui for common controls and patterns such as buttons, dialogs, forms, menus, and cards. Import existing components; do not edit the library's component files. Create app-specific components in `src/components/` when composition or custom behavior is needed.
- Use Radix UI primitives through shadcn/ui when a suitable shadcn/ui component exists; avoid adding a separate component library for the same needs.
- Use Tailwind utility classes for styling. Avoid introducing another CSS framework or styling system; add custom CSS only when utility classes are not a suitable fit.
- Use `lucide-react` for icons instead of emoji or a second icon package.
- Keep pages in `src/pages/` and reusable components in `src/components/`; update `src/pages/Index.tsx` to render newly created components intended for the default page.
