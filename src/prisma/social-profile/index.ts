import { SocialProfileType } from '@prisma/client';

import prisma from '..';

export interface SocialProfile {
  userId: number;
  type: SocialProfileType;
  profileName: string;
}

export const getSocialProfiles = async (
  profileNames: string[],
  type: SocialProfileType
): Promise<{ data: SocialProfile[] }> => {
  const res = await prisma.socialProfile.findMany({
    where: {
      profileName: {
        in: profileNames,
      },
      type,
    },
  });
  return { data: res };
};
