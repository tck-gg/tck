import { Permission } from 'database';
import { useState, useContext, createContext } from 'react';

const PermissionsContext = createContext(null as any);

export function usePermissions(): {
  permissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
} {
  return useContext(PermissionsContext);
}

function useProvidePermissions() {
  const [permissions, setUserPermissions] = useState<Permission[]>([]);

  function setPermissions(permissions: Permission[]) {
    setUserPermissions(permissions);
  }

  return {
    permissions,
    setPermissions
  };
}

export function ProvidePermissions({ children }: { children: any }) {
  const permissions = useProvidePermissions();

  return <PermissionsContext.Provider value={permissions}>{children}</PermissionsContext.Provider>;
}
