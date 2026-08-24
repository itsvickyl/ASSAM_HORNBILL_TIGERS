const LiveDashboard = () => {
  return (
    <div className="card-maroon p-5 sm:p-6 md:p-10 shadow-elevated mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 md:mb-8 border-b border-white/20 pb-3 md:pb-4 gap-2">
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl tracking-wider text-accent flex items-center gap-2 md:gap-3">
          <span className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></span>
          LIVE MATCH CENTER
        </h2>
        <span className="font-body text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gray-300">
          Innings 1 • Over 12.4
        </span>
      </div>

      <div className="flex justify-between items-end mb-6 md:mb-10">
        <div>
          <span className="font-heading text-lg md:text-2xl text-gray-400 block mb-1 md:mb-2">AH Tigers</span>
          <div className="font-heading text-5xl sm:text-6xl md:text-hero leading-none text-white">
            112<span className="text-3xl md:text-5xl text-gray-400">/2</span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-lg md:text-2xl text-gray-400 block mb-1 md:mb-2">CRR</span>
          <div className="font-heading text-3xl sm:text-4xl md:text-6xl text-accent leading-none">8.76</div>
        </div>
      </div>

      <div className="bg-primary-dark rounded-premium p-4 md:p-6 border border-white/10 mb-5 md:mb-8">
        <h4 className="font-heading text-lg md:text-xl text-gray-400 mb-3 md:mb-4 tracking-wider">Active Partnership</h4>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <span className="font-heading text-lg md:text-2xl text-white block">A. Haloi*</span>
            <span className="font-body text-xs md:text-sm text-gray-300">68 (42)</span>
          </div>
          <div className="flex-1 text-center font-heading text-xl md:text-3xl text-accent">
            85 <span className="text-sm md:text-lg text-gray-400">runs</span>
          </div>
          <div className="flex-1 text-right">
            <span className="font-heading text-lg md:text-2xl text-white block">A. Ali</span>
            <span className="font-body text-xs md:text-sm text-gray-300">14 (9)</span>
          </div>
        </div>
        
        {/* Partnership progress bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full mt-4 flex overflow-hidden">
          <div className="bg-accent h-full" style={{ width: '80%' }}></div>
          <div className="bg-gray-400 h-full" style={{ width: '20%' }}></div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between text-[10px] sm:text-xs md:text-sm font-body text-gray-300 uppercase tracking-widest gap-1">
        <span>Toss: AH Tigers opted to bat</span>
        <span>Proj. Score: 185</span>
      </div>
    </div>
  );
};

export default LiveDashboard;

