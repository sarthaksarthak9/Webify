"use client";

import { Input } from "@/components/ui/Input";

interface FooterLink {
    id?: string;
    label: string;
    href: string;
}

interface FooterColumn {
    id?: string;
    title: string;
    links: FooterLink[];
}

interface FooterSectionFormProps {
    data: {
        companyName: string;
        tagline?: string;
        copyright?: string;
        socialLinks?: {
            facebook?: string;
            twitter?: string;
            instagram?: string;
            linkedin?: string;
        };
    };
    onChange: (field: string, value: any) => void;
}

export function FooterSectionForm({ data, onChange }: FooterSectionFormProps) {
    const socialLinks = data.socialLinks || {};

    const updateSocialLink = (platform: string, value: string) => {
        onChange("socialLinks", {
            ...socialLinks,
            [platform]: value
        });
    };

    return (
        <div className="space-y-6">
            <Input
                label="Company Name"
                value={data.companyName || ""}
                onChange={(e) => onChange("companyName", e.target.value)}
                placeholder="MyCompany"
            />

            <Input
                label="Tagline (Optional)"
                value={data.tagline || ""}
                onChange={(e) => onChange("tagline", e.target.value)}
                placeholder="Building the future, one website at a time"
            />

            <Input
                label="Copyright Text (Optional)"
                value={data.copyright || ""}
                onChange={(e) => onChange("copyright", e.target.value)}
                placeholder="© 2024 MyCompany. All rights reserved."
            />

            <div className="pt-4 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-white mb-4">Social Media Links (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Facebook"
                        value={socialLinks.facebook || ""}
                        onChange={(e) => updateSocialLink("facebook", e.target.value)}
                        placeholder="https://facebook.com/yourpage"
                    />
                    <Input
                        label="Twitter"
                        value={socialLinks.twitter || ""}
                        onChange={(e) => updateSocialLink("twitter", e.target.value)}
                        placeholder="https://twitter.com/yourhandle"
                    />
                    <Input
                        label="Instagram"
                        value={socialLinks.instagram || ""}
                        onChange={(e) => updateSocialLink("instagram", e.target.value)}
                        placeholder="https://instagram.com/yourprofile"
                    />
                    <Input
                        label="LinkedIn"
                        value={socialLinks.linkedin || ""}
                        onChange={(e) => updateSocialLink("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/company/yourcompany"
                    />
                </div>
            </div>
        </div>
    );
}
