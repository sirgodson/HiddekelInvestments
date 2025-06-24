import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Stand } from "@shared/schema";

export default function Stands() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const { data: stands, isLoading } = useQuery<Stand[]>({
    queryKey: ["/api/stands"],
  });

  // Filter stands based on selected filters
  const filteredStands = stands?.filter((stand) => {
    if (statusFilter !== "all" && stand.status !== statusFilter) return false;
    if (priceFilter !== "all") {
      const price = parseFloat(stand.price);
      if (priceFilter === "under-8000" && price >= 8000) return false;
      if (priceFilter === "8000-9000" && (price < 8000 || price > 9000)) return false;
      if (priceFilter === "over-9000" && price <= 9000) return false;
    }
    return true;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-hiddekel-gold border-t-transparent mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading stands...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-hiddekel-gray to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Available Stands</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover your perfect plot in our premium developments across Zimbabwe
          </p>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block mb-4 px-4 py-2 bg-hiddekel-gold/20 rounded-full border border-hiddekel-gold/30 w-fit">
                  <span className="text-hiddekel-gold font-medium">FEATURED PROJECT</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-hiddekel-gray mb-4">Rosewood Park</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Premium residential stands in the heart of Nyabira Area, just 8km from the new Parliament.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Tarred roads",
                    "Ready to build", 
                    "5 pre-approved house plans",
                    "300 square metres in size",
                    "Electricity available",
                    "Water & sewer in progress"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-5 h-5 bg-hiddekel-gold rounded-full flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="bg-hiddekel-gold text-white hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 w-fit">
                  <MapPin className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Aerial view of Rosewood Park development" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Filters and Stands Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by:</span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-8000">Under $8,000</SelectItem>
                <SelectItem value="8000-9000">$8,000 - $9,000</SelectItem>
                <SelectItem value="over-9000">Over $9,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredStands.length} of {stands?.length || 0} stands
            </p>
          </div>

          {/* Stands Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStands.map((stand) => (
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
                  <h3 className="font-semibold text-hiddekel-gray text-xl mb-2">{stand.title}</h3>
                  <p className="text-gray-600 mb-2">{stand.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {stand.location}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {stand.features.slice(0, 3).map((feature) => (
                        <span 
                          key={feature}
                          className="px-2 py-1 bg-hiddekel-gold/10 text-hiddekel-gold text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {stand.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{stand.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-hiddekel-gold">${stand.price}</span>
                      <div className="text-sm text-gray-500">{stand.size}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-hiddekel-gold text-hiddekel-gold hover:bg-hiddekel-gold hover:text-white"
                      disabled={stand.status === "sold"}
                    >
                      {stand.status === "sold" ? "Sold" : "Inquire"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStands.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No stands match your current filters.</p>
              <Button 
                onClick={() => {
                  setStatusFilter("all");
                  setPriceFilter("all");
                }}
                className="mt-4 bg-hiddekel-gold text-white hover:bg-yellow-600"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
