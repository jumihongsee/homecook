import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import BoardDetailUI from './boardDetail.presenter';

export default async function BoardDetail({ params }) {
  const { boardId } = await params;

  const db = (await connectDB).db('homecook');
  let data = await db.collection('recipe').findOne({ _id: new ObjectId(boardId) });
  // 레시피 작성자 유저 정보
  let userInfo = '';

  if (data) {
    userInfo = await db.collection('users').findOne({ email: data.author });
  }
  // object ID 는 클라이언트 페이지에서 못 받아 들임
  data._id = data._id.toString();

  return (
    <BoardDetailUI
      data={data}
      userName={userInfo.name}
      userImage={userInfo.image}
      boardId={boardId}
    />
  );
}
