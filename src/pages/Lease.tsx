import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LeaseResidentialForm from "./forms/LeaseResidentialForm";
import LeaseCommercialForm from "./forms/LeaseCommercialForm";
import { Home, Building2, Shield, Clock, Users, Key } from "lucide-react";

const Lease = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white pt-32 pb-16 md:pt-40">
                    <div className="container-main">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Key className="w-10 h-10 text-accent" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Lease Your Property
                            </h1>
                            <p className="text-xl text-white/80 mb-8">
                                Find verified tenants for your property. List on India's most trusted
                                rental platform and start earning passive income.
                            </p>

                            {/* Trust indicators */}
                            <div className="flex flex-wrap justify-center gap-8 mt-8">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-accent" />
                                    <span className="text-sm">Verified Tenants</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-accent" />
                                    <span className="text-sm">Quick Occupancy</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-accent" />
                                    <span className="text-sm">Rental Support</span>
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
                                <CardTitle className="text-2xl">List Your Property for Rent/Lease</CardTitle>
                                <CardDescription>
                                    Choose your property type and fill in the details. Find tenants quickly with our verified network.
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
                                        <LeaseResidentialForm />
                                    </TabsContent>

                                    <TabsContent value="commercial">
                                        <LeaseCommercialForm />
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Benefits */}
                        <div className="max-w-4xl mx-auto mt-16">
                            <h2 className="text-2xl font-bold text-center mb-8">Why Lease with Pro Property?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-7 h-7 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Verified Tenants</h3>
                                    <p className="text-gray-600 text-sm">
                                        All tenant leads are verified for background and employment.
                                    </p>
                                </div>
                                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Fast Occupancy</h3>
                                    <p className="text-gray-600 text-sm">
                                        Average listing gets tenant inquiries within 48 hours.
                                    </p>
                                </div>
                                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-7 h-7 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Dedicated Support</h3>
                                    <p className="text-gray-600 text-sm">
                                        Our team helps you through the entire rental process.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How it works */}
                        <div className="max-w-4xl mx-auto mt-16">
                            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="text-center relative">
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                        1
                                    </div>
                                    <h3 className="font-semibold mb-2 text-sm">Submit Details</h3>
                                    <p className="text-gray-600 text-xs">
                                        Fill property & rental details
                                    </p>
                                </div>
                                <div className="text-center relative">
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                        2
                                    </div>
                                    <h3 className="font-semibold mb-2 text-sm">Review</h3>
                                    <p className="text-gray-600 text-xs">
                                        Our team verifies listing
                                    </p>
                                </div>
                                <div className="text-center relative">
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                        3
                                    </div>
                                    <h3 className="font-semibold mb-2 text-sm">Go Live</h3>
                                    <p className="text-gray-600 text-xs">
                                        Property published online
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                        4
                                    </div>
                                    <h3 className="font-semibold mb-2 text-sm">Get Tenants</h3>
                                    <p className="text-gray-600 text-xs">
                                        Receive verified inquiries
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

export default Lease;
