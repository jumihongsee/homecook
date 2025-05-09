import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import BoardDetailUI from './boardDetail.presenter';

export default async function BoardDetail({ params }) {
  const { boardId } = await params;

  const db = (await connectDB).db('homecook');
  const data = await db.collection('recipe').findOne({ _id: new ObjectId(boardId) });
  // 레시피 작성자 유저 정보
  let userInfo = '';

  if (data) {
    userInfo = await db.collection('users').findOne({ email: data.author });
  }

  return (
    <BoardDetailUI
      data={data}
      userName={userInfo.name}
      userImage={userInfo.image}
      boardId={boardId}
    />
  );
}
