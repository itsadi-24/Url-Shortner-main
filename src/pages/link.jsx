import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BarLoader, BeatLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import { UrlState } from '@/context';
import { getClicksForUrl } from '@/db/apiClicks';
import {
  Copy,
  Download,
  LinkIcon,
  Trash,
  CheckCircle,
  Globe,
  Smartphone,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeviceStats from '../components/ui/device-stats';
import Location from '../components/ui/location-stats';

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });
  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate('/dashboard');
  }

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  function replaceDashboardWithID(id, short_url) {
    const currentUrl = window.location.href;
    return currentUrl.replace('/link/' + id, '/' + short_url);
  }

  const newLink = useMemo(
    () => (url ? replaceDashboardWithID(url.id, url?.short_url) : ''),
    [url]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(newLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='min-h-screen p-8 text-white bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'>
      {(loading || loadingStats) && (
        <BarLoader width={'100%'} color='#8b5cf6' />
      )}
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-12 text-5xl font-extrabold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300'>
          Link Details
        </h1>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='col-span-1'>
            <Card className='h-full overflow-hidden bg-gray-800 border-0 shadow-xl'>
              <CardHeader className='bg-gradient-to-r from-violet-600 to-purple-600'>
                <CardTitle className='text-2xl font-bold text-white'>
                  {url?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6 space-y-6'>
                <div className='p-4 bg-gray-700 rounded-lg'>
                  <a
                    href={newLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xl font-semibold break-all transition duration-300 text-violet-300 hover:text-violet-200'
                  >
                    {newLink}
                  </a>
                </div>
                <a
                  href={url?.original_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 p-2 text-gray-300 transition duration-300 rounded-md hover:text-white hover:bg-gray-700'
                >
                  <LinkIcon size={16} />
                  <span className='break-all'>{url?.original_url}</span>
                </a>
                <p className='text-sm text-gray-400'>
                  Created: {new Date(url?.created_at).toLocaleString()}
                </p>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleCopy}
                    className={`bg-violet-600 hover:bg-violet-700 text-white border-0 transition duration-300 ${
                      copied ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                  >
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={downloadImage}
                    className='text-white transition duration-300 bg-purple-600 border-0 hover:bg-purple-700'
                  >
                    <Download size={16} />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() =>
                      fnDelete().then(() => navigate('/dashboard'))
                    }
                    disabled={loadingDelete}
                    className='text-white transition duration-300 bg-red-600 border-0 hover:bg-red-700'
                  >
                    {loadingDelete ? (
                      <BeatLoader size={5} color='white' />
                    ) : (
                      <Trash size={16} />
                    )}
                  </Button>
                </div>
                <div className='p-4 mt-6 bg-white rounded-lg'>
                  <img
                    src={url?.qr}
                    alt='QR code'
                    className='w-full max-w-xs mx-auto rounded-lg shadow-lg'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='lg:col-span-2'>
            <Card className='h-full overflow-hidden bg-gray-800 border-0 shadow-xl'>
              <CardHeader className='bg-gradient-to-r from-purple-600 to-violet-600'>
                <CardTitle className='text-2xl font-bold text-white'>
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                {stats && stats.length ? (
                  <div className='space-y-8'>
                    <div className='p-6 text-center rounded-lg shadow-lg bg-gradient-to-r from-violet-600 to-purple-600'>
                      <h3 className='mb-2 text-xl font-semibold text-white'>
                        Total Clicks
                      </h3>
                      <p className='text-6xl font-bold text-white'>
                        {stats.length}
                      </p>
                    </div>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                      <Card className='overflow-hidden bg-gray-700 border-0 shadow-lg'>
                        <CardHeader className='bg-gradient-to-r from-blue-600 to-cyan-600'>
                          <CardTitle className='flex items-center text-lg font-semibold text-white'>
                            <Globe className='mr-2' size={20} />
                            Location Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='p-4'>
                          <Location stats={stats} />
                        </CardContent>
                      </Card>
                      <Card className='overflow-hidden bg-gray-700 border-0 shadow-lg'>
                        <CardHeader className='bg-gradient-to-r from-green-600 to-teal-600'>
                          <CardTitle className='flex items-center text-lg font-semibold text-white'>
                            <Smartphone className='mr-2' size={20} />
                            Device Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='p-4'>
                          <DeviceStats stats={stats} />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <p className='text-lg text-center text-gray-300'>
                    {loadingStats === false
                      ? 'No statistics available yet'
                      : 'Loading statistics...'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Link;
