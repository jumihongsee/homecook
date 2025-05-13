import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  console.log(req.query.boardId);

  const db = (await connectDB).db('homecook');
  const data = await db.collection('recipe').findOne({
    _id: new ObjectId(req.query.boardId),
  });

  return res.status(200).json({ message: '임시', data });
}
