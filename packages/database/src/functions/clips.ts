import { AdminPanelClip } from 'types';

import { prisma } from '../client';

export async function submitClip(clipLink: string, userId: string): Promise<boolean> {
  await prisma.communityWinVideoSubmission.create({
    data: {
      link: clipLink,
      submitter: {
        connect: {
          id: userId
        }
      }
    }
  });

  return true;
}

export async function getAdminPanelClips(): Promise<AdminPanelClip[]> {
  const clips = await prisma.communityWinVideoSubmission.findMany({
    select: {
      id: true,
      link: true
    }
  });
  return clips;
}
