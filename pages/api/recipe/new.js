import { connectDB } from '@/util/database';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    console.log(req.body);

    const db = (await connectDB).db('homecook');
    const data = await db.collection('recipe').insertOne(req.body);

    // console.log(data);
    // {
    //   acknowledged: true,
    //   insertedId: new ObjectId("681cb4ec8538dc9c5ca8eefd")
    // }

    return res.status(200).json({ message: '레시피 업로드 성공', id: data.insertedId.toString() });
  }
}
