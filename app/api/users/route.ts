import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: Request) {
  const users = await prisma.user.findMany({});
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data,
    });
    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return new NextResponse('The email already exists', {
        status: 409,
      });
    }
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
