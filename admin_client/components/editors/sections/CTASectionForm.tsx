"use client";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

interface CTASectionFormProps {
    data: {
        heading: string;
        text: string;
        primaryButton: {
            text: string;
            link: string;
        };
        secondaryButton?: {
            text: string;
            link: string;
        };
    };
    onChange: (field: string, value: any) => void;
}

export function CTASectionForm({ data, onChange }: CTASectionFormProps) {
    const primaryButton = data.primaryButton || { text: "", link: "" };
    const secondaryButton = data.secondaryButton || { text: "", link: "" };
    const hasSecondaryButton = data.secondaryButton !== undefined && data.secondaryButton !== null;

    const updatePrimaryButton = (field: string, value: string) => {
        onChange("primaryButton", {
            ...primaryButton,
            [field]: value
        });
    };

    const updateSecondaryButton = (field: string, value: string) => {
        onChange("secondaryButton", {
            ...secondaryButton,
            [field]: value
        });
    };

    const toggleSecondaryButton = () => {
        if (hasSecondaryButton) {
            onChange("secondaryButton", undefined);
        } else {
            onChange("secondaryButton", { text: "", link: "" });
        }
    };

    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Call to Action Section Content</h3>
            <div className="space-y-6">
                <Input
                    label="Heading"
                    value={data.heading || ""}
                    onChange={(e) => onChange("heading", e.target.value)}
                    placeholder="Ready to Get Started?"
                />

                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        value={data.text || ""}
                        onChange={(e) => onChange("text", e.target.value)}
                        placeholder="Join hundreds of satisfied customers today"
                        rows={2}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                </div>

                {/* Primary Button */}
                <div className="p-4 border-2 border-blue-500/30 rounded-lg bg-blue-500/5">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3">Primary Button</h4>
                    <div className="space-y-3">
                        <Input
                            label="Button Text"
                            value={primaryButton.text}
                            onChange={(e) => updatePrimaryButton("text", e.target.value)}
                            placeholder="Start Free Trial"
                        />
                        <Input
                            label="Button Link"
                            value={primaryButton.link}
                            onChange={(e) => updatePrimaryButton("link", e.target.value)}
                            placeholder="#contact"
                        />
                    </div>
                </div>

                {/* Secondary Button */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-white">
                            Secondary Button (Optional)
                        </label>
                        <button
                            onClick={toggleSecondaryButton}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${hasSecondaryButton
                                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                    : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                }`}
                        >
                            {hasSecondaryButton ? "Remove" : "Add"}
                        </button>
                    </div>

                    {hasSecondaryButton && (
                        <div className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900/50">
                            <div className="space-y-3">
                                <Input
                                    label="Button Text"
                                    value={secondaryButton.text}
                                    onChange={(e) => updateSecondaryButton("text", e.target.value)}
                                    placeholder="Learn More"
                                />
                                <Input
                                    label="Button Link"
                                    value={secondaryButton.link}
                                    onChange={(e) => updateSecondaryButton("link", e.target.value)}
                                    placeholder="#about"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
