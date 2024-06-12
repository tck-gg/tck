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
