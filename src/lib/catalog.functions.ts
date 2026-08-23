import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1iXleBDWpKjaUkt6JByM_8xk8Ely2SBKeP5uAp8myvTk";
const RANGE = "Лист1!A2:E300";

export const getCatalogImages = createServerFn({ method: "GET" })
  .handler(async () => {
    const { callGatewayConnection } = await import("@/lib/connectors.server");
    
    try {
      const response = await callGatewayConnection({
        connection_id: "std_01m0j3dd0gehn99mybeqpprh48",
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
