import { CookiesProvider } from 'react-cookie';
import { MantineProvider } from '@mantine/core';

import { ProvideAgeVerification } from '@/hooks/age-verification';
import { ProvideAgeVerificationCallback } from '@/hooks/age-verification-callback';
import { ProvideAuth } from '@/hooks/auth';
import { ProvideRewardsContextMenu } from '@/hooks/rewards-context-menu';
import { ProvideTheme } from '@/hooks/theme';
import { ProvideProfile } from '@/hooks/profile';

function TheProviderProvider({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <ProvideAuth>
        <ProvideRewardsContextMenu>
          <ProvideAgeVerificationCallback>
            <ProvideAgeVerification>
              <ProvideProfile>
                <ProvideTheme>
                  <MantineProvider
                    theme={{
                      colorScheme: 'dark',
                      fontFamily: 'Archivo, sans-serif'
                    }}
                  >
                    {children}
                  </MantineProvider>
                </ProvideTheme>
              </ProvideProfile>
            </ProvideAgeVerification>
          </ProvideAgeVerificationCallback>
        </ProvideRewardsContextMenu>
      </ProvideAuth>
    </CookiesProvider>
  );
}

export default TheProviderProvider;
