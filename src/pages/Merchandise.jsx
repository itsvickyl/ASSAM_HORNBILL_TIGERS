import { useState, useMemo } from 'react';
import ProductCard from '../components/merchandise/ProductCard';
import { products } from '../data/products';

const Merchandise = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const categories = ['All', 'Jerseys', 'Apparel', 'Accessories', 'Equipment'];

  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const filteredProducts = useMemo(() => {
    let list = activeCategory === 'All' 
      ? [...products] 
      : products.filter(p => p.category === activeCategory);

    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'Newest Arrivals') {
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="bg-gradient-to-b from-[#3D0000] via-[#5B0000] to-[#120000] min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-transparent pt-24 md:pt-28 pb-6 md:pb-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-display text-white uppercase tracking-editorial mb-4">
            TEAM STORE
          </h1>
          <div className="gold-divider-thick"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-8 md:mt-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Sticky Sidebar Filter */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="md:sticky md:top-[120px]">
              <h3 className="font-heading text-xl md:text-2xl text-white tracking-wider mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/10">
                Categories
              </h3>
              <ul className="flex md:flex-col gap-3 md:gap-0 md:space-y-4 overflow-x-auto pb-2 md:pb-0">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`font-body text-sm uppercase tracking-widest transition-colors flex items-center gap-3 whitespace-nowrap ${
                        activeCategory === category ? 'text-accent font-semibold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {activeCategory === category && <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>}
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex justify-between items-center mb-8">
              <span className="font-body text-sm text-gray-300">
                Showing {filteredProducts.length} Products
              </span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white border border-white/15 rounded-lg px-3 py-1.5 font-body text-sm outline-none cursor-pointer hover:border-accent transition-colors [&>option]:bg-[#3D0000]"
                aria-label="Sort products"
              >
                <option value="Featured">Sort by: Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest Arrivals">Newest Arrivals</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Merchandise;
