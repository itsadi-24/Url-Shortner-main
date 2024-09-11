import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Link2,
  BarChart2,
  Shield,
  Globe,
  QrCode,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className='min-h-screen font-sans text-gray-200 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'>
      {/* Animated background */}
      <div className='inset-0 overflow-hidden opacity-20'>
        <div className='w-full h-full '>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className='absolute rounded-full mix-blend-screen animate-float'
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                background: `rgb(${Math.random() * 255}, ${
                  Math.random() * 255
                }, ${Math.random() * 255})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='container relative z-10 px-4 py-16 mx-auto lg:py-24'>
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='mb-6 text-5xl font-extrabold leading-tight lg:text-7xl'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400'>
              Shorten Your Links
            </span>
          </h1>
          <p className='max-w-3xl mx-auto mb-8 text-xl leading-relaxed text-gray-300'>
            Transform long URLs into powerful, trackable assets. Shorten,
            customize, and elevate your digital presence with our cutting-edge
            platform.
          </p>
        </motion.div>

        <motion.div
          className='max-w-4xl mx-auto mb-20'
          initial='hidden'
          animate='visible'
          variants={fadeInUp}
        >
          <form
            onSubmit={handleShorten}
            className='p-2 bg-gray-800 bg-opacity-50 rounded-full shadow-xl backdrop-blur-sm'
          >
            <div className='flex flex-col gap-4 sm:flex-row'>
              <input
                type='url'
                placeholder='Enter your long URL here...'
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className='flex-grow px-6 py-4 text-lg text-white placeholder-gray-400 transition-all duration-300 bg-gray-700 bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400'
              />
              <button
                type='submit'
                className='px-8 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:shadow-xl hover:-translate-y-1'
              >
                Shorten URL
                <ArrowRight className='inline-block ml-2' size={24} />
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {[
            {
              icon: Link2,
              title: 'Custom Branding',
              description:
                'Create memorable, branded short links that reinforce your identity.',
              color: 'from-blue-400 to-cyan-400',
            },
            {
              icon: BarChart2,
              title: 'Advanced Analytics',
              description:
                'Gain deep insights into your audience with comprehensive tracking tools.',
              color: 'from-green-400 to-emerald-400',
            },
            {
              icon: Shield,
              title: 'Robust Security',
              description:
                'Protect your data with state-of-the-art encryption and security measures.',
              color: 'from-yellow-400 to-amber-400',
            },
            {
              icon: Globe,
              title: 'Global Reach',
              description:
                'Target audiences worldwide with geo-targeting and language customization.',
              color: 'from-purple-400 to-indigo-400',
            },
            {
              icon: QrCode,
              title: 'QR Generation',
              description:
                'Instantly create QR codes for your shortened URLs to boost offline engagement.',
              color: 'from-pink-400 to-rose-400',
            },
            {
              icon: Zap,
              title: 'Fast Integration',
              description:
                'Seamlessly integrate our API with your existing tools and workflows.',
              color: 'from-orange-400 to-red-400',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-2xl bg-gray-800 bg-opacity-50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 backdrop-blur-sm`}
              variants={fadeInUp}
            >
              <div
                className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}
              >
                <feature.icon className='w-8 h-8 text-gray-900' />
              </div>
              <h3 className='mb-4 text-2xl font-bold'>{feature.title}</h3>
              <p className='text-lg text-gray-300'>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Colorful glow effects */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute w-64 h-64 bg-pink-500 rounded-full top-1/4 left-1/4 mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute w-64 h-64 bg-purple-500 rounded-full top-3/4 right-1/4 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute w-64 h-64 rounded-full bottom-1/4 left-1/2 bg-cyan-500 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>
    </div>
  );
};

export default LandingPage;
