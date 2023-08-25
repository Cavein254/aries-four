import { NextApiRequest, NextApiResponse } from 'next';
export default async function (
  url: string,
  data: any,
  req: NextApiRequest | null,
  res: NextApiResponse | null
) {
  console.log('on fetcher');
  console.log(data);
  try {
    await fetch(url, {
      method: data ? 'POST' : 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }).then(async (res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
}
