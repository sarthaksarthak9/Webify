"use client";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface GalleryImage {
    id?: string;
    url: string;
    alt: string;
    caption: string;
}

interface GallerySectionFormProps {
    data: {
        heading: string;
        subtitle: string;
        images: GalleryImage[];
        layout: string;
        columns: number;
    };
    onChange: (field: string, value: any) => void;
}

export function GallerySectionForm({ data, onChange }: GallerySectionFormProps) {
    const images = data.images || [];

    const addImage = () => {
        const newImages = [
            ...images,
            { id: `img_${Date.now()}`, url: "", alt: "", caption: "" }
        ];
        onChange("images", newImages);
    };

    const updateImage = (index: number, field: string, value: string) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], [field]: value };
        onChange("images", newImages);
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange("images", newImages);
    };

    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Gallery Section Content</h3>
            <div className="space-y-6">
                <Input
                    label="Gallery Heading"
                    value={data.heading || ""}
                    onChange={(e) => onChange("heading", e.target.value)}
                    placeholder="Our Work"
                />

                <Input
                    label="Subtitle (Optional)"
                    value={data.subtitle || ""}
                    onChange={(e) => onChange("subtitle", e.target.value)}
                    placeholder="Recent projects we're proud of"
                />

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-white">
                            Gallery Images ({images.length})
                        </label>
                        <Button variant="secondary" onClick={addImage}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Image
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {images.map((image, index) => (
                            <div key={image.id || index} className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-400">Image {index + 1}</span>
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <Input
                                        label="Image URL"
                                        value={image.url}
                                        onChange={(e) => updateImage(index, "url", e.target.value)}
                                        placeholder="/gallery/project-1.jpg"
                                    />
                                    <Input
                                        label="Alt Text"
                                        value={image.alt}
                                        onChange={(e) => updateImage(index, "alt", e.target.value)}
                                        placeholder="Modern office interior"
                                    />
                                    <Input
                                        label="Caption (Optional)"
                                        value={image.caption}
                                        onChange={(e) => updateImage(index, "caption", e.target.value)}
                                        placeholder="Corporate Office Design"
                                    />
                                </div>
                            </div>
                        ))}

                        {images.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
                                <p className="text-gray-400">No images added yet. Click "Add Image" above to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Layout</label>
                        <select
                            value={data.layout || "grid"}
                            onChange={(e) => onChange("layout", e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            <option value="grid">Grid</option>
                            <option value="masonry">Masonry</option>
                            <option value="carousel">Carousel</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Columns</label>
                        <select
                            value={data.columns || 3}
                            onChange={(e) => onChange("columns", parseInt(e.target.value))}
                            className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            <option value={2}>2 Columns</option>
                            <option value={3}>3 Columns</option>
                            <option value={4}>4 Columns</option>
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    );
}
