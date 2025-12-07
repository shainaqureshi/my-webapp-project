import React, { useState, useEffect } from 'react';
import './LocalNews.css';

const LocalNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('United States');
  const [category, setCategory] = useState('general');

  useEffect(() => {
    loadNews();
  }, [category]);

  const loadNews = async () => {
    setLoading(true);
    // Using curated local news stories for kids
    // In a real implementation, you would fetch from a news API
    setNews(getMockNews());
    setLoading(false);
  };

  const getAllNews = () => {
    return [
      {
        title: "Local Community Center Opens New Youth Programs",
        description: "The community center announced exciting new after-school programs for children, including art classes, sports teams, and tutoring services...",
        url: "https://www.bgca.org/programs",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop",
        publishedAt: new Date().toISOString(),
        source: "Local News",
        category: "community"
      },
      {
        title: "City Park Gets Major Upgrade with New Playground",
        description: "Families can now enjoy state-of-the-art playground equipment and improved safety features at the renovated city park...",
        url: "https://www.nrpa.org/parks-recreation-magazine/",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=200&fit=crop",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: "Community Updates",
        category: "events"
      },
      {
        title: "Local Library Announces Summer Reading Challenge",
        description: "Kids can win prizes and explore new books through the library's annual summer reading program starting next week...",
        url: "https://www.ala.org/alsc/publications-resources/book-lists/summer-reading-lists",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: "Education News",
        category: "education"
      },
      {
        title: "School District Celebrates Student Achievements",
        description: "Local students received recognition for outstanding academic performance and community service contributions...",
        url: "https://www.scholastic.com/parents/",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop",
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        source: "School News",
        category: "education"
      },
      {
        title: "Youth Soccer League Registration Now Open",
        description: "Sign up for the spring youth soccer league! All skill levels welcome. Practices start in March with games on weekends...",
        url: "https://www.ussoccer.com/",
        image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=200&fit=crop",
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        source: "Sports News",
        category: "sports"
      },
      {
        title: "Annual Science Fair This Weekend",
        description: "Local students will showcase amazing science projects at the community center. Free admission for all families!",
        url: "https://www.sciencebuddies.org/science-fair-projects",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop",
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        source: "Event News",
        category: "events"
      },
      {
        title: "New After-School Art Classes Available",
        description: "Learn painting, drawing, and sculpture with local artists. Classes start next month for ages 8-14...",
        url: "https://www.artsonia.com/",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=200&fit=crop",
        publishedAt: new Date(Date.now() - 518400000).toISOString(),
        source: "Community Programs",
        category: "community"
      },
      {
        title: "Local Basketball Team Wins Championship",
        description: "The youth basketball team brought home the championship trophy after an exciting season. Great teamwork!",
        url: "https://jr.nba.com/",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop",
        publishedAt: new Date(Date.now() - 604800000).toISOString(),
        source: "Sports Highlights",
        category: "sports"
      }
    ];
  };

  const getMockNews = () => {
    const allNews = getAllNews();
    if (category === 'general') {
      return allNews;
    }
    return allNews.filter(article => article.category === category);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const categories = [
    { value: 'general', label: '📰 All News', icon: '📰' },
    { value: 'education', label: '🎓 Education', icon: '🎓' },
    { value: 'community', label: '🏘️ Community', icon: '🏘️' },
    { value: 'events', label: '🎉 Events', icon: '🎉' },
    { value: 'sports', label: '⚽ Sports', icon: '⚽' }
  ];

  return (
    <div className="local-news">
      <div className="news-header">
        <h2>📍 Local News</h2>
        <p className="news-location">{location}</p>
      </div>

      <div className="news-categories">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`category-btn ${category === cat.value ? 'active' : ''}`}
            onClick={() => setCategory(cat.value)}
          >
            <span className="category-icon">{cat.icon}</span>
            {cat.label.split(' ').slice(1).join(' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="news-loading">
          <div className="loading-spinner"></div>
          <p>Loading local news...</p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <a 
              key={index} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="news-card-link"
            >
              <div className="news-card">
                <div 
                  className="news-image" 
                  style={{ backgroundImage: `url(${article.image})` }}
                >
                  <span className="news-source">{article.source}</span>
                </div>
                <div className="news-content">
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-description">{article.description}</p>
                  <div className="news-footer">
                    <span className="news-date">{formatDate(article.publishedAt)}</span>
                    <span className="news-link">Read more →</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="news-info">
        <p>💡 <strong>Note:</strong> These are sample news stories. Click any card to learn more about local community events and activities!</p>
      </div>
    </div>
  );
};

export default LocalNews;
