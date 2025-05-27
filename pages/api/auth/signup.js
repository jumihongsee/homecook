import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    let db = (await connectDB).db('homecook');
    const email = req.body.email;
    const confirmEmail = await db.collection('users').findOne({ email: req.body.email });

    console.log(confirmEmail);

    if (confirmEmail) {
      return res.status(409).json({ message: '✔ 이미 존재하는 이메일입니다.' });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;

      await db.collection('users').insertOne(req.body);
      return res.status(200).json({ message: '회원가입이 완료되었습니다.' });
    }
  }
}
