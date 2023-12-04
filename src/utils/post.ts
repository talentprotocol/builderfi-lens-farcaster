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
  contentId: string;
  publishedAt: string;
  source: PostSource;
}

export const farcasterCastToPost = (cast: Cast & { builderFIUserId: number }): Post => ({
  id: cast.data.threadMerkleRoot,
  builderFIUserId: cast.builderFIUserId,
  username: cast.username,
  contentId: cast.data.threadMerkleRoot,
  publishedAt: new Date(cast.publishedAt).toISOString(),
  source: PostSource.FARCASTER,
});

export const lensPublicationToPost = (post: PrimaryPublicationFragment & { builderFIUserId: number }): Post => ({
  id: post.id,
  builderFIUserId: post.builderFIUserId,
  username: post.by.handle.fullHandle,
  contentId: post.id,
  publishedAt: new Date(post.createdAt).toISOString(),
  source: PostSource.LENS,
});
