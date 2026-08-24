import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gradient-to-b from-[#3D0000] via-[#5B0000] to-[#120000] min-h-screen flex items-center justify-center text-white px-4">
      <div className="text-center max-w-lg">
        <div className="font-heading text-[120px] sm:text-[180px] text-accent/20 leading-none select-none">404</div>
        <h1 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wider -mt-8 mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-sm text-gray-300 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. 
          Head back to the official home of the Assam Hornbill Tigers.
        </p>
        <Link 
          to="/" 
          className="btn-gold py-3 px-10 text-sm rounded-xl inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
