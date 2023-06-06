'use client';

import { SessionProvider } from 'next-auth/react';
import { FC } from 'react';

interface IAuthContextProps {
  children: React.ReactNode;
}

const AuthContext: FC<IAuthContextProps> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthContext;
