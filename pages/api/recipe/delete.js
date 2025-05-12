import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const recipeBoardId = req.body.boardId;

    // 레시피 제거
    const db = (await connectDB).db('homecook');
    const result = await db.collection('recipe').deleteOne({
      _id: new ObjectId(recipeBoardId),
    });

    // 좋아요한 유저의 배열에서 boardId제거
    await db
      .collection('users')
      .updateMany({ likesBoard: recipeBoardId }, { $pull: { likesBoard: recipeBoardId } });

    // 레시피에 달린 댓글 삭제
    await db.collection('comment').deleteMany({
      parentBoardId: new ObjectId(recipeBoardId),
    });

    if (result.deletedCount === 0) {
      return res.status(400).json({ message: '해당 레시피 없음' });
    }
    return res.status(200).json({ message: '레시피 삭제 성공' });
  }
}
