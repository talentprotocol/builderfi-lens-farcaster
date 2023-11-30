import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

export const publishCast = async (text: string) => {
  const signerUuid = process.env.FARCASTER_SIGNER_UUID;
  const client = new NeynarAPIClient(process.env.FARCASTER_API_KEY);

  const publishedCast = await client.v2.publishCast(signerUuid, text);

  console.log(`New cast hash: ${publishedCast.hash}`);

  return publishedCast.hash;
};

export const replyToCast = async (existingCastHash: string, reply: string) => {
  const signerUuid = process.env.FARCASTER_SIGNER_UUID;
  const client = new NeynarAPIClient(process.env.FARCASTER_API_KEY);

  const publishedCast = await client.v2.publishCast(signerUuid, reply, { replyTo: existingCastHash });

  console.log(`Reply hash:${publishedCast.hash}`);

  return publishedCast.hash;
};
