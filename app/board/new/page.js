import BoardNewUI from './boardNew.presenter';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function BoardNewContainer() {
  let session = await getServerSession(authOptions);
  let userEmail = session?.user.email;

  return <BoardNewUI author={userEmail} />;
}
