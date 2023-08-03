import { useState, useContext, createContext } from 'react';

const RewardsContextMenuContext = createContext(null as any);

export function useRewardsContextMenu(): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} {
  return useContext(RewardsContextMenuContext);
}

function useProvideRewardsContextMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    open,
    close,
    toggle
  };
}

export function ProvideRewardsContextMenu({ children }: { children: any }) {
  const rewardsContextMenu = useProvideRewardsContextMenu();

  return (
    <RewardsContextMenuContext.Provider value={rewardsContextMenu}>
      {children}
    </RewardsContextMenuContext.Provider>
  );
}
