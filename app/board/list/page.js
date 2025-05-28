// import { useRouter } from 'next/navigation'

import { connectDB } from '../../../util/database';
import BoardUI from '../components/boardListUI';
export default async function BoardListContainer() {
  const db = (await connectDB).db('homecook');
  const data = await db.collection('recipe').find().toArray();

  return <BoardUI data={JSON.stringify(data)} />;
}
