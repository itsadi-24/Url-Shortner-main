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
    <div className='flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md p-10 space-y-8 border border-white shadow-2xl rounded-xl bg-gradient-to-br from-white/10 to-white/30 backdrop-filter backdrop-blur-lg border-opacity-20'>
        <div>
          <h2 className='mt-6 text-3xl font-extrabold text-center text-white'>
            {longLink ? 'Please log in to continue' : 'Welcome back'}
          </h2>
          <p className='mt-2 text-sm text-center text-gray-300'>
            {longLink
              ? 'You need to log in first'
              : 'Login or create a new account'}
          </p>
        </div>

        <Tabs defaultValue='Login' className='mt-8'>
          <TabsList className='flex -space-x-px rounded-md shadow-sm bg-white/10'>
            <TabsTrigger
              value='Login'
              className='w-full px-4 py-2 text-sm font-medium text-white transition-colors rounded-l-md focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 hover:bg-white/15'
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value='Signup'
              className='w-full px-4 py-2 text-sm font-medium text-white transition-colors rounded-r-md focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 hover:bg-white/15'
            >
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent value='Login' className='mt-6'>
            <Login />
          </TabsContent>
          <TabsContent value='Signup' className='mt-6'>
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
