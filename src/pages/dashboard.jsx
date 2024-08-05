import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Search,
  Link as LinkIcon,
  MousePointerClick,
  Plus,
  Moon,
  Sun,
  Zap,
} from 'lucide-react';
import Error from '@/components/error';
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { getUrls } from '@/db/apiUrls';
import { getClicksForUrls } from '@/db/apiClicks';
import LinkCard from '@/components/ui/Link-card';
import { CreateLink } from '@/components/ui/create-link';
import { Switch } from '@/components/ui/switch';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filterUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
      } transition-colors duration-300`}
    >
      <div className='container px-4 py-12 mx-auto'>
        <motion.div
          className='flex items-center justify-between mb-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className={`text-5xl font-extrabold ${
              isDarkMode
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
                : 'text-indigo-700'
            }`}
          >
            Dashboard
          </h1>
          <div className='flex items-center p-2 space-x-2 bg-white rounded-full bg-opacity-20'>
            <Sun
              className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-yellow-500'
              }`}
            />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className={`${isDarkMode ? 'bg-indigo-600' : 'bg-purple-400'}`}
            />
            <Moon
              className={`w-5 h-5 ${
                isDarkMode ? 'text-indigo-400' : 'text-gray-600'
              }`}
            />
          </div>
        </motion.div>

        {(loading || loadingClicks) && (
          <div className='w-full mb-8'>
            <div
              className={`h-2 w-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-indigo-200'
              } overflow-hidden rounded-full`}
            >
              <motion.div
                className='h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500'
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            </div>
          </div>
        )}

        <motion.div
          className='grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 text-indigo-100 shadow-lg shadow-purple-500/20'
                : 'bg-white text-indigo-900 shadow-md shadow-indigo-100/50'
            } hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader>
              <CardTitle className='flex items-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                <LinkIcon className='mr-3' size={28} />
                Links Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-6xl font-bold'>{urls?.length || 0}</p>
            </CardContent>
          </Card>

          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 text-indigo-100 shadow-lg shadow-purple-500/20'
                : 'bg-white text-indigo-900 shadow-md shadow-indigo-100/50'
            } hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader>
              <CardTitle className='flex items-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-600'>
                <MousePointerClick className='mr-3' size={28} />
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-6xl font-bold'>{clicks?.length || 0}</p>
            </CardContent>
          </Card>

          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 text-indigo-100 shadow-lg shadow-purple-500/20'
                : 'bg-white text-indigo-900 shadow-md shadow-indigo-100/50'
            } hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <CardHeader>
              <CardTitle className='flex items-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600'>
                <Zap className='mr-3' size={28} />
                Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-6xl font-bold'>
                {urls?.length
                  ? ((clicks?.length || 0) / urls.length).toFixed(2)
                  : '0.00'}
              </p>
              <p className='mt-2 text-sm text-gray-400'>Clicks per link</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className='flex flex-col items-center justify-between mb-8 space-y-4 md:flex-row md:space-y-0'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? 'text-indigo-200' : 'text-indigo-800'
            }`}
          >
            My Links
          </h2>
          <div className='flex items-center space-x-4'>
            <motion.div
              className='relative'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Input
                type='text'
                placeholder='Search links...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-12 pr-4 py-3 w-64 ${
                  isDarkMode
                    ? 'bg-gray-800 text-indigo-100 border-gray-700'
                    : 'bg-white text-indigo-900 border-indigo-200'
                } border-2 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
                style={{
                  boxShadow: isDarkMode
                    ? '0 4px 8px rgba(49,46,129,0.2)'
                    : '0 4px 8px rgba(99,102,241,0.1)',
                }}
              />
              <Search
                className='absolute top-3.5 left-4 text-indigo-400'
                size={20}
              />
            </motion.div>
            <CreateLink>
              {({ onClick }) => (
                <motion.button
                  onClick={onClick}
                  className={`${
                    isDarkMode
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                  } text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className='mr-2' size={20} />
                  Create Link
                </motion.button>
              )}
            </CreateLink>
          </div>
        </motion.div>

        {error && <Error message={error?.message} />}

        <AnimatePresence>
          <motion.div
            className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
            variants={fadeInUp}
            initial='initial'
            animate='animate'
          >
            {(filterUrls || []).map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <LinkCard
                  url={url}
                  fetchUrls={fnUrls}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
