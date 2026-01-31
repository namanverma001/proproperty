import { useEffect } from "react";
import { usePropertyStore } from "@/store/propertyStore";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE } from "@/store/adminStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    InboxIcon,
    Building2,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    TrendingUp,
    ArrowRight,
} from "lucide-react";

const AdminDashboard = () => {
    const { getStats, getPendingSubmissions, submissions } = usePropertyStore();
    const stats = getStats();
    const recentPending = getPendingSubmissions().slice(0, 5);

    // Debug: Check localStorage directly
    const debugLocalStorage = () => {
        const stored = localStorage.getItem('proproperty_submissions');
        console.log('[AdminDashboard] Raw localStorage:', stored);
        console.log('[AdminDashboard] Parsed:', stored ? JSON.parse(stored) : 'null');
        console.log('[AdminDashboard] Store submissions:', submissions);
        console.log('[AdminDashboard] Stats:', stats);
    };

    // Log on mount
    useEffect(() => {
        debugLocalStorage();
    }, [submissions]);

    const statCards = [
        {
            title: "Total Submissions",
            value: stats.total,
            icon: Building2,
            color: "bg-blue-500",
            textColor: "text-blue-600",
            bgLight: "bg-blue-50",
        },
        {
            title: "Pending Review",
            value: stats.pending,
            icon: Clock,
            color: "bg-amber-500",
            textColor: "text-amber-600",
            bgLight: "bg-amber-50",
        },
        {
            title: "Approved",
            value: stats.approved,
            icon: CheckCircle2,
            color: "bg-emerald-500",
            textColor: "text-emerald-600",
            bgLight: "bg-emerald-50",
        },
        {
            title: "Published",
            value: stats.published,
            icon: Eye,
            color: "bg-purple-500",
            textColor: "text-purple-600",
            bgLight: "bg-purple-50",
        },
        {
            title: "Rejected",
            value: stats.rejected,
            icon: XCircle,
            color: "bg-red-500",
            textColor: "text-red-600",
            bgLight: "bg-red-50",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <LayoutDashboard className="w-8 h-8 text-primary" />
                    Dashboard
                </h1>
                <p className="text-gray-500 mt-1">Overview of all property submissions and their status</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {statCards.map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className={`h-1 ${stat.color}`} />
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <h3 className={`text-2xl font-bold mt-1 ${stat.textColor}`}>
                                            {stat.value}
                                        </h3>
                                    </div>
                                    <div className={`p-2 rounded-lg ${stat.bgLight}`}>
                                        <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pending Requests */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <InboxIcon className="w-5 h-5 text-amber-500" />
                            Pending Requests
                        </CardTitle>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                                <Link to={`${ADMIN_ROUTE}/pending-sell`}>
                                    Sell ({stats.pendingSell})
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                                <Link to={`${ADMIN_ROUTE}/pending-lease`}>
                                    Lease ({stats.pendingLease})
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {recentPending.length > 0 ? (
                            <div className="space-y-3">
                                {recentPending.map((submission) => (
                                    <div
                                        key={submission.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium text-sm truncate max-w-[200px]">
                                                {submission.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {submission.city} • {submission.listingCategory === 'sell' ? 'For Sale' : 'For Lease'}
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link to={`${ADMIN_ROUTE}/properties`}>
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <InboxIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No pending submissions</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link to={`${ADMIN_ROUTE}/create`}>
                                <Building2 className="w-4 h-4 mr-2" />
                                Create New Property
                            </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link to={`${ADMIN_ROUTE}/properties`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View All Properties
                            </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link to={`${ADMIN_ROUTE}/master/locations`}>
                                <span className="w-4 h-4 mr-2">📍</span>
                                Manage Locations
                            </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link to={`${ADMIN_ROUTE}/master/amenities`}>
                                <span className="w-4 h-4 mr-2">✨</span>
                                Manage Amenities
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Info Banner */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="py-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Building2 className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">Admin Control Panel</h3>
                            <p className="text-sm text-gray-600">
                                Public users can only submit property data. Nothing is displayed publicly unless
                                you review and publish it from this admin panel.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
