import { connectDB } from '@/util/database';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    console.log(req.body);

    const db = (await connectDB).db('homecook');
    const data = await db.collection('recipe').insertOne(req.body);
    return res.status(200).json('성공');
  }
}
