import { LimitType } from '@lens-protocol/client';

import { SocialProfileType, getSocialProfiles } from './prisma/social-profile';
import { getCasts } from './utils/farcaster';
import { getLensPublications } from './utils/lens';

export const syncPosts = async (after: number) => {
  const farcasterPosts = await fetchBuilderFIFarcasterPosts(after);
  const lensPosts = await fetchBuilderFILensPosts(after);

  return { farcasterPosts, lensPosts };
};

const fetchBuilderFIFarcasterPosts = async (after: number) => {
  // fetch all posts from Farcaster including 'builderfi' after the given timestamp
  const farcasterPosts = await getCasts('builderfi', after, { count: 100 });

  // check if any of the Farcaster posts have been published by a user that is already on BuilderFI
  const farcasterProfileNames = farcasterPosts.map((post) => post.username);
  const farcasterSocialProfiles = await getSocialProfiles(farcasterProfileNames, SocialProfileType.FARCASTER);

  // filter farcaster posts to only include posts that have been published by a user that is already on BuilderFI
  const farcasterPostsFromExistingUsers = farcasterPosts.filter((post) => {
    const socialProfile = farcasterSocialProfiles.data.find((profile) => profile.profileName === post.username);
    return !!socialProfile;
  });
  return farcasterPostsFromExistingUsers;
};

const fetchBuilderFILensPosts = async (after: number) => {
  // fetch all posts from Lens including 'builderfi' after the given timestamp
  const lensPosts = await getLensPublications('builderfi', after, { limit: LimitType.Fifty });
  const lensProfileNames = lensPosts.map((post) => post.by.handle.fullHandle);

  // check if any of the Lens posts have been published by a user that is already on BuilderFI
  const lensSocialProfiles = await getSocialProfiles(lensProfileNames, SocialProfileType.LENS);

  // filter lens posts to only include posts that have been published by a user that is already on BuilderFI
  const lensPostsFromExistingUsers = lensPosts.filter((post) => {
    const socialProfile = lensSocialProfiles.data.find((profile) => profile.profileName === post.by.handle.fullHandle);
    return !!socialProfile;
  });
  return lensPostsFromExistingUsers;
};
