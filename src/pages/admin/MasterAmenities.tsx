import { useState } from "react";
import { usePropertyStore, Amenity } from "@/store/propertyStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Sparkles, Plus, Pencil, Trash2 } from "lucide-react";

const MasterAmenities = () => {
    const { amenities, addAmenity, updateAmenity, deleteAmenity } = usePropertyStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        isActive: true,
    });

    const openCreateDialog = () => {
        setEditingAmenity(null);
        setFormData({ name: "", isActive: true });
        setIsDialogOpen(true);
    };

    const openEditDialog = (amenity: Amenity) => {
        setEditingAmenity(amenity);
        setFormData({
            name: amenity.name,
            isActive: amenity.isActive,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            toast.error("Amenity name is required");
            return;
        }

        if (editingAmenity) {
            updateAmenity(editingAmenity.id, formData);
            toast.success("Amenity updated successfully");
        } else {
            addAmenity(formData);
            toast.success("Amenity added successfully");
        }

        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (deletingId) {
            deleteAmenity(deletingId);
            toast.success("Amenity deleted");
            setDeletingId(null);
        }
    };

    const toggleActive = (amenity: Amenity) => {
        updateAmenity(amenity.id, { isActive: !amenity.isActive });
        toast.success(amenity.isActive ? "Amenity deactivated" : "Amenity activated");
    };

    const activeCount = amenities.filter(a => a.isActive).length;
    const inactiveCount = amenities.filter(a => !a.isActive).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-primary" />
                        Amenities
                    </h1>
                    <p className="text-gray-500 mt-1">Manage amenities that can be added to property listings</p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Amenity
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{amenities.length}</div>
                        <p className="text-sm text-gray-500">Total Amenities</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                        <p className="text-sm text-gray-500">Active</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-gray-400">{inactiveCount}</div>
                        <p className="text-sm text-gray-500">Inactive</p>
                    </CardContent>
                </Card>
            </div>

            {/* Amenities Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {amenities.map((amenity) => (
                                <TableRow key={amenity.id}>
                                    <TableCell className="font-medium">{amenity.name}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={amenity.isActive}
                                            onCheckedChange={() => toggleActive(amenity)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openEditDialog(amenity)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-600"
                                                onClick={() => setDeletingId(amenity.id)}
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
                            {editingAmenity ? "Edit Amenity" : "Add New Amenity"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Amenity Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Swimming Pool, Gym"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1"
                            />
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
                            {editingAmenity ? "Update" : "Add"} Amenity
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Amenity</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this amenity? This action cannot be undone.
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

export default MasterAmenities;
