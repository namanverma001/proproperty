import { useState } from "react";
import { usePropertyStore, PropertySubmission, PropertyStatus } from "@/store/propertyStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
    Building2,
    Search,
    Eye,
    Trash2,
    ToggleLeft,
    ToggleRight,
    MapPin,
    User,
    Phone,
    CheckCircle2,
    XCircle,
    Clock,
    Globe,
} from "lucide-react";
import { format } from "date-fns";

const PropertyManagement = () => {
    const {
        getAllProperties,
        publishSubmission,
        unpublishSubmission,
        deleteSubmission,
        approveSubmission,
    } = usePropertyStore();

    const allProperties = getAllProperties();

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [viewingProperty, setViewingProperty] = useState<PropertySubmission | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Filter properties
    const filteredProperties = allProperties.filter(prop => {
        const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prop.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || prop.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || prop.listingCategory === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusBadge = (status: PropertyStatus) => {
        const variants: Record<PropertyStatus, { variant: "default" | "secondary" | "destructive" | "outline"; icon: any; label: string }> = {
            pending: { variant: "outline", icon: Clock, label: "Pending" },
            approved: { variant: "secondary", icon: CheckCircle2, label: "Approved" },
            rejected: { variant: "destructive", icon: XCircle, label: "Rejected" },
            published: { variant: "default", icon: Globe, label: "Published" },
        };
        const { variant, icon: Icon, label } = variants[status];
        return (
            <Badge variant={variant} className="gap-1">
                <Icon className="w-3 h-3" />
                {label}
            </Badge>
        );
    };

    const handlePublishToggle = (property: PropertySubmission) => {
        if (property.status === 'published') {
            unpublishSubmission(property.id);
            toast.success("Property unpublished");
        } else if (property.status === 'approved' || property.status === 'pending') {
            if (property.status === 'pending') {
                approveSubmission(property.id);
            }
            publishSubmission(property.id);
            toast.success("Property published");
        }
    };

    const handleDelete = () => {
        if (deletingId) {
            deleteSubmission(deletingId);
            toast.success("Property deleted");
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-primary" />
                    Property Management
                </h1>
                <p className="text-gray-500 mt-1">Manage all properties - approve, publish, or delete submissions</p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search by title, city, or owner..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="sell">For Sale</SelectItem>
                                <SelectItem value="lease">For Lease</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Properties Table */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {filteredProperties.length} Properties
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredProperties.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Property</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProperties.map((property) => (
                                        <TableRow key={property.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium truncate max-w-[200px]">{property.title}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {property.listingCategory === 'sell' ? 'For Sale' : 'For Rent'}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <MapPin className="w-3 h-3 text-gray-400" />
                                                    {property.city}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium text-sm">{property.priceUnit}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs">{property.type}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(property.status)}
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs text-gray-500">
                                                    {property.source === 'admin' ? '👑 Admin' : '👤 User'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setViewingProperty(property)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    {(property.status === 'approved' || property.status === 'published' || property.status === 'pending') && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handlePublishToggle(property)}
                                                            title={property.status === 'published' ? 'Unpublish' : 'Publish'}
                                                        >
                                                            {property.status === 'published' ? (
                                                                <ToggleRight className="w-4 h-4 text-green-600" />
                                                            ) : (
                                                                <ToggleLeft className="w-4 h-4 text-gray-400" />
                                                            )}
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => setDeletingId(property.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No properties found</p>
                            <p className="text-sm">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* View Property Dialog */}
            <Dialog open={!!viewingProperty} onOpenChange={() => setViewingProperty(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Property Details</DialogTitle>
                        <DialogDescription>
                            Full details of the property submission.
                        </DialogDescription>
                    </DialogHeader>

                    {viewingProperty && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">{viewingProperty.title}</h3>
                                {getStatusBadge(viewingProperty.status)}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Price:</span>
                                    <span className="font-medium ml-2">{viewingProperty.priceUnit}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Type:</span>
                                    <span className="ml-2">{viewingProperty.type}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Location:</span>
                                    <span className="ml-2">{viewingProperty.location}, {viewingProperty.city}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Area:</span>
                                    <span className="ml-2">{viewingProperty.area} {viewingProperty.areaUnit}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Category:</span>
                                    <span className="ml-2">{viewingProperty.listingCategory === 'sell' ? 'For Sale' : 'For Rent'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Source:</span>
                                    <span className="ml-2">{viewingProperty.source === 'admin' ? 'Admin Created' : 'User Submission'}</span>
                                </div>
                            </div>

                            {viewingProperty.description && (
                                <div>
                                    <p className="text-sm font-medium mb-1">Description</p>
                                    <p className="text-sm text-gray-600">{viewingProperty.description}</p>
                                </div>
                            )}

                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm font-medium mb-2">Property Details</p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {viewingProperty.bedrooms > 0 && <p><span className="text-gray-500">Bedrooms:</span> {viewingProperty.bedrooms}</p>}
                                    {viewingProperty.bathrooms > 0 && <p><span className="text-gray-500">Bathrooms:</span> {viewingProperty.bathrooms}</p>}
                                    <p><span className="text-gray-500">Furnishing:</span> {viewingProperty.furnishing || 'N/A'}</p>
                                    <p><span className="text-gray-500">Construction:</span> {viewingProperty.constructionStatus || 'N/A'}</p>
                                    <p><span className="text-gray-500">Parking:</span> {viewingProperty.parking}</p>
                                    <p><span className="text-gray-500">Age:</span> {viewingProperty.ageOfProperty || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-sm font-medium mb-2">Owner Details</p>
                                <div className="space-y-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span>{viewingProperty.ownerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{viewingProperty.ownerPhone}</span>
                                    </div>
                                </div>
                            </div>

                            {viewingProperty.amenities.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium mb-2">Amenities</p>
                                    <div className="flex flex-wrap gap-2">
                                        {viewingProperty.amenities.map((amenity) => (
                                            <Badge key={amenity} variant="secondary">{amenity}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="text-xs text-gray-500 space-y-1">
                                <p>Submitted: {format(new Date(viewingProperty.submittedDate), 'PPpp')}</p>
                                {viewingProperty.approvedDate && <p>Approved: {format(new Date(viewingProperty.approvedDate), 'PPpp')}</p>}
                                {viewingProperty.publishedDate && <p>Published: {format(new Date(viewingProperty.publishedDate), 'PPpp')}</p>}
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewingProperty(null)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Property</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this property? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default PropertyManagement;
