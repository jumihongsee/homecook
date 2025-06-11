// import BoardNewUI from './boardNew.presenter';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import BoardWriteUI from '../components/boardWriteUI';

export default async function BoardNewContainer() {
  let session = await getServerSession(authOptions);
  let userEmail = session?.user.email;
  let userName = session?.user.name;

  // return <BoardNewUI author={userEmail} />;
  return <BoardWriteUI author={userEmail} name={userName} isEdit={false} />;
}
