import { APIGatewayProxyEventHeaders } from "aws-lambda/trigger/api-gateway-proxy";

export const authenticateRequest = (headers: APIGatewayProxyEventHeaders): boolean =>
  headers["x-secret"] === process.env.SECRET;

export const prepareResponse = (statusCode: number, message: string, error?: any) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message,
    ...(error ? { error } : {})
  })
});

export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const res = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    res.push(array.slice(i, i + chunkSize));
  }
  return res;
};
