import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { BeatLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';
import { login } from '@/db/apiAuth';
import { UrlState } from '@/context';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Error from './error';

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid Email')
          .required('Email is Required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is Required'),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
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
          placeholder='Enter password'
          onChange={handleInputChange}
          className='text-white bg-white/10 border-white/20 placeholder-white/50 focus:border-white/40 focus:ring-white/40'
        />
        {errors.password && <Error message={errors.password} />}
      </div>

      {error && <Error message={error.message} />}

      <Button
        onClick={handleLogin}
        className='w-full text-white bg-white/20 hover:bg-white/30'
      >
        {loading ? <BeatLoader size={10} color='#ffffff' /> : 'Login'}
      </Button>
    </div>
  );
};

export default Login;
