import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = session.user.email;
  console.log(userEmail);

  // 현재 로그인 한 유저가 boardId를 좋아요를 하고 있는지 아닌지 확인.
  const db = (await connectDB).db('homecook');
  const data = await db.collection('users').findOne({
    email: userEmail,
  });

  // 좋아요 배열

  const userLikesBoard = data.likesBoard;
  const userLogin = data.email;

  return res.status(200).json({ message: '성공', userLikesBoard, userLogin });
}
