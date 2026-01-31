import { useState } from "react";
import { usePropertyStore, BuyerRequirement } from "@/store/propertyStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    Phone,
    Mail,
    MapPin,
    Home,
    Building2,
    IndianRupee,
    Ruler,
    BedDouble,
    CheckCircle,
    XCircle,
    MessageCircle,
    Calendar,
    User,
    History,
    ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE } from "@/store/adminStore";

const PendingBuyRequirements = () => {
    const { getPendingRequirements, markRequirementContacted, markRequirementClosed, deleteBuyerRequirement } = usePropertyStore();
    const requirements = getPendingRequirements("buy");

    const [selectedRequirement, setSelectedRequirement] = useState<BuyerRequirement | null>(null);
    const [actionType, setActionType] = useState<"contact" | "close" | null>(null);
    const [notes, setNotes] = useState("");

    const handleAction = () => {
        if (!selectedRequirement) return;

        if (actionType === "contact") {
            markRequirementContacted(selectedRequirement.id, notes);
            toast.success("Requirement marked as contacted");
        } else if (actionType === "close") {
            markRequirementClosed(selectedRequirement.id, notes);
            toast.success("Requirement closed");
        }

        setSelectedRequirement(null);
        setActionType(null);
        setNotes("");
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this requirement?")) {
            deleteBuyerRequirement(id);
            toast.success("Requirement deleted");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatBudget = (min?: number, max?: number) => {
        if (!min && !max) return "Any budget";
        if (min && max) return `₹${(min / 100000).toFixed(0)}L - ₹${(max / 100000).toFixed(0)}L`;
        if (min) return `Min ₹${(min / 100000).toFixed(0)}L`;
        if (max) return `Max ₹${(max / 100000).toFixed(0)}L`;
        return "Not specified";
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Badge variant="outline" className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border-gray-200 bg-white">
                            <ShoppingCart className="w-5 h-5 text-purple-600" />
                        </Badge>
                        Buy Requirements
                    </h1>
                    <p className="text-gray-500 mt-1">Review and manage property buying requirements from clients</p>
                </div>
                <Link to={`${ADMIN_ROUTE}/history?tab=requirements&type=buy`}>
                    <Button variant="outline" className="flex items-center gap-2">
                        <History className="w-4 h-4" />
                        View History
                    </Button>
                </Link>
            </div>

            {requirements.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No Pending Requirements</h3>
                        <p className="text-muted-foreground">
                            New buyer requirements will appear here when users submit them.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {requirements.map((req) => (
                        <Card key={req.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{req.name}</CardTitle>
                                            <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    {req.phone}
                                                </span>
                                                {req.email && (
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {req.email}
                                                    </span>
                                                )}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 self-start sm:self-auto">
                                        <Badge variant={req.propertyCategory === "residential" ? "default" : "secondary"}>
                                            {req.propertyCategory === "residential" ? (
                                                <><Home className="w-3 h-3 mr-1" /> Residential</>
                                            ) : (
                                                <><Building2 className="w-3 h-3 mr-1" /> Commercial</>
                                            )}
                                        </Badge>
                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                            Looking to Buy
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Property Preferences */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> Location
                                        </span>
                                        <p className="font-medium">{req.preferredCity}</p>
                                        {req.preferredAreas.length > 0 && (
                                            <p className="text-xs text-muted-foreground">{req.preferredAreas.join(", ")}</p>
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <Home className="w-3 h-3" /> Property Types
                                        </span>
                                        <p className="font-medium">{req.propertyTypes.join(", ")}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <IndianRupee className="w-3 h-3" /> Budget
                                        </span>
                                        <p className="font-medium">{formatBudget(req.budgetMin, req.budgetMax)}</p>
                                    </div>
                                    {req.propertyCategory === "residential" && (
                                        <div>
                                            <span className="text-muted-foreground flex items-center gap-1">
                                                <BedDouble className="w-3 h-3" /> BHK
                                            </span>
                                            <p className="font-medium">
                                                {req.bedroomsMin && req.bedroomsMax
                                                    ? `${req.bedroomsMin} - ${req.bedroomsMax} BHK`
                                                    : req.bedroomsMin
                                                        ? `${req.bedroomsMin}+ BHK`
                                                        : req.bedroomsMax
                                                            ? `Up to ${req.bedroomsMax} BHK`
                                                            : "Any"}
                                            </p>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <Ruler className="w-3 h-3" /> Area
                                        </span>
                                        <p className="font-medium">
                                            {req.areaMin && req.areaMax
                                                ? `${req.areaMin} - ${req.areaMax} sq.ft`
                                                : req.areaMin
                                                    ? `${req.areaMin}+ sq.ft`
                                                    : req.areaMax
                                                        ? `Up to ${req.areaMax} sq.ft`
                                                        : "Any size"}
                                        </p>
                                    </div>
                                    {req.constructionStatus && (
                                        <div>
                                            <span className="text-muted-foreground">Status Pref</span>
                                            <p className="font-medium">{req.constructionStatus}</p>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> Submitted
                                        </span>
                                        <p className="font-medium">{formatDate(req.submittedDate)}</p>
                                    </div>
                                </div>

                                {/* Amenities */}
                                {req.preferredAmenities.length > 0 && (
                                    <div>
                                        <span className="text-sm text-muted-foreground">Preferred Amenities:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {req.preferredAmenities.map((amenity) => (
                                                <Badge key={amenity} variant="outline" className="text-xs">
                                                    {amenity}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Additional Notes */}
                                {req.additionalNotes && (
                                    <div className="bg-muted/50 p-3 rounded-lg">
                                        <span className="text-sm text-muted-foreground">Additional Notes:</span>
                                        <p className="text-sm mt-1">{req.additionalNotes}</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-2 border-t">
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setSelectedRequirement(req);
                                            setActionType("contact");
                                        }}
                                        className="gap-1"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Mark Contacted
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedRequirement(req);
                                            setActionType("close");
                                        }}
                                        className="gap-1"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Close
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(req.id)}
                                        className="gap-1 text-destructive hover:text-destructive ml-auto"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Action Dialog */}
            <Dialog open={!!actionType} onOpenChange={() => setActionType(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {actionType === "contact" ? "Mark as Contacted" : "Close Requirement"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            {actionType === "contact"
                                ? "Add notes about your contact with this buyer."
                                : "Add notes about why this requirement is being closed."}
                        </p>
                        <Textarea
                            placeholder="Add notes (optional)..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setActionType(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAction}>
                            {actionType === "contact" ? "Mark Contacted" : "Close Requirement"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PendingBuyRequirements;
