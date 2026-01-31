import { useState } from "react";
import { usePropertyStore, PropertySubmission } from "@/store/propertyStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    InboxIcon,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    MapPin,
    IndianRupee,
    Home,
    User,
    Phone,
    Key,
} from "lucide-react";
import { format } from "date-fns";

const PendingLeaseRequests = () => {
    const { getPendingSubmissions, approveSubmission, rejectSubmission, publishSubmission } = usePropertyStore();
    const pendingSubmissions = getPendingSubmissions('lease');

    const [viewingSubmission, setViewingSubmission] = useState<PropertySubmission | null>(null);
    const [adminNotes, setAdminNotes] = useState("");

    const handleAction = (type: 'approve' | 'reject') => {
        if (!viewingSubmission) return;

        if (type === 'approve') {
            approveSubmission(viewingSubmission.id, adminNotes);
            toast.success("Property approved successfully!");
        } else {
            rejectSubmission(viewingSubmission.id, adminNotes);
            toast.success("Property rejected.");
        }

        setViewingSubmission(null);
        setAdminNotes("");
    };

    const handleApproveAndPublish = () => {
        if (!viewingSubmission) return;
        approveSubmission(viewingSubmission.id, adminNotes);
        publishSubmission(viewingSubmission.id);
        toast.success("Property approved and published!");
        setViewingSubmission(null);
        setAdminNotes("");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Key className="w-8 h-8 text-amber-500" />
                    Pending Lease Requests
                </h1>
                <p className="text-gray-500 mt-1">Review and approve property lease/rental submissions from users</p>
            </div>

            {/* Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-500" />
                            {pendingSubmissions.length} Pending Submissions
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {pendingSubmissions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Property</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Rent</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Submitted</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingSubmissions.map((submission) => (
                                        <TableRow key={submission.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium truncate max-w-[200px]">{submission.title}</p>
                                                    <p className="text-xs text-gray-500">{submission.ownerName}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <MapPin className="w-3 h-3 text-gray-400" />
                                                    {submission.location}, {submission.city}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">{submission.priceUnit}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{submission.type}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-gray-500">
                                                    {format(new Date(submission.submittedDate), 'MMM dd, yyyy')}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setViewingSubmission(submission)}
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    Review
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <InboxIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No pending lease requests</p>
                            <p className="text-sm">New submissions will appear here for review.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* View Submission Dialog */}
            <Dialog open={!!viewingSubmission} onOpenChange={() => setViewingSubmission(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Review Lease Submission</DialogTitle>
                        <DialogDescription>
                            Review the rental property details and approve or reject this submission.
                        </DialogDescription>
                    </DialogHeader>

                    {viewingSubmission && (
                        <div className="space-y-6">
                            {/* Property Info */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">{viewingSubmission.title}</h3>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <IndianRupee className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium">{viewingSubmission.priceUnit}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Home className="w-4 h-4 text-gray-400" />
                                        <span>{viewingSubmission.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span>{viewingSubmission.location}, {viewingSubmission.city}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">Area:</span>
                                        <span>{viewingSubmission.area} {viewingSubmission.areaUnit}</span>
                                    </div>
                                </div>

                                {/* Rental Details */}
                                <div className="bg-green-50 rounded-lg p-4">
                                    <p className="text-sm font-medium mb-2">Rental Details</p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <p><span className="text-gray-500">Monthly Rent:</span> {viewingSubmission.priceUnit}</p>
                                        {viewingSubmission.securityDeposit && (
                                            <p><span className="text-gray-500">Deposit:</span> ₹{viewingSubmission.securityDeposit.toLocaleString()}</p>
                                        )}
                                        {viewingSubmission.maintenanceCharges && (
                                            <p><span className="text-gray-500">Maintenance:</span> ₹{viewingSubmission.maintenanceCharges.toLocaleString()}/month</p>
                                        )}
                                        <p><span className="text-gray-500">Furnishing:</span> {viewingSubmission.furnishing || 'N/A'}</p>
                                    </div>
                                </div>

                                {viewingSubmission.description && (
                                    <div>
                                        <p className="text-sm font-medium mb-1">Description</p>
                                        <p className="text-sm text-gray-600">{viewingSubmission.description}</p>
                                    </div>
                                )}

                                {/* Full Address */}
                                {(viewingSubmission.address || viewingSubmission.pincode) && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm font-medium mb-2">Full Address</p>
                                        <p className="text-sm text-gray-600">
                                            {viewingSubmission.address && <span>{viewingSubmission.address}, </span>}
                                            {viewingSubmission.location}, {viewingSubmission.city}
                                            {viewingSubmission.pincode && <span> - {viewingSubmission.pincode}</span>}
                                        </p>
                                    </div>
                                )}

                                {/* Uploaded Images */}
                                {viewingSubmission.images && viewingSubmission.images.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium mb-2">Uploaded Images ({viewingSubmission.images.length})</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {viewingSubmission.images.map((img, index) => (
                                                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                                                    <img
                                                        src={img}
                                                        alt={`Property ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Property Details */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm font-medium mb-2">Property Details</p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {viewingSubmission.bedrooms > 0 && (
                                            <p><span className="text-gray-500">Bedrooms:</span> {viewingSubmission.bedrooms}</p>
                                        )}
                                        {viewingSubmission.bathrooms > 0 && (
                                            <p><span className="text-gray-500">Bathrooms:</span> {viewingSubmission.bathrooms}</p>
                                        )}
                                        <p><span className="text-gray-500">Facing:</span> {viewingSubmission.facing || 'N/A'}</p>
                                        <p><span className="text-gray-500">Parking:</span> {viewingSubmission.parking}</p>
                                        {viewingSubmission.floorNumber && (
                                            <p><span className="text-gray-500">Floor:</span> {viewingSubmission.floorNumber} of {viewingSubmission.totalFloors}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Owner Details */}
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <p className="text-sm font-medium mb-2">Owner / Contact Details</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span>{viewingSubmission.ownerName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span>{viewingSubmission.ownerPhone}</span>
                                        </div>
                                        {viewingSubmission.ownerEmail && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Email:</span>
                                                <span>{viewingSubmission.ownerEmail}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Amenities */}
                                {viewingSubmission.amenities.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium mb-2">Amenities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {viewingSubmission.amenities.map((amenity) => (
                                                <Badge key={amenity} variant="secondary">{amenity}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Admin Notes */}
                                <div>
                                    <p className="text-sm font-medium mb-2">Admin Notes (optional)</p>
                                    <Textarea
                                        placeholder="Add any notes about this submission..."
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                    />
                                </div>
                            </div>

                            <DialogFooter className="flex-col sm:flex-row gap-2">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleAction('reject')}
                                >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleAction('approve')}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    Approve Only
                                </Button>
                                <Button
                                    onClick={handleApproveAndPublish}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    Approve & Publish
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PendingLeaseRequests;
