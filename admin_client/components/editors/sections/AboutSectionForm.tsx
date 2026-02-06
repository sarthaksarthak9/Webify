"use client";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Stat {
    id?: string;
    label: string;
    value: string;
}

interface AboutSectionFormProps {
    data: {
        heading: string;
        text: string;
        image: string;
        imagePosition: string;
        stats: Stat[];
    };
    onChange: (field: string, value: any) => void;
}

export function AboutSectionForm({ data, onChange }: AboutSectionFormProps) {
    const stats = data.stats || [];

    const addStat = () => {
        const newStats = [
            ...stats,
            { id: `stat_${Date.now()}`, label: "", value: "" }
        ];
        onChange("stats", newStats);
    };

    const updateStat = (index: number, field: string, value: string) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        onChange("stats", newStats);
    };

    const removeStat = (index: number) => {
        const newStats = stats.filter((_, i) => i !== index);
        onChange("stats", newStats);
    };

    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">About Section Content</h3>
            <div className="space-y-6">
                <Input
                    label="Heading"
                    value={data.heading || ""}
                    onChange={(e) => onChange("heading", e.target.value)}
                    placeholder="About Us"
                />

                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Description
                    </label>
                    <textarea
                        value={data.text || ""}
                        onChange={(e) => onChange("text", e.target.value)}
                        placeholder="Tell your story..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                </div>

                <Input
                    label="Image URL"
                    value={data.image || ""}
                    onChange={(e) => onChange("image", e.target.value)}
                    placeholder="/images/about.jpg"
                />

                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Image Position
                    </label>
                    <select
                        value={data.imagePosition || "right"}
                        onChange={(e) => onChange("imagePosition", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-white">
                            Statistics ({stats.length})
                        </label>
                        <Button variant="secondary" onClick={addStat}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Stat
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {stats.map((stat, index) => (
                            <div key={stat.id || index} className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-400">Stat {index + 1}</span>
                                    <button
                                        onClick={() => removeStat(index)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        label="Label"
                                        value={stat.label}
                                        onChange={(e) => updateStat(index, "label", e.target.value)}
                                        placeholder="Years Experience"
                                    />
                                    <Input
                                        label="Value"
                                        value={stat.value}
                                        onChange={(e) => updateStat(index, "value", e.target.value)}
                                        placeholder="10+"
                                    />
                                </div>
                            </div>
                        ))}

                        {stats.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
                                <p className="text-gray-400">No statistics added yet. Click "Add Stat" above to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
