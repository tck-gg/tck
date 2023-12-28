import { useState, useContext, createContext } from 'react';
import { useCookies } from 'react-cookie';
import { useAgeVerificationCallback } from './age-verification-callback';

const AgeVerificationContext = createContext(null as any);
export function useAgeVerification(): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setVerified: (isVerified: boolean) => void;
  verify: (callback: () => void) => void;
} {
  return useContext(AgeVerificationContext);
}

function useProvideAgeVerification() {
  const ageVerificationCallback = useAgeVerificationCallback();
  const [cookie, setCookie] = useCookies(['hasVerifiedAge']);
  const [isOpen, setIsOpen] = useState(true);

  function open() {
    if (!cookie.hasVerifiedAge) {
      setIsOpen(true);
    }
  }

  function close() {
    setIsOpen(false);
  }

  function setVerified(isVerified: boolean) {
    setCookie('hasVerifiedAge', isVerified, {
      maxAge: 60 * 60 * 24 * 365,
      domain:
        process.env.NODE_ENV === 'production' && !window.location.hostname.includes('localhost')
          ? process.env.NEXT_PUBLIC_PRODUCTION_COOKIE_DOMAIN
          : 'localhost'
    });
    if (isVerified) {
      ageVerificationCallback.callback();
      close();
    }
  }

  function verify(callback: () => void) {
    if (cookie.hasVerifiedAge !== 'true') {
      ageVerificationCallback.setCallback(() => {
        return callback;
      });
      setIsOpen(true);
      return;
    }
    callback();
  }

  return {
    isOpen,
    open,
    close,
    setVerified,
    verify
  };
}

export function ProvideAgeVerification({ children }: { children: any }) {
  const AgeVerification = useProvideAgeVerification();

  return (
    <AgeVerificationContext.Provider value={AgeVerification}>
      {children}
    </AgeVerificationContext.Provider>
  );
}
