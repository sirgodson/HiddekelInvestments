import { Shield, Handshake, Heart, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-hiddekel-gray to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Hiddekel</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            "We are the land developers of choice" - Building Zimbabwe's future with premium residential developments.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in-left">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional construction team" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h2 className="text-3xl font-bold text-hiddekel-gray mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be Zimbabwe's premier land development company, creating sustainable communities that enhance the quality of life for families across the nation. We envision a future where every Zimbabwean family has access to premium residential stands with world-class infrastructure.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-hiddekel-gray mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We provide premium residential stands with world-class infrastructure, ensuring our clients can build their dream homes with confidence and peace of mind. Our commitment extends beyond land sales to creating vibrant, well-planned communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-hiddekel-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-hiddekel-gray mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four pillars that make us the land developers of choice in Zimbabwe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover-lift bg-white p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-hiddekel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-white h-8 w-8" />
                </div>
                <h3 className="font-semibold text-hiddekel-gray text-xl mb-3">TRUSTWORTHY</h3>
                <p className="text-gray-600">
                  Proven track record of successful developments and satisfied clients. We deliver on our promises with transparency and integrity.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-white p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-hiddekel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="text-white h-8 w-8" />
                </div>
                <h3 className="font-semibold text-hiddekel-gray text-xl mb-3">CONVENIENT</h3>
                <p className="text-gray-600">
                  Easy purchase process with flexible payment terms. We make land ownership accessible and stress-free for all our clients.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-white p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-hiddekel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white h-8 w-8" />
                </div>
                <h3 className="font-semibold text-hiddekel-gray text-xl mb-3">CUSTOMER CARE</h3>
                <p className="text-gray-600">
                  Dedicated support throughout your journey from inquiry to home construction. Your satisfaction is our priority.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-white p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-hiddekel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="text-white h-8 w-8" />
                </div>
                <h3 className="font-semibold text-hiddekel-gray text-xl mb-3">INNOVATIVE</h3>
                <p className="text-gray-600">
                  Modern solutions for contemporary living. We embrace new technologies and sustainable development practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-hiddekel-gray mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Hiddekel Investments was founded with a simple yet ambitious vision: to transform Zimbabwe's residential landscape through premium land development. Our journey began with a commitment to excellence and a deep understanding of what families truly need in their quest for the perfect home.
                </p>
                <p>
                  Over the years, we have established ourselves as trusted partners in land development, consistently delivering projects that exceed expectations. Our team combines local expertise with international standards to create developments that stand the test of time.
                </p>
                <p>
                  Today, we continue to innovate and expand, bringing new opportunities for homeownership to communities across Zimbabwe. Every project we undertake reflects our core values of quality, integrity, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Team reviewing construction plans" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-hiddekel-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hiddekel-gold mb-2">500+</div>
              <div className="text-gray-300">Stands Developed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hiddekel-gold mb-2">300+</div>
              <div className="text-gray-300">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hiddekel-gold mb-2">10+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-hiddekel-gold mb-2">5</div>
              <div className="text-gray-300">Active Projects</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
