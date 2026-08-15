---
title: Simplifying the lead form and removing external integrations
description: Remove Google Sheets connection and simplify the lead form to only include Name, Phone, and Email fields with validation.
---

## Simplification Plan

The user wants to remove Google Sheets integration and simplify the lead form to collect only Name, Phone, and Email.

### Technical Tasks

1.  **Schema Update**: Modify `src/lib/leads.schema.ts` to only include `name`, `phone`, and `email` fields with appropriate Zod validation.
2.  **Server Logic Update**:
    *   Update `src/lib/leads.server.ts` to remove Google Sheets fetching and logic. Replace with a simple console log for now (or prepare for future CRM/Email integration if requested later, but for now, just "disconnect").
    *   Update `src/lib/leads.functions.ts` to match the new schema.
3.  **UI Update**:
    *   Modify `src/components/site/LeadForm.tsx` to remove all unused fields (city, budget, car type, etc.).
    *   Add Email and Phone fields to the form.
    *   Update the `onSubmit` handler to process the new simplified fields.
    *   Ensure validation and error messages are correctly displayed for the new fields.

### User Impact

*   The form will become significantly shorter and easier to fill out.
*   External data storage (Google Sheets) will be disabled as requested.
