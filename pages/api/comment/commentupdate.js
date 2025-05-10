import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    console.log(req.body);
    const db = (await connectDB).db('homecook');
    const result = db
      .collection('comment')
      .updateOne(
        { _id: new ObjectId(req.body.commentId) },
        { $set: { comments: req.body.content } }
      );
  }

  return res.status(200).json({ message: '완료' });
}
