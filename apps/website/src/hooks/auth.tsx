import { useState, useContext, createContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import { User } from 'database';

type SafeUser = Omit<User, 'password'>;

// Context
const AuthContext = createContext(null as any);

// Our hook.
export function useAuth(): {
  user: SafeUser | null;
  setNewUser: (user: SafeUser) => void;
  login: (email: string, password: string) => Promise<SafeUser | null>;
  logOut: () => void;
} {
  return useContext(AuthContext);
}

// Our hook logic.
function useProvideAuth() {
  const [cookie, setCookie] = useCookies(['authorization']);

  const [user, setUser] = useState<SafeUser | null>(null);

  function setNewUser(user: SafeUser) {
    setUser(user);
  }

  async function login(email: string, password: string): Promise<SafeUser | null> {
    let response: AxiosResponse<{ user: SafeUser }>;
    try {
      response = await axios.post('/api/v1/user/login', {
        email,
        password
      });
    } catch (error) {
      return null;
    }

    const fetchedUser = response.data.user;
    setUser(fetchedUser);
    return fetchedUser;
  }

  function logOut() {
    setUser(null);
    setCookie('authorization', '', { maxAge: 0, domain: window.location.hostname });
  }

  return {
    setNewUser,
    user,
    login,
    logOut
  };
}

// The context we provide.
export function ProvideAuth({ children }: { children: any }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
