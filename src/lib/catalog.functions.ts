import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1ZEKRBH3_XYB_78WTP0fEowZ8VnGDirGGLDImqiTNYaQ";
const RANGE = "Лист1!A2:E300";

export const getCatalogImages = createServerFn({ method: "GET" })
  .handler(async () => {
    const { callGatewayConnection } = await import("@/lib/connectors.server");
    
    try {
      const response = await callGatewayConnection({
        connection_id: "std_01kzc3e87pfqfvgr5c1jbch3k6",
        connector_id: "google_sheets",
        method: "GET",
        path: `/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`,
      });

      if (response.status !== 200) {
        console.error("Failed to fetch Google Sheets data", response);
        return [];
      }

      const data = JSON.parse(response.body);
      return data.values || [];
    } catch (error) {
      console.error("Error in getCatalogImages server function:", error);
      return [];
    }
  });
