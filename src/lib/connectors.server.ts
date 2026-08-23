import { dispatch } from "@tanstack/react-start/server";

/**
 * Internal helper to call workspace connectors from server functions.
 */
export async function callGatewayConnection(args: {
  connection_id: string;
  connector_id: string;
  method: string;
  path: string;
  query_params?: Record<string, any>;
  body?: any;
}) {
  // In TanStack Start environment, we dispatch the tool call via the platform gateway
  return await dispatch("standard_connectors--call_gateway_connection", args);
}
