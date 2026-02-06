"use client";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Feature {
    id?: string;
    icon: string;
    title: string;
    description: string;
}

interface FeaturesSectionFormProps {
    data: {
        title: string;
        subtitle: string;
        features: Feature[];
        layout: string;
        columns: number;
    };
    onChange: (field: string, value: any) => void;
}

const iconOptions = ["rocket", "shield", "chart", "star", "heart", "lightning"];

export function FeaturesSectionForm({ data, onChange }: FeaturesSectionFormProps) {
    const features = data.features || [];

    const addFeature = () => {
        const newFeatures = [
            ...features,
            { id: `feat_${Date.now()}`, icon: "rocket", title: "", description: "" }
        ];
        onChange("features", newFeatures);
    };

    const updateFeature = (index: number, field: string, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        onChange("features", newFeatures);
    };

    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        onChange("features", newFeatures);
    };

    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Features Section Content</h3>
            <div className="space-y-6">
                <Input
                    label="Section Title"
                    value={data.title || ""}
                    onChange={(e) => onChange("title", e.target.value)}
                    placeholder="Our Features"
                />

                <Input
                    label="Subtitle (Optional)"
                    value={data.subtitle || ""}
                    onChange={(e) => onChange("subtitle", e.target.value)}
                    placeholder="What makes us different"
                />

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-white">
                            Features ({features.length})
                        </label>
                        <Button variant="secondary" onClick={addFeature}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Feature
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div key={feature.id || index} className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-400">Feature {index + 1}</span>
                                    <button
                                        onClick={() => removeFeature(index)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Icon</label>
                                        <select
                                            value={feature.icon}
                                            onChange={(e) => updateFeature(index, "icon", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            {iconOptions.map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input
                                        label="Feature Title"
                                        value={feature.title}
                                        onChange={(e) => updateFeature(index, "title", e.target.value)}
                                        placeholder="Fast Performance"
                                    />
                                    <Input
                                        label="Description"
                                        value={feature.description}
                                        onChange={(e) => updateFeature(index, "description", e.target.value)}
                                        placeholder="Lightning fast load times"
                                    />
                                </div>
                            </div>
                        ))}

                        {features.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
                                <p className="text-gray-400">No features added yet. Click "Add Feature" above to get started.</p>
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
                            <option value="list">List</option>
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
