import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    //console.log(req.query.commentId);
    const db = (await connectDB).db('homecook');
    const result = await db.collection('comment').deleteOne({
      _id: new ObjectId(req.query.commentId),
    });

    res.status(200).json({ message: '댓글삭제 완료' });
  }
}
