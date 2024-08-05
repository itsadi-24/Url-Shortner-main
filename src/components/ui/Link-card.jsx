import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { Copy, Download, Trash } from 'lucide-react';
import { deleteUrl } from '@/db/apiUrls';
import { BeatLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LinkCard = ({ url, fetchUrls }) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  function replaceDashboardWithID(short_url) {
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/dashboard', '/' + short_url);
    return newUrl;
  }

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    window.open(imageUrl, '_blank');
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  const newLink = useMemo(
    () =>
      url
        ? replaceDashboardWithID(
            url?.custom_url ? url?.custom_url : url.short_url
          )
        : '',
    [url]
  );

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(newLink);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 3000);
  };

  return (
    <div className='flex flex-col w-full gap-6 p-6 bg-gray-900 border border-gray-800 rounded-lg h-80'>
      <div className='flex flex-col lg:flex-row lg:items-center'>
        <div className='flex-shrink-0 mb-4 lg:mb-0 lg:mr-6'>
          <img
            src={url?.qr}
            alt='QR code'
            className='object-contain w-full h-auto rounded-lg lg:w-48 ring-2 ring-blue-500'
          />
        </div>
        <div className='flex flex-col flex-grow min-w-0 space-y-2'>
          <Link
            to={`/link/${url?.id}`}
            className='break-words'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='text-xl font-extrabold text-white cursor-pointer hover:underline'>
              {url?.title}
            </span>
          </Link>
          <a
            href={newLink}
            className='break-all'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='text-lg font-bold text-blue-400 cursor-pointer hover:underline'>
              {newLink}
            </span>
          </a>
          <span className='text-sm text-gray-400 break-all'>
            {url?.original_url}
          </span>
          <span className='text-xs text-gray-500'>
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </div>
      </div>
      <div className='flex justify-end gap-2 mt-4 lg:flex-start lg:justify-start lg:mt-0'>
        <Button variant='outline' size='icon' onClick={handleCopyToClipboard}>
          <Copy className='w-4 h-4' />
        </Button>
        <Button variant='outline' size='icon' onClick={downloadImage}>
          <Download className='w-4 h-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
          {loadingDelete ? (
            <BeatLoader size={5} color='white' />
          ) : (
            <Trash className='w-4 h-4' />
          )}
        </Button>
      </div>
      {showCopiedMessage && (
        <Alert className='mt-2'>
          <AlertDescription>Link copied to clipboard!</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LinkCard;
