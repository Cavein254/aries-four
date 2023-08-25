import prisma from '@/lib/prisma';
const bcrypt = require('bcryptjs');

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
      const hash: string = await bcrypt.hashSync(password, 6);
      console.log({ 'user on register': hash });
      console.log(typeof hash);
      const user = await prisma.user.create({
        data: {
          name,
          password: hash,
          email,
        },
      });
      console.log('gggggggggggggg');
      // return new NextResponse(
      //   JSON.stringify({
      //     status: 'success',
      //     payload: user,
      //   })
      // );
      return res.json(user);
    } catch (err) {
      return res.json(err);
    }
  } else {
    return res.json('Other serious errors');
  }
};
// export default function handler(req, res) {
//   res.status(200).json({ text: 'Hello' });
// }
