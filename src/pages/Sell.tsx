import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SellResidentialForm from "./forms/SellResidentialForm";
import SellCommercialForm from "./forms/SellCommercialForm";
import { Home, Building2, Shield, Clock, Users } from "lucide-react";

const Sell = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-16">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sell Your Property with Pro Property
              </h1>
              <p className="text-xl text-white/80 mb-8">
                List your property with India's most trusted real estate platform.
                Get the best value and reach millions of potential buyers.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm">Verified Buyers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm">Quick Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container-main">
            <Card className="max-w-4xl mx-auto shadow-xl">
              <CardHeader className="text-center border-b bg-gray-50/50">
                <CardTitle className="text-2xl">List Your Property for Sale</CardTitle>
                <CardDescription>
                  Choose your property type and fill in the details. Our team will review and publish your listing.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <Tabs defaultValue="residential" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="residential" className="flex items-center gap-2 py-3">
                      <Home className="w-4 h-4" />
                      Residential
                    </TabsTrigger>
                    <TabsTrigger value="commercial" className="flex items-center gap-2 py-3">
                      <Building2 className="w-4 h-4" />
                      Commercial
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="residential">
                    <SellResidentialForm />
                  </TabsContent>

                  <TabsContent value="commercial">
                    <SellCommercialForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* How it works */}
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Submit Details</h3>
                  <p className="text-gray-600 text-sm">
                    Fill in your property details including photos, location, and pricing.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Review & Approval</h3>
                  <p className="text-gray-600 text-sm">
                    Our team reviews your submission for quality and accuracy.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Leads</h3>
                  <p className="text-gray-600 text-sm">
                    Once published, receive inquiries from verified buyers directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sell;
