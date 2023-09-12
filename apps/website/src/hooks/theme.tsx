import { useRouter } from 'next/router';
import { useState, useContext, createContext, useEffect } from 'react';
import { Theme } from 'types';

const ThemeContext = createContext(null as any);

export function useTheme(): {
  theme: Theme;
  setTheme: (preset: Theme) => void;
} {
  return useContext(ThemeContext);
}

function useProvideTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');

  function setTheme(preset: Theme) {
    setCurrentTheme(preset);
  }

  return {
    theme: currentTheme,
    setTheme
  };
}

export function ProvideTheme({ children }: { children: any }) {
  const theme = useProvideTheme();
  const router = useRouter();

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
