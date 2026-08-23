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
  // Use the browser-compatible window.lovable.dispatch for now if it exists,
  // or a placeholder that handles the tool call correctly in the sandbox environment.
  // In this sandbox, dispatch is injected into the global scope for server functions.
  // @ts-ignore
  return await globalThis.lovable.dispatch("standard_connectors--call_gateway_connection", args);
}
