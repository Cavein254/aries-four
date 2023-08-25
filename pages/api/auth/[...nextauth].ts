import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { randomBytes, randomUUID } from 'crypto';
import { type NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'database',
    jwt: false,
    maxAge: 2 * 30 * 24 * 60 * 60, // 60 days
    updateAge: 14 * 24 * 60 * 60, // 14 days
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'user@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials: { email: string; password: string }) {
        const { password, email } = credentials;
        if (!email || !password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user || !compare(password, user.password)) {
          return null;
        }
        return {
          id: user.id,
          email: user.name,
          username: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    // jwt: ({ token, user }) => {
    //   if (user) {
    //     return {
    //       ...token,
    //       id: user.id,
    //     };
    //   }
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
