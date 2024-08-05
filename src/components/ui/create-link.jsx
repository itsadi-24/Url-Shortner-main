import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';
import { QRCode } from 'react-qrcode-logo';
import { motion } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UrlState } from '@/context';
import Error from '../error';
import useFetch from '@/hooks/use-fetch';
import { createUrl } from '@/db/apiUrls';

export function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: '',
    longUrl: longLink || '',
    customUrl: '',
  });

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    longUrl: yup
      .string()
      .url('Must be a valid URL')
      .required('Long URL is required'),
    customUrl: yup.string(),
  });

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data, navigate]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const removeDashboard = () => {
    return window.location.href.replace('/dashboard', '');
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button
          variant='destructive'
          className='transition-all duration-300 transform bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:scale-105'
        >
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className='text-white rounded-lg shadow-2xl sm:max-w-md bg-gradient-to-br from-gray-900 to-gray-800'>
        <DialogHeader>
          <DialogTitle className='text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
            Create New Link
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-6'
        >
          {formValues?.longUrl && (
            <div className='flex justify-center'>
              <QRCode ref={ref} value={formValues?.longUrl} size={200} />
            </div>
          )}

          <Input
            id='title'
            placeholder="Short Link's title"
            value={formValues.title}
            onChange={handleChange}
            className='text-white placeholder-gray-400 bg-gray-700 border-gray-600'
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id='longUrl'
            placeholder='Enter your Loooong URL'
            value={formValues.longUrl}
            onChange={handleChange}
            className='text-white placeholder-gray-400 bg-gray-700 border-gray-600'
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className='flex items-center gap-2'>
            <Card className='p-2 text-white bg-gray-700'>
              {removeDashboard()}
            </Card>
            <span className='text-2xl'>/</span>
            <Input
              id='customUrl'
              placeholder='Custom Link (optional)'
              value={formValues.customUrl}
              onChange={handleChange}
              className='text-white placeholder-gray-400 bg-gray-700 border-gray-600'
            />
          </div>
          {error && <Error message={error.message} />}
        </motion.div>

        <DialogFooter className='justify-center mt-6'>
          <Button
            type='button'
            variant='destructive'
            onClick={createNewLink}
            disabled={loading}
            className='w-full transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 hover:scale-105'
          >
            {loading ? (
              <BeatLoader size={10} color='white' />
            ) : (
              'Create Magic Link'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;
