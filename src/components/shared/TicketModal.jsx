import { useState, useEffect, useRef } from 'react';

const TicketModal = ({ isOpen, onClose }) => {
  const [selectedMatch, setSelectedMatch] = useState('match-1');
  const [stand, setStand] = useState('East Stand (General)');
  const [quantity, setQuantity] = useState(2);
  const [booked, setBooked] = useState(false);
  const modalRef = useRef(null);

  // Escape key, focus trap, body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, select, [href], input, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    // Focus first interactive element
    setTimeout(() => modalRef.current?.querySelector('select, button')?.focus(), 50);
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matches = [
    { id: 'match-1', opponent: 'Kolkata Knight Riders', date: 'Oct 22, 2026', venue: 'Assam Cricket Association Stadium' },
    { id: 'match-2', opponent: 'Royal Challengers Bengaluru', date: 'Oct 26, 2026', venue: 'Assam Cricket Association Stadium' },
    { id: 'match-3', opponent: 'Chennai Super Kings', date: 'Nov 02, 2026', venue: 'Assam Cricket Association Stadium' },
  ];

  const stands = [
    { name: 'East Stand (General)', price: 750 },
    { name: 'West Stand (Fan Pavilion)', price: 1200 },
    { name: 'North Stand (Premium Lounge)', price: 2500 },
    { name: 'VIP Hornbill Tigers Suite', price: 5000 },
  ];

  const currentStand = stands.find(s => s.name === stand) || stands[0];
  const totalPrice = currentStand.price * quantity;

  const handleBooking = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  const handleReset = () => {
    setBooked(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-[#1f0303] border border-accent/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-black transition-colors flex items-center justify-center text-sm font-bold"
          aria-label="Close ticket modal"
        >
          ✕
        </button>

        {booked ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-4 text-accent text-3xl">
              ✓
            </div>
            <h2 className="font-heading text-3xl text-white mb-2 uppercase tracking-wide">Booking Preview</h2>
            <div className="bg-accent/10 border border-accent/30 rounded-lg px-4 py-2 mb-4 inline-block">
              <span className="font-body text-xs text-accent font-bold uppercase tracking-widest">DEMO MODE</span>
            </div>
            <p className="font-body text-xs text-gray-300 mb-6">
              Online ticket booking is not yet available. Visit the <strong className="text-accent">ACA Stadium Box Office</strong> in person, or check back soon for online ticket sales.
            </p>
            <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-6 text-left text-xs space-y-2">
              <div className="flex justify-between"><span className="text-gray-400">Match:</span> <span>AH Tigers vs {matches.find(m => m.id === selectedMatch)?.opponent}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Section:</span> <span>{stand}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Quantity:</span> <span>{quantity} Tickets</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Estimated Total:</span> <span className="text-accent font-bold">₹{totalPrice.toLocaleString()}</span></div>
            </div>
            <button 
              onClick={handleReset}
              className="btn-gold w-full py-3 text-sm rounded-xl font-bold tracking-wider"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img src="/logo.png" alt="Assam Hornbill Tigers Logo" className="w-8 h-8 object-contain" loading="lazy" />
              <div>
                <h2 id="ticket-modal-title" className="font-heading text-2xl uppercase tracking-wider text-white">Official Match Tickets</h2>
                <p className="font-body text-xs text-accent">Assam Hornbill Tigers Stadium Box Office</p>
              </div>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg px-3 py-1.5 mb-5 inline-block">
              <span className="font-body text-[10px] text-accent font-bold uppercase tracking-widest">PREVIEW / DEMO</span>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Select Fixture */}
              <div>
                <label htmlFor="ticket-fixture" className="block font-body text-xs font-semibold text-gray-300 uppercase mb-1">Select Home Fixture</label>
                <select 
                  id="ticket-fixture"
                  value={selectedMatch}
                  onChange={(e) => setSelectedMatch(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl p-3 font-body text-xs sm:text-sm text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none [&>option]:bg-[#1f0303]"
                >
                  {matches.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.date} - vs {m.opponent}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Stand */}
              <div>
                <label htmlFor="ticket-stand" className="block font-body text-xs font-semibold text-gray-300 uppercase mb-1">Select Seating Tier</label>
                <select 
                  id="ticket-stand"
                  value={stand}
                  onChange={(e) => setStand(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl p-3 font-body text-xs sm:text-sm text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none [&>option]:bg-[#1f0303]"
                >
                  {stands.map(s => (
                    <option key={s.name} value={s.name}>
                      {s.name} — ₹{s.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-body text-xs font-semibold text-gray-300 uppercase mb-1">Number of Seats</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/20 rounded-xl overflow-hidden bg-black/40">
                    <button 
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-white/10 text-white font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-heading text-lg text-accent" aria-live="polite">{quantity}</span>
                    <button 
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="px-4 py-2 hover:bg-white/10 text-white font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right flex-1">
                    <span className="text-xs text-gray-400 block uppercase">Estimated Total</span>
                    <span className="font-heading text-2xl text-accent" aria-live="polite">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                type="submit"
                className="w-full btn-gold py-3 rounded-xl mt-4 text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
              >
                Preview Booking (Demo)
              </button>
              <p className="text-center font-body text-[10px] text-gray-500 mt-2">
                This is a preview only. No payment will be processed.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
