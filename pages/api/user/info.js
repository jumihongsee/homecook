import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === 'POST') {
    const db = (await connectDB).db('homecook');
    const userInfoData = await db.collection('users').findOne({
      _id: new ObjectId(req.body),
    });

    // (서버) user Id 와 현재 session Id가 같지 않으면 페이지에 접근 할 수 없어야함
    if (session?.user?.email != userInfoData?.email) {
      return res.status(400).json({ message: '마이페이지 접속 권한 없음' });
    }

    return res.status(200).json({ message: '성공', userInfoData });
  }
}
