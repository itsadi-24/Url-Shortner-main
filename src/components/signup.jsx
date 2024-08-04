import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { BeatLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';
import { signup } from '@/db/apiAuth';
import { UrlState } from '@/context';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Error from './error';

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
      fetchUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is Required'),
        email: Yup.string()
          .email('Invalid Email')
          .required('Email is Required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is Required'),
        profile_pic: Yup.mixed().required('Profile picture is required'),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Input
          name='name'
          type='text'
          placeholder='Enter Name'
          onChange={handleInputChange}
          className='text-white bg-white/10 border-white/20 placeholder-white/50 focus:border-white/40 focus:ring-white/40'
        />
        {errors.name && <Error message={errors.name} />}
      </div>

      <div className='space-y-2'>
        <Input
          name='email'
          type='email'
          placeholder='Enter Email'
          onChange={handleInputChange}
          className='text-white bg-white/10 border-white/20 placeholder-white/50 focus:border-white/40 focus:ring-white/40'
        />
        {errors.email && <Error message={errors.email} />}
      </div>

      <div className='space-y-2'>
        <Input
          name='password'
          type='password'
          placeholder='Enter Password'
          onChange={handleInputChange}
          className='text-white bg-white/10 border-white/20 placeholder-white/50 focus:border-white/40 focus:ring-white/40'
        />
        {errors.password && <Error message={errors.password} />}
      </div>

      <div className='space-y-2'>
        <Input
          name='profile_pic'
          type='file'
          accept='image/*'
          onChange={handleInputChange}
          className='text-white bg-white/10 border-white/20 file:bg-white/20 file:text-white file:border-0 focus:border-white/40 focus:ring-white/40'
        />
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </div>

      {error && <Error message={error.message} />}

      <Button
        onClick={handleSignup}
        className='w-full text-white bg-white/20 hover:bg-white/30'
      >
        {loading ? <BeatLoader size={10} color='#ffffff' /> : 'Create Account'}
      </Button>
    </div>
  );
};

export default Signup;
