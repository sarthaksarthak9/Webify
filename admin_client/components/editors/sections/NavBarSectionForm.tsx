"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface NavLink {
    id?: string;
    label: string;
    href: string;
}

interface NavBarSectionFormProps {
    data: {
        logoText: string;
        links: NavLink[];
        demoButtonText?: string;
    };
    onChange: (field: string, value: any) => void;
}

export function NavBarSectionForm({ data, onChange }: NavBarSectionFormProps) {
    const links = data.links || [];

    const addLink = () => {
        const newLinks = [
            ...links,
            { id: `link_${Date.now()}`, label: "", href: "" }
        ];
        onChange("links", newLinks);
    };

    const updateLink = (index: number, field: string, value: string) => {
        const newLinks = [...links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        onChange("links", newLinks);
    };

    const removeLink = (index: number) => {
        const newLinks = links.filter((_, i) => i !== index);
        onChange("links", newLinks);
    };

    return (
        <div className="space-y-6">
            <Input
                label="Logo Text"
                value={data.logoText || ""}
                onChange={(e) => onChange("logoText", e.target.value)}
                placeholder="MyBrand"
            />

            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-white">
                        Navigation Links ({links.length})
                    </label>
                    <Button variant="secondary" onClick={addLink}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Link
                    </Button>
                </div>

                <div className="space-y-4">
                    {links.map((link, index) => (
                        <div key={link.id || index} className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900/50">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-400">Link {index + 1}</span>
                                <button
                                    onClick={() => removeLink(index)}
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
                                    value={link.label}
                                    onChange={(e) => updateLink(index, "label", e.target.value)}
                                    placeholder="Home"
                                />
                                <Input
                                    label="Link"
                                    value={link.href}
                                    onChange={(e) => updateLink(index, "href", e.target.value)}
                                    placeholder="#home"
                                />
                            </div>
                        </div>
                    ))}

                    {links.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
                            <p className="text-gray-400">No navigation links added yet. Click "Add Link" above to get started.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-white mb-4">Demo Button (Optional)</h4>
                <Input
                    label="Button Text"
                    value={data.demoButtonText || ""}
                    onChange={(e) => onChange("demoButtonText", e.target.value)}
                    placeholder="Ask for a demo"
                />
            </div>
        </div>
    );
}
