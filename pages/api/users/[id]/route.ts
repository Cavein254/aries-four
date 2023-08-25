import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return new NextResponse('The user does not exist', {
      status: 404,
    });
  }
  return NextResponse.json(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  if (!user) {
    return new NextResponse('The user does not exist', {
      status: 404,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.user.delete({
      where: { id },
    });

    return new NextResponse('User Deleted successfully', {
      status: 204,
    });
  } catch (err) {}
}
