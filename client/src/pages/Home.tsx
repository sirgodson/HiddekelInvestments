import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { MapPin, Download, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Stand, BlogPost } from "@shared/schema";

export default function Home() {
  const { data: stands } = useQuery<Stand[]>({
    queryKey: ["/api/stands"],
  });

  const { data: blogPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const featuredStands = stands?.slice(0, 3) || [];
  const recentPosts = blogPosts?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-hiddekel-gray via-gray-800 to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-2 bg-hiddekel-gold/20 rounded-full border border-hiddekel-gold/30">
              <span className="text-hiddekel-gold font-medium">AFFORDABLE STANDS FOR SALE</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">NYABIRA</span>
              <span className="block text-hiddekel-gold">AREA</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Rosewood Park - Now Selling. Premium residential stands in Harare's most sought-after development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/stands">
                <Button size="lg" className="bg-hiddekel-gold text-white hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <MapPin className="mr-2 h-5 w-5" />
                  View Available Stands
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-hiddekel-gold text-hiddekel-gold hover:bg-hiddekel-gold hover:text-white transition-all duration-300"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-hiddekel-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-hiddekel-gold rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-hiddekel-gray mb-4">About Hiddekel</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              "We are the land developers of choice" - Building Zimbabwe's future, one development at a time.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional construction team" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="space-y-6 animate-slide-in-right">
              <h3 className="text-3xl font-bold text-hiddekel-gray">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                We provide premium residential stands with world-class infrastructure, ensuring our clients can build their dream homes with confidence and peace of mind.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-hiddekel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-hiddekel-gray mb-2">TRUSTWORTHY</h4>
                  <p className="text-gray-600 text-sm">Proven track record</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-hiddekel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-hiddekel-gray mb-2">INNOVATIVE</h4>
                  <p className="text-gray-600 text-sm">Modern solutions</p>
                </div>
              </div>

              <Link href="/about">
                <Button className="mt-6 bg-hiddekel-gold text-white hover:bg-yellow-600">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stands */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-hiddekel-gray mb-4">Featured Stands</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our premium residential plots in prime locations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStands.map((stand) => (
              <Card key={stand.id} className="hover-lift bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  {stand.imageUrl && (
                    <img 
                      src={stand.imageUrl} 
                      alt={stand.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      stand.status === "available" 
                        ? "bg-green-100 text-green-800" 
                        : stand.status === "reserved"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {stand.status.charAt(0).toUpperCase() + stand.status.slice(1)}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-hiddekel-gray text-xl mb-2">{stand.title}</h4>
                  <p className="text-gray-600 mb-4">{stand.size} premium residential stand</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-hiddekel-gold">${stand.price}</span>
                    <Link href="/stands">
                      <Button variant="outline" size="sm" className="border-hiddekel-gold text-hiddekel-gold hover:bg-hiddekel-gold hover:text-white">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/stands">
              <Button className="bg-hiddekel-gold text-white hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300">
                View All Available Stands
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-hiddekel-gray mb-4">Latest News</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with our latest developments and industry insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="hover-lift bg-white rounded-2xl shadow-lg overflow-hidden">
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <div className="text-hiddekel-gold text-sm font-medium mb-2">{post.category}</div>
                  <h3 className="text-xl font-semibold text-hiddekel-gray mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {new Date(post.createdAt!).toLocaleDateString()}
                    </span>
                    <Link href="/blog">
                      <Button variant="ghost" size="sm" className="text-hiddekel-gold hover:text-yellow-600">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button className="bg-hiddekel-gold text-white hover:bg-yellow-600">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
