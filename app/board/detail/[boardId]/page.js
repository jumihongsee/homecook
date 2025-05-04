import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function BoardDetail({ params }) {
  const { boardId } = await params;
  console.log(boardId);

  const db = (await connectDB).db('homecook');
  const data = await db.collection('post').findOne({ _id: new ObjectId(boardId) });
  console.log(data);

  return <>{data.title}</>;
}
