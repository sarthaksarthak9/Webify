"use client";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface FooterLink {
    id?: string;
    label: string;
    url: string;
}

interface SocialLink {
    id?: string;
    platform: string;
    url: string;
}

interface FooterSectionFormProps {
    data: {
        logo: string;
        description?: string;
        copyright: string;
        links: FooterLink[];
        social: SocialLink[];
    };
    onChange: (field: string, value: any) => void;
}

const platformOptions = ["instagram", "facebook", "twitter", "linkedin", "youtube", "github"];

export function FooterSectionForm({ data, onChange }: FooterSectionFormProps) {
    const links = data.links || [];
    const social = data.social || [];

    // Links management
    const addLink = () => {
        const newLinks = [
            ...links,
            { id: `link_${Date.now()}`, label: "", url: "" }
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

    // Social links management
    const addSocial = () => {
        const newSocial = [
            ...social,
            { id: `social_${Date.now()}`, platform: "instagram", url: "" }
        ];
        onChange("social", newSocial);
    };

    const updateSocial = (index: number, field: string, value: string) => {
        const newSocial = [...social];
        newSocial[index] = { ...newSocial[index], [field]: value };
        onChange("social", newSocial);
    };

    const removeSocial = (index: number) => {
        const newSocial = social.filter((_, i) => i !== index);
        onChange("social", newSocial);
    };

    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Footer Section Content</h3>
            <div className="space-y-6">
                <Input
                    label="Logo Text"
                    value={data.logo || ""}
                    onChange={(e) => onChange("logo", e.target.value)}
                    placeholder="MyCompany"
                />

                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        value={data.description || ""}
                        onChange={(e) => onChange("description", e.target.value)}
                        placeholder="Building the future, one website at a time"
                        rows={2}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                </div>

                <Input
                    label="Copyright Text"
                    value={data.copyright || ""}
                    onChange={(e) => onChange("copyright", e.target.value)}
                    placeholder="© 2026 MyCompany. All rights reserved."
                />

                {/* Navigation Links Section */}
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
                                        placeholder="About"
                                    />
                                    <Input
                                        label="URL"
                                        value={link.url}
                                        onChange={(e) => updateLink(index, "url", e.target.value)}
                                        placeholder="#about"
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

                {/* Social Links Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-white">
                            Social Media Links ({social.length})
                        </label>
                        <Button variant="secondary" onClick={addSocial}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Social
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {social.map((socialLink, index) => (
                            <div key={socialLink.id || index} className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-400">Social {index + 1}</span>
                                    <button
                                        onClick={() => removeSocial(index)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Platform</label>
                                        <select
                                            value={socialLink.platform}
                                            onChange={(e) => updateSocial(index, "platform", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all capitalize"
                                        >
                                            {platformOptions.map(platform => (
                                                <option key={platform} value={platform} className="capitalize">
                                                    {platform}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input
                                        label="URL"
                                        value={socialLink.url}
                                        onChange={(e) => updateSocial(index, "url", e.target.value)}
                                        placeholder="https://instagram.com/yourprofile"
                                    />
                                </div>
                            </div>
                        ))}

                        {social.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
                                <p className="text-gray-400">No social media links added yet. Click "Add Social" above to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
