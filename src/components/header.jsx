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
import { LogOut, LinkIcon, User } from 'lucide-react';
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
      <nav className='flex items-center justify-between px-6 py-4 shadow-lg bg-gradient-to-r from-gray-900 to-indigo-900'>
        <a href='/' className='flex items-center space-x-4 group'>
          <div className='relative w-12 h-12 overflow-hidden transition-transform duration-300 transform rounded-full shadow-lg group-hover:scale-110'>
            <img
              src='/logo.jpg'
              className='object-cover w-full h-full'
              alt='url-shortener logo'
            />
            <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30'></div>
          </div>
          <span className='font-serif text-2xl text-transparent transition-all duration-300 bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 group-hover:tracking-wider'>
            URL Shortener
          </span>
        </a>
        <div>
          {!user ? (
            <Button
              onClick={() => navigate('/auth')}
              className='px-6 py-2 font-semibold text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-gray-900'
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className='w-12 h-12 overflow-hidden transition-all duration-300 transform border-2 rounded-full border-cyan-400 hover:scale-105 hover:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2 focus:ring-offset-gray-900'>
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className='object-cover'
                  />
                  <AvatarFallback className='text-white bg-gradient-to-r from-cyan-500 to-fuchsia-500'>
                    <User className='w-6 h-6' />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-64 p-1 border border-purple-600 rounded-lg shadow-xl bg-gradient-to-b from-indigo-900 to-purple-900'>
                <DropdownMenuLabel className='px-4 py-2 text-lg font-semibold text-cyan-300'>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-purple-600' />
                <DropdownMenuItem className='px-4 py-2 m-1 transition-colors duration-200 rounded-md hover:bg-purple-700 focus:bg-purple-700 focus:outline-none'>
                  <a
                    href='/dashboard'
                    className='flex items-center text-white group'
                  >
                    <LinkIcon className='w-5 h-5 mr-3 transition-transform duration-200 text-cyan-300 group-hover:rotate-12' />
                    <span className='transition-colors duration-200 group-hover:text-cyan-300'>
                      Links
                    </span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='px-4 py-2 m-1 transition-colors duration-200 rounded-md hover:bg-red-600 focus:bg-red-600 focus:outline-none'
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate('/auth');
                    });
                  }}
                >
                  <div className='flex items-center text-white group'>
                    <LogOut className='w-5 h-5 mr-3 transition-transform duration-200 group-hover:-translate-x-1' />
                    <span className='transition-colors duration-200 group-hover:text-red-200'>
                      Logout
                    </span>
                  </div>
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
