import { createContext, useContext, useState } from 'react';

const AgeVerificationCallbackContext = createContext(null as any);
export function useAgeVerificationCallback(): {
  callback: () => void;
  setCallback: (cb: () => void) => void;
} {
  return useContext(AgeVerificationCallbackContext);
}

function useProvideAgeVerificationCallback() {
  const [callback, setCallback] = useState(() => {
    return null;
  });
  return {
    callback,
    setCallback
  };
}

export function ProvideAgeVerificationCallback({ children }: { children: React.ReactNode }) {
  const ageVerificationCallback = useProvideAgeVerificationCallback();

  return (
    <AgeVerificationCallbackContext.Provider value={ageVerificationCallback}>
      {children}
    </AgeVerificationCallbackContext.Provider>
  );
}
