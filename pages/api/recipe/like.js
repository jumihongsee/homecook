import { connectDB } from '@/util/database';

import { ObjectId } from 'mongodb';

export default async function handle(req, res) {
  const data = JSON.parse(req.body);
  const status = data.status;
  const boardId = data.boardId;
  const userEmail = data.session.data.user.email;

  const db = (await connectDB).db('homecook');
  const recipe = await db.collection('recipe').findOne({
    _id: new ObjectId(boardId),
  });

  const updateLike = status ? recipe.likes + 1 : recipe.likes - 1;

  await db
    .collection('recipe')
    .updateOne({ _id: new ObjectId(boardId) }, { $set: { likes: updateLike } });

  await db
    .collection('users')
    .updateOne(
      { email: userEmail },
      status ? { $addToSet: { likesBoard: boardId } } : { $pull: { likesBoard: boardId } }
    );

  return res.status(200).json({ likes: updateLike });

  // 현재 로그인한 유저 정보 가져옴
  // Db에서 유저 조회 한 다음에 유저의 likesBoards 배열에 추가하기
}
