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
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
          : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'
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
            className={`text-4xl font-extrabold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Dashboard
          </h1>
          <div className='flex items-center space-x-2'>
            <Sun
              className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-500' : 'text-yellow-600'
              }`}
            />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className={`${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
            <Moon
              className={`w-5 h-5 ${
                isDarkMode ? 'text-blue-400' : 'text-gray-600'
              }`}
            />
          </div>
        </motion.div>

        {(loading || loadingClicks) && (
          <div className='w-full mb-8'>
            <div
              className={`h-1 w-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              } overflow-hidden rounded-full`}
            >
              <div
                className='h-full'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,0.2) 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite',
                }}
              ></div>
            </div>
          </div>
        )}

        <motion.div
          className='grid grid-cols-1 gap-8 mb-12 md:grid-cols-2'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 text-gray-100 shadow-lg'
                : 'bg-white text-gray-900 shadow-md'
            } hover:shadow-xl transition-shadow duration-300`}
          >
            <CardHeader>
              <CardTitle className='flex items-center text-2xl text-blue-400'>
                <LinkIcon className='mr-3' size={28} />
                Links Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-5xl font-bold'>{urls?.length || 0}</p>
            </CardContent>
          </Card>

          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 text-gray-100 shadow-lg'
                : 'bg-white text-gray-900 shadow-md'
            } hover:shadow-xl transition-shadow duration-300`}
          >
            <CardHeader>
              <CardTitle className='flex items-center text-2xl text-green-400'>
                <MousePointerClick className='mr-3' size={28} />
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-5xl font-bold'>{clicks?.length || 0}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className='flex items-center justify-between mb-8'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
          <h2
            className={`text-3xl font-bold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            My Links
          </h2>
          <CreateLink>
            {({ onClick }) => (
              <motion.button
                onClick={onClick}
                className={`${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className='mr-2' size={20} />
                Create Link
              </motion.button>
            )}
          </CreateLink>
        </motion.div>

        <motion.div
          className='relative mb-12'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
          <Input
            type='text'
            placeholder='Search links...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-12 pr-4 py-3 ${
              isDarkMode
                ? 'bg-gray-900 text-gray-100 border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            } border-2 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            style={{
              boxShadow: isDarkMode
                ? '0 4px 8px rgba(0,0,0,0.3)'
                : '0 4px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Search className='absolute top-3.5 left-4 text-gray-400' size={20} />
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
