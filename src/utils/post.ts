import { PrimaryPublicationFragment } from '@lens-protocol/client';

import { Cast } from './farcaster';

export enum PostSource {
  FARCASTER = 'FARCASTER',
  LENS = 'LENS',
}

export interface Post {
  id: string;
  builderFIUserId: number;
  username: string;
  publishedAt: string;
  source: PostSource;
}

export const farcasterCastToPost = (cast: Cast & { builderFIUserId: number }): Post => ({
  id: cast.body.data.threadMerkleRoot,
  builderFIUserId: cast.builderFIUserId,
  username: cast.body.username,
  publishedAt: new Date(cast.body.publishedAt).toISOString(),
  source: PostSource.FARCASTER,
});

export const lensPublicationToPost = (post: PrimaryPublicationFragment & { builderFIUserId: number }): Post => ({
  id: post.id,
  builderFIUserId: post.builderFIUserId,
  username: post.by.handle.fullHandle,
  publishedAt: new Date(post.createdAt).toISOString(),
  source: PostSource.LENS,
});
