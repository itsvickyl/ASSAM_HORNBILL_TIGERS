import { useState } from 'react';

const DownloadCard = ({ title, type, image }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloading(true);

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Generate clean filename
      const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-assamtigers.jpg`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      // Fallback: direct download link opening
      const link = document.createElement('a');
      link.href = image;
      link.download = title;
      link.target = '_blank';
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="card-glass group overflow-hidden border border-white/10 rounded-lg hover:border-accent/40 transition-all duration-300 shadow-lg flex flex-col justify-between">
      <div className="h-52 w-full overflow-hidden bg-black/40 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover overlay with download action */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0000]/90 via-[#3D0000]/60 to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] p-4 text-center">
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className={`btn-gold py-2.5 px-6 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-xl transition-transform active:scale-95 ${
              downloaded ? 'bg-emerald-500 text-white border-emerald-400' : ''
            }`}
          >
            {downloading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Preparing...</span>
              </>
            ) : downloaded ? (
              <>
                <span>✓ Downloaded</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Wallpaper</span>
              </>
            )}
          </button>
          <span className="text-[10px] text-gray-300 font-body uppercase tracking-widest">
            High Resolution • 1920x1080
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-white/10 bg-[#3D0000]/40">
        <h4 className="font-heading text-base md:text-lg text-white tracking-wider m-0 leading-snug">{title}</h4>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[10px] font-body uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded whitespace-nowrap">
            {type}
          </span>
          <button
            onClick={handleDownload}
            title="Download Wallpaper"
            aria-label="Download Wallpaper"
            className="sm:hidden text-accent hover:text-white p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadCard;
