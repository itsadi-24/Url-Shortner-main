export default function Footer() {
  return (
    <footer className='py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black'>
      <div className='container px-6 mx-auto text-center'>
        <div className='relative inline-block px-6 py-3 bg-white rounded-lg shadow-lg bg-opacity-10 backdrop-filter backdrop-blur-lg'>
          <a
            href='https://www.adiprasan.me/'
            target='_blank'
            rel='noopener noreferrer'
            className='relative font-sans text-lg text-white transition-all duration-300 ease-in-out cursor-pointer hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 group'
          >
            <span className='font-extrabold tracking-wide'>
              Made with <span className='text-red-500'>💓</span> by Adi
            </span>
            <span className='absolute inset-x-0 bottom-0 h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out'></span>
          </a>
        </div>
        <p>
          Connect with me on{' '}
          <a
            href='https://github.com/itsadi-24'
            target='_blank'
            rel='noopener noreferrer'
            className='text-white transition duration-300 hover:text-purple-400 hover:underline '
          >
            GitHub
          </a>{' '}
          and{' '}
          <a
            href='https://www.linkedin.com/in/adi-prasan-khuntia-3944072a5/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-white transition duration-300 hover:text-purple-400 hover:underline'
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
