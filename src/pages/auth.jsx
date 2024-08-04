import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '../components/login';
import Signup from '../components/signup';
import { UrlState } from '@/context';
import { useEffect } from 'react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
    }
  }, [isAuthenticated, loading, navigate, longLink]);

  return (
    <div className='flex flex-col items-center gap-10 mt-36'>
      <h1 className='text-5xl font-extrabold'>
        {longLink ? 'Hold on You need to login first..' : 'Login /Signup'}
      </h1>
      <Tabs defaultValue='Login' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='Login'>Login</TabsTrigger>
          <TabsTrigger value='Signup'>Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value='Login'>
          <Login />
        </TabsContent>
        <TabsContent value='Signup'>
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
