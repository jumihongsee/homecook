import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import BoardDetailUI from './boardDetail.presenter';

export default async function BoardDetail({ params }) {
  const { boardId } = await params;
  console.log(boardId);

  const db = (await connectDB).db('homecook');
  const data = await db.collection('recipe').findOne({ _id: new ObjectId(boardId) });
  console.log(data);

  return <BoardDetailUI data={data} />;
}
