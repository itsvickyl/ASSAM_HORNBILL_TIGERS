import { Link } from 'react-router-dom';

const Footer = ({ onOpenTickets }) => {
  return (
    <footer className="bg-primary tiger-stripe text-white py-12 md:py-16 relative">
      <div className="gold-divider-thick absolute top-0 left-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="rounded-full bg-black/60 border border-accent/40 p-1 shadow-md flex items-center justify-center">
              <img src="/logo.png" alt="Assam Hornbill Tigers Logo" className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-full" loading="lazy" />
            </div>
            <span className="font-heading text-xl md:text-2xl tracking-wider text-white">Assam Hornbill Tigers</span>
          </div>
          <p className="font-body text-sm text-gray-300 font-light max-w-xs leading-relaxed">
            The elite championship cricket franchise. Fearless. Fierce. Unstoppable.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-accent text-xl md:text-2xl mb-4 md:mb-6 tracking-wider">Quick Links</h4>
          <ul className="space-y-2 md:space-y-3 font-body text-sm font-light text-gray-300">
            <li><Link to="/squad" className="hover:text-accent transition-colors">The Squad</Link></li>
            <li><Link to="/history" className="hover:text-accent transition-colors">Team History</Link></li>
            <li><a href="/#sponsors" className="hover:text-accent transition-colors">Official Sponsors</a></li>
            <li>
              <a 
                href="https://isclcricket.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-accent hover:text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                <span>ISCL Official Website</span>
                <span className="text-xs">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-accent text-xl md:text-2xl mb-4 md:mb-6 tracking-wider">Fan Zone & Hub</h4>
          <ul className="space-y-2 md:space-y-3 font-body text-sm font-light text-gray-300">
            <li><Link to="/matches" className="hover:text-accent transition-colors">Match Center & Standings</Link></li>
            <li><Link to="/den" className="hover:text-accent transition-colors">The Den Hub</Link></li>
            <li><Link to="/fanzone" className="hover:text-accent transition-colors">Downloads & Audio</Link></li>
            <li>
              <a 
                href="https://isclcricket.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors text-accent font-semibold flex items-center gap-1"
              >
                <span>Season 2 Registration</span>
                <span className="text-xs">↗</span>
              </a>
            </li>
            <li><button onClick={onOpenTickets} className="hover:text-accent transition-colors text-left font-semibold text-accent">Buy Tickets</button></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="font-heading text-accent text-xl md:text-2xl mb-4 md:mb-6 tracking-wider">Contact Us</h4>
          <ul className="space-y-3 font-body text-sm font-light text-gray-300">
            <li className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-accent mt-1 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <a 
                href="https://maps.app.goo.gl/sRAUnRktE51iCVAq8?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors leading-relaxed"
              >
                NO.8/1-2 Palace Loop road,Opp. Mount Carmel College, Vidhana Soudha, Bangalore North, Bangalore-560001, Karnataka, India
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-accent flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:info@iscl.cricket" className="hover:text-accent transition-colors">info@iscl.cricket</a>
            </li>
            <li className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-accent flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <a href="tel:+919980745035" className="hover:text-accent transition-colors">+91 99807 45035</a>
            </li>
            <li className="mt-4 pt-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest block mb-2 font-semibold">Connect With Us</span>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/hornbill_tigers_iscl?utm_source=qr&igsi=bWZxOHdidjJkZXpp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full border border-accent/40 bg-black/40 flex items-center justify-center text-gray-300 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300" 
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a 
                  href="https://isclcricket.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full border border-accent/40 bg-black/40 flex items-center justify-center text-gray-300 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300" 
                  aria-label="Official ISCL Portal"
                  title="Visit isclcricket.in"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-secondary flex flex-col md:flex-row justify-between items-center text-xs font-body font-light text-gray-400 gap-4">
        <p>&copy; {new Date().getFullYear()} Assam Hornbill Tigers Cricket Franchise. All Rights Reserved.</p>
        <p className="text-gray-500 text-[10px]">Privacy Policy & Terms of Service — Coming Soon</p>
      </div>
    </footer>
  );
};

export default Footer;
