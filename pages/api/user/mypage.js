import { connectDB } from '@/util/database';

export default async function handler(req, res) {
  //status / userEmail
  //   console.log(req.query);

  const db = (await connectDB).db('homecook');

  if (req.query.status === 'written') {
    // 1. 유저가 작성한 레시피 가져오기
    const writeData = await db.collection('recipe').find({ author: req.query.userEmail }).toArray();

    // 2. 각 레시피에 목록에 대한 댓글 수 구하기 countDocuments 사용 (실제 문서 개수)
    // promis.all map으로 진행하는 여러개의 비동기 작업을 한꺼번에 수행
    const data = await Promise.all(
      writeData.map(async item => {
        const commentCount = await db.collection('comment').countDocuments({
          boardId: item._id.toString(),
        });
        return {
          ...item,
          commentCount,
        };
      })
    );

    // console.log(withCommentCount);

    return res.status(200).json({ message: '성공', data });
  }
}
