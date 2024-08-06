import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Search,
  Link as LinkIcon,
  MousePointerClick,
  Plus,
  Zap,
} from 'lucide-react';
import Error from '@/components/error';
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { getUrls } from '@/db/apiUrls';
import { getClicksForUrls } from '@/db/apiClicks';
import LinkCard from '@/components/ui/Link-card';
import { CreateLink } from '@/components/ui/create-link';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = UrlState();
  const {
    loading: loadingUrls,
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fnUrls();
  }, [fnUrls]);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length, fnClicks]);

  useEffect(() => {
    if (!loadingUrls && !loadingClicks) {
      setIsLoading(false);
    }
  }, [loadingUrls, loadingClicks]);

  const filterUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'>
      <div className='container px-4 py-12 mx-auto'>
        <motion.div
          className='flex items-center justify-between mb-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className='text-4xl font-extrabold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
            Dashboard
          </h1>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3'
          variants={fadeInUp}
          initial='initial'
          animate='animate'
        >
          <Card className='text-indigo-100 transition-transform duration-300 transform bg-gray-800 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-105'>
            <CardHeader>
              <CardTitle className='flex items-center text-xl text-transparent md:text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                <LinkIcon className='mr-3' size={24} />
                Links Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold md:text-6xl'>
                {urls?.length || 0}
              </p>
            </CardContent>
          </Card>

          <Card className='text-indigo-100 transition-transform duration-300 transform bg-gray-800 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-105'>
            <CardHeader>
              <CardTitle className='flex items-center text-xl text-transparent md:text-2xl bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-600'>
                <MousePointerClick className='mr-3' size={24} />
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold md:text-6xl'>
                {clicks?.length || 0}
              </p>
            </CardContent>
          </Card>

          <Card className='text-indigo-100 transition-transform duration-300 transform bg-gray-800 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-105'>
            <CardHeader>
              <CardTitle className='flex items-center text-xl text-transparent md:text-2xl bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600'>
                <Zap className='mr-3' size={24} />
                Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold md:text-6xl'>
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
          <h2 className='text-2xl font-bold text-indigo-200 md:text-3xl'>
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
                className='w-full py-3 pl-12 pr-4 text-indigo-100 transition-all duration-300 bg-gray-800 border-2 border-gray-700 rounded-full md:w-64 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500'
                style={{
                  boxShadow: '0 4px 8px rgba(49,46,129,0.2)',
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
                  className='flex items-center px-6 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg'
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
                <LinkCard url={url} fetchUrls={fnUrls} isDarkMode={true} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
