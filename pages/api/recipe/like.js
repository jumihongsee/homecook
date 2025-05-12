import { connectDB } from '@/util/database';

import { ObjectId } from 'mongodb';

export default async function handle(req, res) {
  console.log(req.body);
  const data = req.body;
  const status = data.status;
  const boardId = data.boardId;
  const userEmail = data.session.data.user.email;

  const db = (await connectDB).db('homecook');
  const recipe = await db.collection('recipe').findOne({
    _id: new ObjectId(data.boardId),
  });

  console.log('좋아요 콘솔');
  console.log(recipe);

  const updateLike = status ? recipe.likes + 1 : recipe.likes - 1;

  await db
    .collection('recipe')
    .updateOne({ _id: new ObjectId(boardId) }, { $set: { likes: updateLike } });

  await db
    .collection('users')
    .updateOne(
      { email: userEmail },
      status ? { $addToSet: { likesBoard: boardId } } : { $pull: { likesBoard: boardId } }
    );

  console.log(recipe.likes);

  return res.status(200).json({ likes: updateLike });
}
