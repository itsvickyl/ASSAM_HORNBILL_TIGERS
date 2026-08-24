const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-[#120000] flex flex-col items-center justify-center text-white">
      <img 
        src="/logo.png" 
        alt="Loading..." 
        className="w-16 h-16 object-contain animate-pulse mb-4"
      />
      <div className="font-heading text-xl text-accent tracking-widest uppercase">
        Loading...
      </div>
    </div>
  );
};

export default LoadingSpinner;
