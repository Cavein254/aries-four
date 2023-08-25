import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  const users = await prisma.user.findMany({});
  return new NextResponse('Users');
}
