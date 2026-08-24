import { standings } from '../../data/standings';

const PointsTable = () => {
  return (
    <div className="bg-[#1a0000] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-white/10 gap-2">
        <div>
          <span className="text-accent font-body text-xs uppercase tracking-widest font-semibold">T20 Super League 2026</span>
          <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-wider mt-0.5">Points Table</h2>
        </div>
        <span className="text-xs font-body bg-accent/20 text-accent px-3 py-1 rounded-full uppercase tracking-wider font-bold">
          Top 4 Qualify
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-body text-xs sm:text-sm">
          <thead>
            <tr className="text-gray-400 font-heading text-sm uppercase tracking-wider border-b border-white/10 pb-2">
              <th className="py-3 px-2 text-center">Pos</th>
              <th className="py-3 px-3">Franchise</th>
              <th className="py-3 px-2 text-center">P</th>
              <th className="py-3 px-2 text-center">W</th>
              <th className="py-3 px-2 text-center">L</th>
              <th className="py-3 px-2 text-center">NRR</th>
              <th className="py-3 px-3 text-center text-accent">Pts</th>
              <th className="py-3 px-2 text-center hidden md:table-cell">Recent Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {standings.map((row) => (
              <tr 
                key={row.code}
                className={`transition-colors hover:bg-white/5 ${
                  row.isUserTeam ? 'bg-accent/15 border-l-4 border-l-accent font-semibold' : ''
                }`}
              >
                <td className="py-3.5 px-2 text-center font-heading text-base text-gray-300">
                  {row.pos}
                </td>
                <td className="py-3.5 px-3 flex items-center gap-2 sm:gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-heading text-xs text-white shrink-0 ${
                    row.isUserTeam ? 'bg-primary border border-accent' : 'bg-gray-800'
                  }`}>
                    {row.code}
                  </div>
                  <span className={`tracking-wide truncate max-w-[100px] sm:max-w-none ${row.isUserTeam ? 'text-accent font-bold' : 'text-white'}`}>
                    {row.team}
                  </span>
                </td>
                <td className="py-3.5 px-2 text-center text-gray-300">{row.p}</td>
                <td className="py-3.5 px-2 text-center text-green-400 font-bold">{row.w}</td>
                <td className="py-3.5 px-2 text-center text-red-400">{row.l}</td>
                <td className="py-3.5 px-2 text-center text-gray-300 font-mono text-xs">{row.nrr}</td>
                <td className="py-3.5 px-3 text-center font-heading text-lg text-accent font-bold">{row.pts}</td>
                <td className="py-3.5 px-2 text-center hidden md:table-cell">
                  <div className="flex justify-center gap-1">
                    {row.form.map((res, i) => (
                      <span 
                        key={i} 
                        className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center text-white ${
                          res === 'W' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointsTable;
