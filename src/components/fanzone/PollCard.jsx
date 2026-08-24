import { useState } from 'react';

const PollCard = () => {
  const [voted, setVoted] = useState(false);
  const options = [
    { name: "Abinash Haloi (104 off 52)", percent: 65 },
    { name: "Khanindra Choudhury (4-18)", percent: 25 },
    { name: "Jintu Ahmed (35* & 2-24)", percent: 10 }
  ];

  return (
    <div className="card-glass p-8 border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-ink font-heading text-xl">P</div>
        <h3 className="font-heading text-2xl text-white tracking-wider m-0">Player of the Match</h3>
      </div>
      
      <p className="font-body text-sm text-gray-300 mb-6">
        Who was your standout performer in the thrilling victory against the Kings?
      </p>

      <div className="space-y-4">
        {options.map((option, idx) => (
          <div key={idx} className="relative group cursor-pointer" onClick={() => setVoted(true)}>
            {/* Background bar */}
            <div className={`absolute inset-0 rounded-premium overflow-hidden border ${voted ? 'border-white/10 bg-white/5' : 'border-white/10 hover:border-accent'}`}>
              {voted && (
                <div 
                  className="h-full bg-accent/20 transition-all duration-1000" 
                  style={{ width: `${option.percent}%` }}
                ></div>
              )}
            </div>
            
            {/* Content */}
            <div className="relative p-4 flex justify-between items-center">
              <span className={`font-body text-sm font-medium ${voted ? 'text-accent' : 'text-white'}`}>
                {option.name}
              </span>
              {voted && (
                <span className="font-heading text-xl text-accent">{option.percent}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {voted && (
        <p className="text-center font-body text-xs text-gray-400 mt-6 tracking-widest uppercase">
          Thanks for voting! 14,205 votes cast.
        </p>
      )}
    </div>
  );
};

export default PollCard;
