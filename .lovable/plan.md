# Plan - Google Sheets Image Integration & Carousels

Implement dynamic image loading for the car catalog using the connected Google Sheet, adding support for multiple carousel images per model.

## User Review Required

> [!IMPORTANT]
> The current catalog already includes 131 models with high-quality single images. This update will transition these models to use data from your Google Sheet, enabling you to add carousel images (slideshows) for every vehicle.

- **Google Sheet Structure**: We are using the "ERA TOKA Catalog Images" sheet. 
- **Carousel Support**: I will add a carousel component to the car detail modal that displays all images provided in the sheet.
- **Global Availability**: By using absolute URLs in the sheet, images will load reliably worldwide.

## Technical Details

### Backend & Data Flow
- Create `src/lib/catalog.functions.ts` to fetch and parse the Google Sheet data.
- Update `src/lib/catalog-data.ts` to merge static technical specs with dynamic image URLs from the sheet.
- Implement a caching layer or simple loader to prevent excessive API calls to Google Sheets.

### UI Enhancements
- **Image Carousel**: Replace the static single image in `DetailModal` (within `CatalogGrid.tsx`) with a swipeable carousel (using `framer-motion` for smooth premium transitions).
- **Graceful Fallbacks**: Maintain the current stable CDN images as defaults if a model is missing from the sheet or if a sheet URL fails to load.
- **Loading States**: Add shimmering skeletons while the sheet data is being fetched.

### Files to Modify
- `src/lib/catalog.functions.ts` (New): Server function to read the spreadsheet.
- `src/lib/catalog-data.ts`: Update the `Car` interface to support `images: string[]` and integrate the dynamic fetch.
- `src/components/site/CatalogGrid.tsx`: Update `DetailModal` to render the new carousel component.
- `src/components/site/ImageCarousel.tsx` (New): A premium, neon-accented slider component.
