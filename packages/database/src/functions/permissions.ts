import { Permission } from '@prisma/client';

import { prisma } from '../client';

export async function getAllPermissions() {
  return Object.keys(Permission);
}

export async function validatePermissions(permissions: string[]) {
  const allPermissions = await getAllPermissions();

  for (const permission of permissions) {
    if (!allPermissions.includes(permission)) {
      return false;
    }
  }
  return true;
}

export async function updatePermissions(userId: string, permissions: string[]): Promise<boolean> {
  if (!(await validatePermissions(permissions))) {
    return false;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      permissions: permissions.sort() as Permission[]
    }
  });

  return true;
}
