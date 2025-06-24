import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactMessage } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const submitMessage = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We will get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-hiddekel-gray to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Ready to secure your dream stand? Contact us today for more information.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-hiddekel-light rounded-3xl p-8">
              <CardContent className="pt-0">
                <h2 className="text-2xl font-bold text-hiddekel-gray mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700 text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-hiddekel-gold focus:ring-hiddekel-gold/20"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700 text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-hiddekel-gold focus:ring-hiddekel-gold/20"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 border-gray-300 focus:border-hiddekel-gold focus:ring-hiddekel-gold/20"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 text-sm font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 border-gray-300 focus:border-hiddekel-gold focus:ring-hiddekel-gold/20"
                      placeholder="+263 xxx xxx xxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700 text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 border-gray-300 focus:border-hiddekel-gold focus:ring-hiddekel-gold/20"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitMessage.isPending}
                    className="w-full bg-hiddekel-gold text-white hover:bg-yellow-600 transition-colors duration-300"
                  >
                    {submitMessage.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-hiddekel-gray mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-hiddekel-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-hiddekel-gray mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        Suite 13,16 First Floor Merchant House<br />
                        43 Robson Manyika Ave, Harare
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-hiddekel-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-hiddekel-gray mb-1">Phone Numbers</h3>
                      <p className="text-gray-600">
                        +263 716 236 518<br />
                        +263 775 504 244<br />
                        +263 782 099 899
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-hiddekel-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-hiddekel-gray mb-1">Email</h3>
                      <p className="text-gray-600">
                        hiddekel.investment@gmail.com<br />
                        info@hiddekel.org
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-hiddekel-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-hiddekel-gray mb-1">Website</h3>
                      <p className="text-gray-600">www.hiddekel.org</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <Card className="bg-hiddekel-gray text-white p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center mb-4">
                    <Clock className="text-hiddekel-gold mr-2 h-6 w-6" />
                    <h3 className="font-semibold text-lg">Office Hours</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>8:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
