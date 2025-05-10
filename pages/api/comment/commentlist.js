import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = (await connectDB).db('homecook');

  const data = await db
    .collection('comment')
    .find({ parentBoardId: new ObjectId(req.query.boardId) })
    .toArray();

  return res.status(200).json({ message: '성공', data });
}
