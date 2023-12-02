import 'dotenv/config';

import { APIGatewayProxyCallback, Context, APIGatewayProxyEvent } from 'aws-lambda';

import { syncPosts } from './job';
import { authenticateRequest, prepareResponse } from './utils';

export const sync = async (event: APIGatewayProxyEvent, _context: Context, callback: APIGatewayProxyCallback) => {
  const isValidRequest = authenticateRequest(event?.headers);
  if (!isValidRequest) {
    console.error('Invalid Secret.');
    callback(null, prepareResponse(401, 'Unauthorized.'));
    return;
  }

  const body = event?.body ? JSON.parse(event?.body) : null;
  if (!body || !body.after) {
    console.error('Missing event body.');
    callback(
      null,
      prepareResponse(400, "Invalid body. Please make sure to include a numeric 'after' value in the body.")
    );
    return;
  }
  try {
    await syncPosts(body.after);
  } catch (error) {
    console.error('Sync failed because:', { error, body });
    callback(null, prepareResponse(500, 'Something went wrong!', error));
    return;
  }
  console.log('Done!');
  callback(null, prepareResponse(200, 'Done!'));
};

syncPosts(new Date('2023-11-29').getTime()).then(() => console.log('done'));
