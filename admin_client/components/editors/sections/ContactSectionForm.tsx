"use client";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

interface ContactSectionFormProps {
    data: {
        heading: string;
        subtitle: string;
        email: string;
        phone: string;
        address: string;
        submitText: string;
    };
    onChange: (field: string, value: any) => void;
}

export function ContactSectionForm({ data, onChange }: ContactSectionFormProps) {
    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Contact Section Content</h3>
            <div className="space-y-4">
                <Input
                    label="Heading"
                    value={data.heading || ""}
                    onChange={(e) => onChange("heading", e.target.value)}
                    placeholder="Get In Touch"
                />

                <Input
                    label="Subtitle (Optional)"
                    value={data.subtitle || ""}
                    onChange={(e) => onChange("subtitle", e.target.value)}
                    placeholder="We'd love to hear from you"
                />

                <Input
                    label="Email Address"
                    type="email"
                    value={data.email || ""}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="contact@example.com"
                />

                <Input
                    label="Phone Number"
                    value={data.phone || ""}
                    onChange={(e) => onChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                />

                <Input
                    label="Address"
                    value={data.address || ""}
                    onChange={(e) => onChange("address", e.target.value)}
                    placeholder="123 Main Street, City, State 12345"
                />

                <Input
                    label="Submit Button Text"
                    value={data.submitText || "Send Message"}
                    onChange={(e) => onChange("submitText", e.target.value)}
                    placeholder="Send Message"
                />
            </div>
        </Card>
    );
}
