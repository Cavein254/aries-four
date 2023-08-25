import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

import { NextResponse } from 'next/server';

export default async (req: Request) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
      const hash = bcrypt.hashSync(password, 6);
      const user = await prisma.user.create({
        data: {
          name,
          password: hash,
          email,
        },
      });
      return new NextResponse(
        JSON.stringify({
          status: 'success',
          payload: user,
        })
      );
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          status: 'failed',
          payload: err,
        })
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({
        status: 'failed',
        payload: 'only POST requests supported',
      })
    );
  }
};
