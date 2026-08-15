---
title: Integrate amoCRM lead form
description: Replace the custom lead form with an official amoCRM embedded form script and container.
---

## User Request
The user wants to integrate an amoCRM form into the website to handle leads and ensure they are sent directly to their amoCRM account.

## Technical Details
- **amoCRM Script**: An initialization script and an external script `https://forms.amocrm.ru/forms/assets/js/amoforms.js` need to be loaded.
- **Placement**: The `LeadForm` component in `src/components/site/LeadForm.tsx` will be modified to render the amoCRM container instead of the manual React form.
- **Script Injection**: We will use a `useEffect` hook in the component to safely inject the scripts into the DOM when the component mounts, ensuring it doesn't break SSR.

## Implementation Plan

### 1. Update LeadForm Component
- Modify `src/components/site/LeadForm.tsx`.
- Remove the manual form state (`status`, `errors`, `onSubmit`).
- Remove the `form` JSX.
- Add a `useEffect` to inject the amoCRM script and initialization code.
- Provide a target container with the ID or class expected by amoCRM (usually it looks for a script with a specific ID, but here the provided script seems to append itself or target a specific ID).
- *Observation*: The provided script uses `a[o+r]({id:\"1738426\", ...})` and looks for script `amoforms_script_1738426`.

### 2. Clean up unused code
- Remove `src/lib/leads.schema.ts`, `src/lib/leads.functions.ts`, and `src/lib/leads.server.ts` if they are no longer needed (since amoCRM handles the submission directly).

### 3. Verify
- Open the preview and ensure the form renders correctly.
