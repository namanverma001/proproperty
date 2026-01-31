import { useState } from "react";
import { usePropertyStore, Location } from "@/store/propertyStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { MapPin, Plus, Pencil, Trash2, X } from "lucide-react";

const MasterLocations = () => {
    const { locations, addLocation, updateLocation, deleteLocation } = usePropertyStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Location | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        city: "",
        areas: [] as string[],
        newArea: "",
        isActive: true,
    });

    const openCreateDialog = () => {
        setEditingLocation(null);
        setFormData({ city: "", areas: [], newArea: "", isActive: true });
        setIsDialogOpen(true);
    };

    const openEditDialog = (location: Location) => {
        setEditingLocation(location);
        setFormData({
            city: location.city,
            areas: [...location.areas],
            newArea: "",
            isActive: location.isActive,
        });
        setIsDialogOpen(true);
    };

    const addArea = () => {
        if (formData.newArea.trim() && !formData.areas.includes(formData.newArea.trim())) {
            setFormData(prev => ({
                ...prev,
                areas: [...prev.areas, prev.newArea.trim()],
                newArea: "",
            }));
        }
    };

    const removeArea = (area: string) => {
        setFormData(prev => ({
            ...prev,
            areas: prev.areas.filter(a => a !== area),
        }));
    };

    const handleSubmit = () => {
        if (!formData.city.trim()) {
            toast.error("City name is required");
            return;
        }

        if (editingLocation) {
            updateLocation(editingLocation.id, {
                city: formData.city,
                areas: formData.areas,
                isActive: formData.isActive,
            });
            toast.success("Location updated successfully");
        } else {
            addLocation({
                city: formData.city,
                areas: formData.areas,
                isActive: formData.isActive,
            });
            toast.success("Location added successfully");
        }

        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (deletingId) {
            deleteLocation(deletingId);
            toast.success("Location deleted");
            setDeletingId(null);
        }
    };

    const toggleActive = (location: Location) => {
        updateLocation(location.id, { isActive: !location.isActive });
        toast.success(location.isActive ? "Location deactivated" : "Location activated");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <MapPin className="w-8 h-8 text-primary" />
                        Locations
                    </h1>
                    <p className="text-gray-500 mt-1">Manage cities and areas for property listings</p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Location
                </Button>
            </div>

            {/* Locations Table */}
            <Card>
                <CardHeader>
                    <CardTitle>{locations.length} Locations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>City</TableHead>
                                <TableHead>Areas</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {locations.map((location) => (
                                <TableRow key={location.id}>
                                    <TableCell className="font-medium">{location.city}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 max-w-md">
                                            {location.areas.slice(0, 3).map((area) => (
                                                <Badge key={area} variant="secondary" className="text-xs">
                                                    {area}
                                                </Badge>
                                            ))}
                                            {location.areas.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{location.areas.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={location.isActive}
                                            onCheckedChange={() => toggleActive(location)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openEditDialog(location)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-600"
                                                onClick={() => setDeletingId(location.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingLocation ? "Edit Location" : "Add New Location"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="city">City Name *</Label>
                            <Input
                                id="city"
                                placeholder="e.g., Mumbai"
                                value={formData.city}
                                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Areas / Localities</Label>
                            <div className="flex gap-2 mt-1">
                                <Input
                                    placeholder="Add area name"
                                    value={formData.newArea}
                                    onChange={(e) => setFormData(prev => ({ ...prev, newArea: e.target.value }))}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArea())}
                                />
                                <Button type="button" variant="secondary" onClick={addArea}>
                                    Add
                                </Button>
                            </div>

                            {formData.areas.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.areas.map((area) => (
                                        <Badge key={area} variant="secondary" className="gap-1 pr-1">
                                            {area}
                                            <button
                                                type="button"
                                                onClick={() => removeArea(area)}
                                                className="ml-1 hover:text-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="active">Active</Label>
                            <Switch
                                id="active"
                                checked={formData.isActive}
                                onCheckedChange={(v) => setFormData(prev => ({ ...prev, isActive: v }))}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            {editingLocation ? "Update" : "Add"} Location
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Location</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this location? This action cannot be undone.
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

export default MasterLocations;
