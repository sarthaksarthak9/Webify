"use client";

import { Input } from "@/components/ui/Input";

interface HeroSectionFormProps {
    data: {
        heading: string;
        subheading: string;
        ctaText: string;
        ctaLink: string;
        backgroundImage: string;
        alignment: string;
    };
    onChange: (field: string, value: any) => void;
}

export function HeroSectionForm({ data, onChange }: HeroSectionFormProps) {
    return (
        <div className="space-y-6">
            <Input
                label="Main Heading"
                value={data.heading || ""}
                onChange={(e) => onChange("heading", e.target.value)}
                placeholder="Welcome to our website"
            />
            <Input
                label="Subheading"
                value={data.subheading || ""}
                onChange={(e) => onChange("subheading", e.target.value)}
                placeholder="We help you build amazing things"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="CTA Button Text"
                    value={data.ctaText || ""}
                    onChange={(e) => onChange("ctaText", e.target.value)}
                    placeholder="Get Started"
                />
                <Input
                    label="CTA Button Link"
                    value={data.ctaLink || ""}
                    onChange={(e) => onChange("ctaLink", e.target.value)}
                    placeholder="#contact"
                />
            </div>
            <Input
                label="Background Image URL"
                value={data.backgroundImage || ""}
                onChange={(e) => onChange("backgroundImage", e.target.value)}
                placeholder="/images/hero-bg.jpg"
            />
            <div>
                <label className="block text-sm font-medium text-white mb-2">
                    Text Alignment
                </label>
                <select
                    value={data.alignment || "center"}
                    onChange={(e) => onChange("alignment", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>
            </div>
        </div>
    );
}
