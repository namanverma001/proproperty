import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
    minImages?: number;
    maxSizeMB?: number;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_EXTENSIONS = '.jpg, .jpeg, .png';

const ImageUpload = ({
    images,
    onImagesChange,
    maxImages = 10,
    minImages = 0,
    maxSizeMB = 2
}: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        if (images.length + files.length > maxImages) {
            toast.error(`Maximum ${maxImages} images allowed`);
            return;
        }

        setUploading(true);

        const newImages: string[] = [...images];
        let processed = 0;

        Array.from(files).forEach((file) => {
            // Check file type
            if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
                toast.error(`File ${file.name} is not a valid format. Only JPG, JPEG, PNG allowed.`);
                processed++;
                if (processed === files.length) {
                    setUploading(false);
                    onImagesChange(newImages);
                }
                return;
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                toast.error(`File ${file.name} is too large. Max ${maxSizeMB}MB allowed.`);
                processed++;
                if (processed === files.length) {
                    setUploading(false);
                    onImagesChange(newImages);
                }
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                newImages.push(base64);
                processed++;
                if (processed === files.length) {
                    setUploading(false);
                    onImagesChange(newImages);
                }
            };
            reader.onerror = () => {
                toast.error(`Failed to read ${file.name}`);
                processed++;
                if (processed === files.length) {
                    setUploading(false);
                    onImagesChange(newImages);
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset file input
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="property-image-upload"
                    disabled={uploading || images.length >= maxImages}
                />
                <label
                    htmlFor="property-image-upload"
                    className={`cursor-pointer flex flex-col items-center gap-2 ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                        {uploading ? 'Uploading...' : 'Click to upload images'}
                    </span>
                    <span className="text-xs text-gray-400">
                        Upload up to {maxImages} images • {maxSizeMB}MB each • JPG, JPEG, PNG only
                    </span>
                </label>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={img}
                                alt={`Property ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Counter */}
            <p className="text-sm text-gray-500">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                {images.length}/{maxImages} images uploaded
            </p>
        </div>
    );
};

export default ImageUpload;
