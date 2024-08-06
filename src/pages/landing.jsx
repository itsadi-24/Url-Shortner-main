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
  const [longUrl, setLongUrl] = useState();
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
    <div className='relative min-h-screen overflow-hidden font-sans text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800'>
      {/* <Header /> */}

      {/* Background Animation */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjIyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className='container relative z-10 px-4 py-12 mx-auto lg:py-24'>
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='mb-6 text-6xl font-extrabold leading-tight lg:text-8xl'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-500'>
              Shorten Your Links
            </span>
          </h1>
          <p className='max-w-3xl mx-auto mb-8 text-2xl leading-relaxed text-indigo-200'>
            Transform your URLs into powerful, trackable assets. Shorten,
            customize, and dominate your digital presence.
          </p>
        </motion.div>

        <motion.div
          className='max-w-4xl mx-auto mb-16'
          initial='hidden'
          animate='visible'
          variants={fadeInUp}
        >
          <form onSubmit={handleShorten} className='space-y-4'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <input
                type='url'
                placeholder='Enter your long URL here...'
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className='flex-grow px-6 py-4 text-lg text-white placeholder-indigo-300 bg-indigo-800 bg-opacity-50 border border-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400'
              />
              <button
                type='submit'
                className='px-8 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:shadow-xl'
              >
                Shorten URL
                <ArrowRight className='inline-block ml-2' size={24} />
              </button>
            </div>
            {/* <AnimatePresence>
              {shortUrl && (
                <motion.div
                  className='p-6 bg-indigo-800 bg-opacity-50 border border-indigo-700 shadow-lg rounded-xl'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className='mb-2 text-xl font-semibold'>
                    Your shortened URL:
                  </p>
                  <a
                    href={shortUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-lg break-all text-cyan-400 hover:text-cyan-300'
                  >
                    {shortUrl}
                  </a>
                </motion.div>
              )}
            </AnimatePresence> */}
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
              color: 'from-cyan-500 to-blue-500',
            },
            {
              icon: BarChart2,
              title: 'Advanced Analytics',
              description:
                'Gain deep insights into your audience with comprehensive tracking tools.',
              color: 'from-green-500 to-emerald-500',
            },
            {
              icon: Shield,
              title: 'Robust Security',
              description:
                'Protect your data with state-of-the-art encryption and security measures.',
              color: 'from-yellow-500 to-amber-500',
            },
            {
              icon: Globe,
              title: 'Global Reach',
              description:
                'Target audiences worldwide with geo-targeting and language customization.',
              color: 'from-orange-500 to-red-500',
            },
            {
              icon: QrCode,
              title: 'QR Generation',
              description:
                'Instantly create QR codes for your shortened URLs to boost offline engagement.',
              color: 'from-fuchsia-500 to-pink-500',
            },
            {
              icon: Zap,
              title: 'Fast Integration',
              description:
                'Seamlessly integrate our API with your existing tools and workflows.',
              color: 'from-purple-500 to-indigo-500',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              variants={fadeInUp}
            >
              <feature.icon className='w-16 h-16 mb-6 text-white' />
              <h3 className='mb-4 text-2xl font-bold'>{feature.title}</h3>
              <p className='text-lg text-white text-opacity-90'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Shapes */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full mix-blend-screen'
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              backgroundColor: `rgba(${Math.random() * 255}, ${
                Math.random() * 255
              }, ${Math.random() * 255}, 0.1)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
