import { createServerFn } from "@tanstack/react-start";
import { CARS } from "./catalog-data";

export const createNewCatalogSpreadsheet = createServerFn({ method: "POST" })
  .handler(async () => {
    const { callGatewayConnection } = await import("@/lib/connectors.server");
    
    try {
      // 1. Create a new spreadsheet
      const createResponse = await callGatewayConnection({
        connection_id: "std_01kzc3e87pfqfvgr5c1jbch3k6",
        connector_id: "google_sheets",
        method: "POST",
        path: "/v4/spreadsheets",
        body: JSON.stringify({
          properties: {
            title: "ERA TOKA Catalog v2"
          }
        })
      });

      if (createResponse.status !== 200) {
        throw new Error("Failed to create spreadsheet: " + createResponse.body);
      }

      const spreadsheet = JSON.parse(createResponse.body);
      const spreadsheetId = spreadsheet.spreadsheetId;

      // 2. Prepare headers and initial data
      const values = [
        ["Brand", "Model", "Main Image", "Carousel 1", "Carousel 2"],
        ...CARS.map(car => [car.brand, car.title, "", "", ""])
      ];

      // 3. Update spreadsheet with data
      const updateResponse = await callGatewayConnection({
        connection_id: "std_01kzc3e87pfqfvgr5c1jbch3k6",
        connector_id: "google_sheets",
        method: "PUT",
        path: `/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:E${values.length}?valueInputOption=RAW`,
        body: JSON.stringify({ values })
      });

      if (updateResponse.status !== 200) {
        throw new Error("Failed to populate spreadsheet: " + updateResponse.body);
      }

      return { spreadsheetId, url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}` };
    } catch (error) {
      console.error("Error creating new catalog spreadsheet:", error);
      throw error;
    }
  });
