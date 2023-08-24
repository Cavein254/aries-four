'use client';
/**
 * using client session has a high latency
 * use this provider to get session if getting
 * session from server is not an option
 * **/

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
