# Plan: Full Catalog Integration

Integrate the complete list of 131 cars into the `/catalog` page with brand filtering and detailed views.

## User Review Required

> [!IMPORTANT]
> I have parsed 131 cars from your file. The prices are estimated in RUB based on the CNY values in the file (using a 14.5 multiplier for turnkey delivery). Brands like Zeekr, Li Auto, Avatr, BYD, etc., will have their own filter tabs.

- **Brand Filtering**: Do you want specific brands featured first, or just alphabetical?
- **Detail View**: Should car details open in a modal or a new page? (I recommend a modal for speed).

## Proposed Changes

### Data and Assets
- Create `src/lib/catalog-data.ts` containing the full JSON of 131 cars.
- Add manufacturer logos as placeholders or small text badges.

### Components
- **CatalogGrid**:
    - Add a `Filter` component with brand buttons/tabs.
    - Implement search functionality by model name.
    - Group cars by manufacturer.
- **CarDetailModal**:
    - New component to show full technical specs and purchase terms.
    - Includes a "Request Consultation" button that pre-fills the form.

### Routes
- Update `src/routes/catalog.tsx` to handle the new filtered view.

## Technical Details
- Use `React.useMemo` for efficient filtering of 131 items.
- Maintain the premium dark theme with `#B4FF00` accents.
- All "Order" actions will scroll to and pre-fill the `LeadForm` at the bottom of the page.
