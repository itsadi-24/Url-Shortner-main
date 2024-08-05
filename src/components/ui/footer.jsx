export default function Footer() {
  return (
    <div className='text-center '>
      <div className='inline-block w-full px-6 py-3 bg-white shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-10 '>
        <a
          href='https://www.linkedin.com/in/adi-prasan-khuntia-3944072a5/'
          target='_blank'
          rel='noopener noreferrer'
          className='relative font-sans text-lg text-white transition-all duration-300 ease-in-out cursor-pointer hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 group'
        >
          <span className='font-extrabold tracking-wide'>
            Made with <span className='text-red-500'>💓</span> by Adi
          </span>
          <span className='absolute left-0 bottom-0 w-full h-0.5 bg-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out'></span>
        </a>
      </div>
    </div>
  );
}
