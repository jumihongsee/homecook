import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    data.parentBoardId = new ObjectId(data.boardId);

    const db = (await connectDB).db('homecook');
    const comment = await db.collection('comment').insertOne(data);

    res.status(200).json({ message: '댓글 등록 완료' });
  }
}
