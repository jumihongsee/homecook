import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    // console.log(req.body);
    // console.log(req.query.boardId);
    const db = (await connectDB).db('homecook');
    const result = await db.collection('recipe').updateOne(
      {
        _id: new ObjectId(req.query.boardId),
      },
      { $set: req.body }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: '수정 성공' });
    } else {
      return res.status(400).json({ message: '수정 실패' });
    }
  }
}
