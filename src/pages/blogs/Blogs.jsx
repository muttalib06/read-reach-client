import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Search,
  Tag,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Book Reviews",
    "Reading Tips",
    "Library News",
    "Author Interviews",
    "Community",
  ];

  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to Building Your Personal Reading List",
    excerpt:
      "Discover proven strategies to curate a reading list that matches your interests and helps you achieve your reading goals throughout the year.",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Reading Tips",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    featured: true,
  };

  const blogPosts = [
    {
      id: 2,
      title: "Top 10 Must-Read Books This Winter Season",
      excerpt:
        "Stay cozy this winter with our handpicked selection of books that will warm your heart and expand your mind.",
      author: "Michael Chen",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      category: "Book Reviews",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    },
    {
      id: 3,
      title: "How to Make Time for Reading in Your Busy Schedule",
      excerpt:
        "Practical tips and strategies to incorporate reading into your daily routine, no matter how packed your schedule is.",
      author: "Emily Davis",
      date: "Dec 10, 2024",
      readTime: "5 min read",
      category: "Reading Tips",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
    },
    {
      id: 4,
      title: "Behind the Scenes: How Our Delivery System Works",
      excerpt:
        "Ever wondered how we get books from the library to your doorstep? Take a look behind the curtain at our process.",
      author: "James Wilson",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      category: "Library News",
      image:
        "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&q=80",
    },
    {
      id: 5,
      title: "Interview with Bestselling Author Jane Martinez",
      excerpt:
        "We sit down with Jane Martinez to discuss her latest novel, writing process, and advice for aspiring authors.",
      author: "Sarah Johnson",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      category: "Author Interviews",
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80",
    },
    {
      id: 6,
      title: "Building Reading Communities: Success Stories",
      excerpt:
        "How ReadReach members are creating book clubs and reading groups in their neighborhoods.",
      author: "Lisa Anderson",
      date: "Dec 3, 2024",
      readTime: "6 min read",
      category: "Community",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    },
    {
      id: 7,
      title: "5 Classic Novels Everyone Should Read at Least Once",
      excerpt:
        "Timeless literature that continues to captivate readers across generations and why they remain relevant today.",
      author: "Michael Chen",
      date: "Dec 1, 2024",
      readTime: "8 min read",
      category: "Book Reviews",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80",
    },
    {
      id: 8,
      title: "The Science Behind Reading and Brain Health",
      excerpt:
        "Recent studies reveal fascinating insights about how reading impacts cognitive function and mental wellbeing.",
      author: "Dr. Robert Kim",
      date: "Nov 28, 2024",
      readTime: "9 min read",
      category: "Reading Tips",
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80",
    },
    {
      id: 9,
      title: "New Partnership: Expanding to 10 More Cities",
      excerpt:
        "ReadReach announces major expansion with new library partnerships, bringing our service to more readers nationwide.",
      author: "ReadReach Team",
      date: "Nov 25, 2024",
      readTime: "4 min read",
      category: "Library News",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTags = [
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Mystery",
    "Thriller",
    "Romance",
    "Biography",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ff7236] to-[#ff8c5a] text-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              ReadReach Blog
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Stories, insights, and inspiration from the world of books and
              reading
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#ff7236] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            {/* Featured Post */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#ff7236]" />
                <span className="text-sm font-bold text-[#ff7236] uppercase tracking-wide">
                  Featured Article
                </span>
              </div>
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#ff7236] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 hover:text-[#ff7236] transition-colors cursor-pointer">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 text-[#ff7236] font-semibold hover:gap-3 transition-all duration-200">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </div>

            {/* Recent Posts */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                Recent Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#ff7236] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          {post.date}
                        </span>
                        <button className="text-[#ff7236] font-semibold text-sm hover:gap-2 inline-flex items-center gap-1 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    No articles found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Popular Tags */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-[#ff7236]" />
                  <h3 className="text-lg font-bold text-slate-800">
                    Popular Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-[#ff7236] hover:text-white text-slate-700 rounded-full text-sm font-medium transition-all duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#ff7236] to-[#ff8c5a] rounded-xl p-6 shadow-lg text-white">
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-white/90 text-sm mb-4">
                  Get the latest articles and reading tips delivered to your
                  inbox
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg text-slate-800 placeholder-slate-400 mb-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full bg-white text-[#ff7236] py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                  Subscribe
                </button>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="group cursor-pointer">
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#ff7236] transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-500">{post.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
