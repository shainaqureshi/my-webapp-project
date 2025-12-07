import React, { useState } from 'react';
import './FunSpots.css';

const FunSpots = () => {
  const [category, setCategory] = useState('all');

  const spots = [
    {
      name: "Chuck E. Cheese",
      category: "entertainment",
      description: "Pizza, games, and fun for kids! Arcade games, prizes, and birthday parties.",
      address: "Multiple locations nationwide",
      url: "https://www.chuckecheese.com/",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=200&fit=crop",
      icon: "🎮"
    },
    {
      name: "Dave & Buster's",
      category: "entertainment",
      description: "Arcade games, virtual reality, and fun dining. Great for older kids and families!",
      address: "Various locations",
      url: "https://www.daveandbusters.com/",
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=200&fit=crop",
      icon: "🎯"
    },
    {
      name: "YMCA",
      category: "recreation",
      description: "Swimming, sports, after-school programs, and summer camps for all ages.",
      address: "Find your local YMCA",
      url: "https://www.ymca.net/",
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=200&fit=crop",
      icon: "🏊"
    },
    {
      name: "Local Library",
      category: "education",
      description: "Free books, computer access, homework help, and fun reading programs!",
      address: "Check your city's library",
      url: "https://www.ala.org/tools/libfactsheets/alalibraryfactsheet01",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
      icon: "📚"
    },
    {
      name: "Panera Bread",
      category: "restaurant",
      description: "Healthy soups, sandwiches, and bakery items. Free WiFi for homework!",
      address: "Multiple locations",
      url: "https://www.panerabread.com/",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop",
      icon: "🥖"
    },
    {
      name: "Chipotle",
      category: "restaurant",
      description: "Build your own burrito bowl with fresh ingredients. Quick and tasty!",
      address: "Nationwide locations",
      url: "https://www.chipotle.com/",
      image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=200&fit=crop",
      icon: "🌯"
    },
    {
      name: "Trampoline Parks",
      category: "recreation",
      description: "Jump, flip, and have fun! Many locations offer dodge ball and foam pits.",
      address: "Search for local trampoline parks",
      url: "https://www.skyzone.com/",
      image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=200&fit=crop",
      icon: "🤸"
    },
    {
      name: "Bowling Alleys",
      category: "entertainment",
      description: "Classic family fun! Most bowling alleys have bumpers for kids and snack bars.",
      address: "Find bowling near you",
      url: "https://www.bowl.com/Welcome/Welcome.aspx?&welcomepage=true",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
      icon: "🎳"
    },
    {
      name: "Smoothie King",
      category: "restaurant",
      description: "Healthy smoothies and snacks. Perfect after sports or activities!",
      address: "Multiple locations",
      url: "https://www.smoothieking.com/",
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=200&fit=crop",
      icon: "🥤"
    },
    {
      name: "Boys & Girls Clubs",
      category: "recreation",
      description: "After-school programs, sports, arts, and mentoring for kids and teens.",
      address: "Find your local club",
      url: "https://www.bgca.org/",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",
      icon: "⚽"
    },
    {
      name: "Subway",
      category: "restaurant",
      description: "Customize your sandwich with fresh veggies. Healthy fast food option!",
      address: "Nationwide locations",
      url: "https://www.subway.com/",
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=200&fit=crop",
      icon: "🥪"
    },
    {
      name: "Movie Theaters",
      category: "entertainment",
      description: "Watch the latest family-friendly movies. Many theaters have matinee specials!",
      address: "Check local theaters",
      url: "https://www.amctheatres.com/",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=200&fit=crop",
      icon: "🎬"
    },
    {
      name: "Community Centers",
      category: "recreation",
      description: "Free or low-cost activities, sports leagues, and youth programs.",
      address: "Search your city's parks department",
      url: "https://www.nrpa.org/",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop",
      icon: "🏢"
    },
    {
      name: "Ice Cream Shops",
      category: "restaurant",
      description: "Sweet treats and desserts! Perfect reward after completing your goals.",
      address: "Find local ice cream shops",
      url: "https://www.baskinrobbins.com/",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=200&fit=crop",
      icon: "🍦"
    },
    {
      name: "Skate Parks",
      category: "recreation",
      description: "Skateboarding, BMX, and scooter fun. Most are free and open to all skill levels!",
      address: "Search for local skate parks",
      url: "https://www.skateboard.com/",
      image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400&h=200&fit=crop",
      icon: "🛹"
    },
    {
      name: "Pizza Restaurants",
      category: "restaurant",
      description: "Everyone loves pizza! Great for group hangouts and celebrations.",
      address: "Multiple pizza chains",
      url: "https://www.pizzahut.com/",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop",
      icon: "🍕"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Spots', icon: '🌟' },
    { value: 'restaurant', label: 'Restaurants', icon: '🍔' },
    { value: 'recreation', label: 'Recreation', icon: '🎾' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎪' },
    { value: 'education', label: 'Learning', icon: '📖' }
  ];

  const filteredSpots = category === 'all' 
    ? spots 
    : spots.filter(spot => spot.category === category);

  return (
    <div className="fun-spots">
      <div className="spots-header">
        <h2>🎉 Fun Spots for Kids</h2>
        <p className="spots-subtitle">Cool places to hang out, eat, and have fun!</p>
      </div>

      <div className="spots-categories">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`category-btn ${category === cat.value ? 'active' : ''}`}
            onClick={() => setCategory(cat.value)}
          >
            <span className="category-icon">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="spots-grid">
        {filteredSpots.map((spot, index) => (
          <a
            key={index}
            href={spot.url}
            target="_blank"
            rel="noopener noreferrer"
            className="spot-card-link"
          >
            <div className="spot-card">
              <div 
                className="spot-image"
                style={{ backgroundImage: `url(${spot.image})` }}
              >
                <span className="spot-icon">{spot.icon}</span>
              </div>
              <div className="spot-content">
                <h3 className="spot-name">{spot.name}</h3>
                <p className="spot-category">{getCategoryLabel(spot.category)}</p>
                <p className="spot-description">{spot.description}</p>
                <p className="spot-address">📍 {spot.address}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="spots-info">
        <p>💡 <strong>Tip:</strong> Always check with a parent or guardian before visiting any location. Many places offer special discounts for kids and families!</p>
      </div>
    </div>
  );
};

const getCategoryLabel = (category) => {
  const labels = {
    restaurant: '🍔 Food & Drinks',
    recreation: '🎾 Recreation',
    entertainment: '🎪 Entertainment',
    education: '📖 Learning'
  };
  return labels[category] || category;
};

export default FunSpots;
