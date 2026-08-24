import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import TicketModal from '../shared/TicketModal';

const Layout = () => {
  const location = useLocation();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const openTickets = () => setIsTicketModalOpen(true);
  const closeTickets = () => setIsTicketModalOpen(false);

  // Centralized SEO Titles and Descriptions
  const seoData = {
    '/': {
      title: 'Assam Hornbill Tigers | Official Franchise Website',
      description: 'Welcome to the official home of the Assam Hornbill Tigers cricket franchise. Get the latest match highlights, player profiles, season fixtures, team history, and exclusive fan content.'
    },
    '/squad': {
      title: 'The Vanguard | Assam Hornbill Tigers Squad Roster',
      description: 'Explore the player profiles of the Assam Hornbill Tigers. View technical batting/bowling styles, career stats, and bios of the squad.'
    },
    '/matches': {
      title: 'Match Center & Standings | Assam Hornbill Tigers',
      description: 'Get live scores, points table, upcoming fixtures, stadium details, and season statistics for the Assam Hornbill Tigers.'
    },
    '/den': {
      title: 'Inside The Den | Exclusive Club Updates & Bento Hub',
      description: 'Your VIP access to exclusive club updates, stadium insights, live galleries, and behind-the-scenes match coverage.'
    },
    '/history': {
      title: 'Our Legacy & History | Assam Hornbill Tigers',
      description: 'Trace the monumental journey of the Assam Hornbill Tigers. From our inception to championship glory, read about our key team milestones.'
    },
    '/fanzone': {
      title: 'Tiger Nation Fan Zone | Assam Hornbill Tigers',
      description: 'Interact with the team! Participate in fan polls, download official wallpapers, and listen to stadium crowd chants.'
    }
  };

  useEffect(() => {
    // Scroll restoration: scroll to top of window on page transition
    window.scrollTo({ top: 0, behavior: 'instant' });

    // SEO updates
    const currentPath = location.pathname;
    const meta = seoData[currentPath] || {
      title: 'Page Not Found | Assam Hornbill Tigers',
      description: 'The requested page could not be found on the official Assam Hornbill Tigers website.'
    };
    
    // Update document title
    document.title = meta.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', meta.description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://hornbilltigers.com${currentPath}`);

    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://hornbilltigers.com${currentPath}`);

  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar onOpenTickets={openTickets} />
      <main className="flex-grow pt-0">
        <Outlet context={{ onOpenTickets: openTickets }} />
      </main>
      <Footer onOpenTickets={openTickets} />
      <TicketModal isOpen={isTicketModalOpen} onClose={closeTickets} />
    </div>
  );
};

export default Layout;
