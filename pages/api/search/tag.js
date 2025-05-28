import { connectDB } from '@/util/database';
export default async function handler(req, res) {
  const keyword = req.query.keyword;
  const type = req.query.type;
  let data = [];
  const db = (await connectDB).db('homecook');
  // 레시피 소요 시간 검색 recipe > time
  if (type === 'time') {
    data = await db
      .collection('recipe')
      .find({
        time: keyword,
      })
      .toArray();
  }

  // 레시피 난이도 검색 recipe > difficulty
  if (type === 'difficulty') {
    data = await db
      .collection('recipe')
      .find({
        difficulty: keyword,
      })
      .toArray();
  }

  // 레시피 테마 검색 recipe > thema
  if (type === 'thema') {
    data = await db
      .collection('recipe')
      .find({
        thema: keyword,
      })
      .toArray();
  }
  return res.status(200).json({ message: '성공', data });
}
