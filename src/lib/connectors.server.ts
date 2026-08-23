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
  // In the sandbox server runtime, the 'dispatch' function is provided globally by the harness.
  // @ts-ignore
  return await dispatch("standard_connectors--call_gateway_connection", args);
}
