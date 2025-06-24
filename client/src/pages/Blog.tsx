import { useQuery } from "@tanstack/react-query";
import { Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-hiddekel-gold border-t-transparent mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-hiddekel-gray to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Latest News</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with our latest developments and industry insights
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-hiddekel-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts?.map((post) => (
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
                  <h2 className="text-xl font-semibold text-hiddekel-gray mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.createdAt!).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Hiddekel Team
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="text-hiddekel-gold hover:text-yellow-600 font-medium transition-colors">
                      Read Full Article →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {blogPosts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
