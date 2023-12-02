import prisma from "../index";

export interface BuilderFIUser {
  wallet: string;
  socialWallet: string;
  privyUserId: string;
  displayName: string;
  avatarUrl: string;
  isActive: boolean;
  isAdmin: boolean;
  hasFinishedOnboarding: boolean;
  lastRecommendationsSyncedAt: Date;
  invitedById: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllActiveUsers = async (): Promise<{ data: BuilderFIUser[] }> => {
  const res = await prisma.user.findMany({
    where: {
      NOT: [{ socialWallet: null }],
      isActive: true
    },
    orderBy: {
      lastRecommendationsSyncedAt: "asc"
    }
  });
  return { data: res };
};

export const getUsersByAddresses = async (addresses: string[]): Promise<{ data: BuilderFIUser[] }> => {
  if (!addresses) return { data: [] };
  const res = await prisma.user.findMany({
    where: {
      isActive: true,
      socialWallet: {
        in: addresses
      }
    }
  });
  return { data: res };
};

export const getUsersByAddress = async (address: string): Promise<{ data: BuilderFIUser }> => {
  const res = await prisma.user.findUnique({
    where: {
      isActive: true,
      wallet: address
    },
    include: {
      inviteCodes: {
        where: {
          isActive: true
        }
      },
      socialProfiles: true,
      points: true
    }
  });
  return { data: res };
};

export const getUser = async (wallet: string): Promise<{ data: BuilderFIUser }> => {
  const address = wallet.toLowerCase();
  const res = await prisma.user.findUnique({
    where: {
      wallet: address
    },
    include: {
      socialProfiles: true
    }
  });
  return { data: res };
};

export const updateLastRecommendationsSyncedAt = async (userId: number) =>
  prisma.user.update({
    where: {
      id: userId
    },
    data: {
      lastRecommendationsSyncedAt: new Date()
    }
  });
