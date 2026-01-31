import { useState } from "react";
import { usePropertyStore, PropertyType } from "@/store/propertyStore";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Home, Plus, Pencil, Trash2 } from "lucide-react";

const MasterPropertyTypes = () => {
    const { propertyTypes, addPropertyType, updatePropertyType, deletePropertyType } = usePropertyStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingType, setEditingType] = useState<PropertyType | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "residential" as const,
        isActive: true,
    });

    const openCreateDialog = () => {
        setEditingType(null);
        setFormData({ name: "", category: "residential", isActive: true });
        setIsDialogOpen(true);
    };

    const openEditDialog = (type: PropertyType) => {
        setEditingType(type);
        setFormData({
            name: type.name,
            category: type.category,
            isActive: type.isActive,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            toast.error("Property type name is required");
            return;
        }

        if (editingType) {
            updatePropertyType(editingType.id, formData);
            toast.success("Property type updated successfully");
        } else {
            addPropertyType(formData);
            toast.success("Property type added successfully");
        }

        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (deletingId) {
            deletePropertyType(deletingId);
            toast.success("Property type deleted");
            setDeletingId(null);
        }
    };

    const toggleActive = (type: PropertyType) => {
        updatePropertyType(type.id, { isActive: !type.isActive });
        toast.success(type.isActive ? "Type deactivated" : "Type activated");
    };

    const residentialTypes = propertyTypes.filter(t => t.category === 'residential');
    const commercialTypes = propertyTypes.filter(t => t.category === 'commercial');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Home className="w-8 h-8 text-primary" />
                        Property Types
                    </h1>
                    <p className="text-gray-500 mt-1">Manage property types for both residential and commercial</p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Type
                </Button>
            </div>

            {/* Residential Types */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        Residential ({residentialTypes.length})
                    </CardTitle>
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
                            {residentialTypes.map((type) => (
                                <TableRow key={type.id}>
                                    <TableCell className="font-medium">{type.name}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={type.isActive}
                                            onCheckedChange={() => toggleActive(type)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openEditDialog(type)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-600"
                                                onClick={() => setDeletingId(type.id)}
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

            {/* Commercial Types */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        🏢 Commercial ({commercialTypes.length})
                    </CardTitle>
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
                            {commercialTypes.map((type) => (
                                <TableRow key={type.id}>
                                    <TableCell className="font-medium">{type.name}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={type.isActive}
                                            onCheckedChange={() => toggleActive(type)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openEditDialog(type)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-600"
                                                onClick={() => setDeletingId(type.id)}
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
                            {editingType ? "Edit Property Type" : "Add Property Type"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Type Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Apartment, Office"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Category *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(v: any) => setFormData(prev => ({ ...prev, category: v }))}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="residential">Residential</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                </SelectContent>
                            </Select>
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
                            {editingType ? "Update" : "Add"} Type
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Property Type</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this property type? This action cannot be undone.
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

export default MasterPropertyTypes;
