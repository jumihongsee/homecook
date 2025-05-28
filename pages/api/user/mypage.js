import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

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

    return res.status(200).json({ message: '성공', data });
  }

  if (req.query.status === 'comments') {
    // 1. 유저가 작성한 댓글 가져오기
    const commentData = await db.collection('comment').find({ author: req.query.author }).toArray();

    // 각 댓글에 게시글의 제목이름을 붙여 데이터 발행하기
    const data = await Promise.all(
      commentData.map(async item => {
        const withBoardTitle = await db.collection('recipe').findOne(
          { _id: new ObjectId(item.parentBoardId) },
          {
            projection: { title: 1, _id: 0 },
          }
        );

        return {
          ...item,
          withBoardTitle,
        };
      })
    );

    return res.status(200).json({ message: '성공', data });
  }

  if (req.query.status === 'likes') {
    //1. 유저가 좋아요한 게시글 배열로 가져오기
    const likesboardData = await db.collection('users').findOne({ email: req.query.userEmail });

    // 2. 좋아요 한 게시글의 데이터 가져오기
    // ++ 배열의 _id 들을 반복문 돌려 Object Id로 전부 변환
    const objectId = likesboardData.likesBoard.map(item => new ObjectId(item));

    const data = await db
      .collection('recipe')
      .find({ _id: { $in: objectId } })
      .toArray();
    console.log(data);

    return res.status(200).json({ message: '임시', data });
  }
}
