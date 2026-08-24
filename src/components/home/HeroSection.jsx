import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import PixelBlast from '../shared/PixelBlast';

const HeroSection = ({ onOpenTickets }) => {
  return (
    <div className="relative min-h-[85vh] md:min-h-screen w-full overflow-hidden flex items-center pt-[90px] md:pt-[110px] pb-12 md:pb-24">
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={8}
          color="#7A0B0B" /* Subtle secondary maroon */
          patternScale={2.5}
          patternDensity={1.8}
          pixelSizeJitter={0.2}
          enableRipples={false}
          rippleSpeed={0.2}
          rippleThickness={0.2}
          rippleIntensityScale={2.0}
          liquid={false}
          liquidStrength={0.2}
          liquidRadius={1.5}
          liquidWobbleSpeed={3}
          speed={0.3}
          edgeFade={0.4}
          transparent={true}
          imageMask="/logo.png"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-8 relative z-20 pointer-events-none">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="font-heading text-5xl sm:text-7xl md:text-hero text-white mb-4 md:mb-6 tracking-editorial text-shadow-lg drop-shadow-2xl leading-none">
            FEARLESS.<br />
            FIERCE.<br />
            <span className="text-accent">UNSTOPPABLE.</span>
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mb-6 md:mb-8 font-light pointer-events-auto leading-relaxed">
            The official franchise home of the Assam Hornbill Tigers. Experience elite T20 cricket, match centers, team legacy, and fan experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 md:mt-8 pointer-events-auto">
            <Link to="/squad">
              <Button variant="outline" className="w-full sm:w-auto">View Squad</Button>
            </Link>
            <div onClick={onOpenTickets}>
              <Button variant="primary" className="w-full sm:w-auto">Buy Tickets</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

