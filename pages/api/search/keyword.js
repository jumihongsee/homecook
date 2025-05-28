import { connectDB } from '@/util/database';

export default async function handler(req, res) {
  const keyword = req.query.keyword;
  const type = req.query.type;

  const db = (await connectDB).db('homecook');

  let data = [];
  // 제목으로 검색 recipe > title
  if (type === 'title') {
    data = await db
      .collection('recipe')
      .find({
        title: { $regex: keyword, $options: 'i' },
      })
      .toArray();
  }

  // 재료로 검색  recipe > ingredient
  if (type === 'ingredient') {
    data = await db
      .collection('recipe')
      .find({
        'ingredient.name': { $regex: keyword, $options: 'i' },
      })
      .toArray();

    // return res.status(200).json({ message: '성공', data });
  }

  return res.status(200).json({ message: '성공', data });
}
