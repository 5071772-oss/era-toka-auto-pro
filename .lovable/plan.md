
# Plan - Catalog Integration

Create a new dedicated catalog page featuring vehicles scraped from gscarbuy.com, integrated seamlessly with the "ЭРА ТОКА" premium brand identity.

## User Review Required

> [!IMPORTANT]
> The catalog will be a static snapshot of the current inventory on gscarbuy.com. Would you like a way to update this data later, or is a one-time integration sufficient for now?

## Proposed Changes

### 1. New Catalog Page
- Create `src/routes/catalog.tsx` for the dedicated catalog view.
- Implement a premium grid layout for car cards using the branding tokens.
- Add "Order" buttons on each car that link to the consultation form.

### 2. Navigation Updates
- Update `src/lib/brand.ts` to include the new catalog route in navigation.
- Modify `src/components/site/Header.tsx` to include the link.
- Ensure the mobile menu and footer also reflect the new page.

### 3. Catalog Component
- Create `src/components/site/CatalogGrid.tsx` to manage the display of cars.
- Use the data extracted: Zeekr 9X, Geely Galaxy M9, Voyah Free+, Lixiang i8, Xiaomi YU7, Huawei Aito M8, Maextro S800, BYD Tang L.

## Technical Details
- The data is stored in a static JSON file or a server function for easy updates.
- Images will be proxied or referenced directly from the source.
- Responsive design for mobile/desktop.
- SEO metadata for the /catalog route.
