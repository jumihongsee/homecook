import '../styles/globals.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/util/database';
import AuthProvider from './components/provider/authProvider';

export const metadata = {
  title: 'HOME COOK | 누구나 쉽게 만드는 집밥 레시피',
  description:
    '간단한 요리부터 다이어트, 비건, 혼술안주까지! 집밥 레시피를 쉽게 등록하고, 공유하고, 저장하세요.',
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);
  let userData = null;
  if (session) {
    let db = (await connectDB).db('homecook');
    let data = await db.collection('users').findOne({
      email: session.user.email,
    });
    if (data) {
      data._id = data._id.toString();
      userData = data;
    }
  }

  return (
    <html lang="en">
      <body>
        <Header userData={userData} />
        <AuthProvider userData={userData}>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
