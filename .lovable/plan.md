# Plan: Google Sheets Catalog Integration Upgrade

Upgrade the catalog to use a 5-column Google Sheets structure (Brand, Model, Main Image, Carousel 1, Carousel 2) and populate it with existing catalog data.

## Technical Details
- **Google Sheets Update**: Update `src/lib/catalog.functions.ts` to fetch columns A through E.
- **Frontend Refinement**: Ensure `CatalogGrid.tsx` correctly maps the 5 columns (Brand, Model, Main Image, 2 Carousel images).
- **Data Migration**: Provide a script/method to re-populate the existing 131 models into this new 5-column structure if needed, or simply update the spreadsheet schema.
- **Visuals**: Maintain the existing `ImageCarousel` component for display.

## Steps
1. Update `src/lib/catalog.functions.ts` `RANGE` to `Лист1!A2:E200`.
2. Verify `CatalogGrid.tsx` logic for mapping `row[0]` to `row[4]`.
3. Provide a helper script to output the current catalog as a CSV/text block formatted for the new 5-column sheet.
