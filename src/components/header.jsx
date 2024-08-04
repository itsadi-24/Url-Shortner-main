import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, LinkIcon } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { logout } from '@/db/apiAuth';
import { UrlState } from '@/context';
import { BarLoader } from 'react-spinners';

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
      <nav className='flex items-center justify-between px-6 py-4 shadow-md bg-zinc-900'>
        <a href='/' className='flex items-center space-x-3'>
          <img
            src='/logo.jpg'
            className='w-12 h-12 rounded-full shadow-lg'
            alt='url-shortner logo'
          />
          <span className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400'>
            URL Shortener
          </span>
        </a>
        <div>
          {!user ? (
            <Button
              onClick={() => navigate('/auth')}
              className='px-4 py-2 font-semibold text-white transition-transform transform rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300'
              style={{ borderRadius: '4px' }} // Squarish button
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className='w-12 h-12 overflow-hidden transition-transform transform border-2 rounded-full border-cyan-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-400'>
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className='object-cover'
                  />
                  <AvatarFallback className='text-white bg-gradient-to-r from-cyan-500 to-fuchsia-500'>
                    {user?.user_metadata?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-indigo-800 border border-purple-600 rounded-lg shadow-lg w-60'>
                <DropdownMenuLabel className='text-cyan-300'>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-purple-600' />
                <DropdownMenuItem className='transition-colors duration-200 rounded-md hover:bg-purple-700 focus:bg-purple-700'>
                  <a href='/dashboard' className='flex items-center text-white'>
                    <LinkIcon className='w-5 h-5 mr-2 text-cyan-300' />
                    <span>Links</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='transition-colors duration-200 rounded-md hover:bg-red-600 focus:bg-red-600'
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate('/auth');
                    });
                  }}
                >
                  <LogOut className='w-5 h-5 mr-2 text-white' />
                  <span className='text-white'>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />}
    </>
  );
};

export default Header;
