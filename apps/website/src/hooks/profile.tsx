import { useState, useContext, createContext } from 'react';

const ProfileContext = createContext(null as any);
export function useProfile(): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} {
  return useContext(ProfileContext);
}

function UseProvideProfile() {
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

export function ProvideProfile({ children }: { children: any }) {
  const profile = UseProvideProfile();

  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}
