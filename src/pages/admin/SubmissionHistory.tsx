import { useState } from "react";
import { usePropertyStore, PropertySubmission, PropertyStatus, BuyerRequirement, RequirementStatus } from "@/store/propertyStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { History, Search, Filter, Eye, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "react-router-dom";

const SubmissionHistory = () => {
    const { getAllSubmissions, getAllRequirements } = usePropertyStore();
    const allSubmissions = getAllSubmissions();
    const allRequirements = getAllRequirements();
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "all");
    const [typeFilter, setTypeFilter] = useState<string>(searchParams.get("type") || "all");
    const [viewingSubmission, setViewingSubmission] = useState<PropertySubmission | null>(null);
    const [viewingRequirement, setViewingRequirement] = useState<BuyerRequirement | null>(null);
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "properties");

    // Sync state to URL params
    const updateParams = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value !== 'all') {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        updateParams("tab", value);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        updateParams("status", value);
    };

    const handleTypeChange = (value: string) => {
        setTypeFilter(value);
        updateParams("type", value);
    };

    const filteredSubmissions = allSubmissions.filter(sub => {
        const matchesSearch = sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
        const matchesType = typeFilter === "all" || sub.listingCategory === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    }).sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());

    const filteredRequirements = allRequirements.filter(req => {
        const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.phone.includes(searchTerm);
        const matchesStatus = statusFilter === "all" || req.status === statusFilter;
        const matchesType = typeFilter === "all" || req.requirementType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    }).sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());

    const getStatusBadge = (status: PropertyStatus) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
            case 'approved': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Approved</Badge>;
            case 'published': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge>;
            case 'rejected': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
            case 'deleted': return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Deleted</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getRequirementStatusBadge = (status: RequirementStatus) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
            case 'contacted': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Contacted</Badge>;
            case 'closed': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Closed</Badge>;
            case 'deleted': return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Deleted</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <History className="w-8 h-8 text-primary" />
                    History & Archives
                </h1>
                <p className="text-gray-500 mt-1">View history of all interactions, including property submissions and buyer requirements.</p>
            </div>

            <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="properties">Property Submissions</TabsTrigger>
                    <TabsTrigger value="requirements">Buyer/Tenant Requirements</TabsTrigger>
                </TabsList>

                <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder={activeTab === 'properties' ? "Search property or owner..." : "Search name or phone..."}
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <TabsContent value="properties" className="mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Property Submissions History</CardTitle>
                            <div className="flex gap-2">
                                <Select value={statusFilter} onValueChange={handleStatusChange}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                        <SelectItem value="deleted">Deleted</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={typeFilter} onValueChange={handleTypeChange}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="sell">Sell</SelectItem>
                                        <SelectItem value="lease">Lease</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Property</TableHead>
                                            <TableHead>Owner</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Admin Notes</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredSubmissions.length > 0 ? (
                                            filteredSubmissions.map((submission) => (
                                                <TableRow key={submission.id} className={submission.status === 'deleted' ? 'opacity-60 bg-gray-50' : ''}>
                                                    <TableCell>
                                                        <div className="font-medium">{submission.title}</div>
                                                        <div className="text-xs text-gray-500">{submission.city}</div>
                                                    </TableCell>
                                                    <TableCell>{submission.ownerName}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="capitalize">{submission.listingCategory}</Badge>
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {format(new Date(submission.submittedDate), 'MMM dd, yyyy')}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-sm text-gray-500 truncate max-w-[200px] block" title={submission.adminNotes}>
                                                            {submission.adminNotes || '-'}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setViewingSubmission(submission)}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                                    No submissions found matching your filters.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="requirements" className="mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Buyer/Tenant Requirements History</CardTitle>
                            <div className="flex gap-2">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                        <SelectItem value="deleted">Deleted</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="buy">Buy</SelectItem>
                                        <SelectItem value="rent">Rent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Client</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Preferences</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRequirements.length > 0 ? (
                                            filteredRequirements.map((req) => (
                                                <TableRow key={req.id} className={req.status === 'deleted' ? 'opacity-60 bg-gray-50' : ''}>
                                                    <TableCell>
                                                        <div className="font-medium">{req.name}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{req.phone}</div>
                                                        {req.email && <div className="text-xs text-gray-500">{req.email}</div>}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={req.requirementType === 'buy' ? 'default' : 'outline'} className="capitalize">
                                                            {req.requirementType}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm max-w-[200px] truncate">
                                                            {req.preferredCity} - {req.propertyTypes.join(', ')}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{getRequirementStatusBadge(req.status)}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {format(new Date(req.submittedDate), 'MMM dd, yyyy')}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setViewingRequirement(req)}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                                    No requirements found matching your filters.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* View Property Submission Dialog (Read Only) */}
            <Dialog open={!!viewingSubmission} onOpenChange={() => setViewingSubmission(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Submission Details</DialogTitle>
                        <DialogDescription>Read-only view of the submission</DialogDescription>
                    </DialogHeader>
                    {viewingSubmission && (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm">Status</h4>
                                <div className="mt-1">{getStatusBadge(viewingSubmission.status)}</div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Property</h4>
                                <p className="text-sm">{viewingSubmission.title}</p>
                                <p className="text-sm text-gray-500">{viewingSubmission.location}, {viewingSubmission.city}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Price</h4>
                                <p className="text-sm">{viewingSubmission.priceUnit}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Owner</h4>
                                <p className="text-sm">{viewingSubmission.ownerName} ({viewingSubmission.ownerPhone})</p>
                            </div>
                            {viewingSubmission.adminNotes && (
                                <div className="bg-gray-100 p-3 rounded text-sm">
                                    <p className="font-semibold text-xs text-gray-500 mb-1">ADMIN NOTES</p>
                                    {viewingSubmission.adminNotes}
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setViewingSubmission(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Requirement Dialog (Read Only) */}
            <Dialog open={!!viewingRequirement} onOpenChange={() => setViewingRequirement(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Requirement Details</DialogTitle>
                        <DialogDescription>Read-only view of the requirement</DialogDescription>
                    </DialogHeader>
                    {viewingRequirement && (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm">Status</h4>
                                <div className="mt-1">{getRequirementStatusBadge(viewingRequirement.status)}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-sm">Client Name</h4>
                                    <p className="text-sm">{viewingRequirement.name}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Type</h4>
                                    <p className="text-sm capitalize">{viewingRequirement.requirementType}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Contact</h4>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{viewingRequirement.phone}</span>
                                    </div>
                                    {viewingRequirement.email && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <span>{viewingRequirement.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Preferences</h4>
                                <p className="text-sm mt-1 mb-1"><span className="text-gray-500">Location:</span> {viewingRequirement.preferredCity} ({viewingRequirement.preferredAreas.join(', ')})</p>
                                <p className="text-sm mb-1"><span className="text-gray-500">Properties:</span> {viewingRequirement.propertyTypes.join(', ')}</p>
                                <p className="text-sm"><span className="text-gray-500">Budget:</span> ₹{viewingRequirement.budgetMin?.toLocaleString()} - ₹{viewingRequirement.budgetMax?.toLocaleString()}</p>
                            </div>
                            {viewingRequirement.additionalNotes && (
                                <div className="bg-gray-100 p-3 rounded text-sm">
                                    <p className="font-semibold text-xs text-gray-500 mb-1">NOTES</p>
                                    {viewingRequirement.additionalNotes}
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setViewingRequirement(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmissionHistory;
