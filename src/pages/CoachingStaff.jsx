import CoachCard from '../components/coaching/CoachCard';
import { coaches } from '../data/coaches';

const CoachingStaff = () => {
  return (
    <div className="bg-gradient-to-b from-[#3D0000] via-[#5B0000] to-[#120000] min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-transparent pt-24 md:pt-28 pb-6 md:pb-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-display text-white uppercase tracking-editorial mb-4">
            MASTERMINDS
          </h1>
          <div className="gold-divider-thick"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-8 md:mt-16">
        <div className="max-w-3xl mb-8 md:mb-16">
          <p className="font-body text-base md:text-lg font-light text-gray-300 leading-relaxed">
            Behind every fearless performance is meticulous preparation. Meet the elite tactical minds 
            guiding the Assam Hornbill Tigers to championship glory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {coaches.map(coach => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachingStaff;
