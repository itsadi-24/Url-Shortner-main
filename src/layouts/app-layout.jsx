import Header from '@/components/header';
import Footer from '@/components/ui/footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <main className='min-h-screen '>
        <Header />
        <Outlet />
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
};
export default AppLayout;
