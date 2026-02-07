"use client";

import { Button } from "@/components/ui/Button";

interface SectionType {
    type: string;
    label: string;
    description: string;
    icon: string;
}

const SECTION_TYPES: SectionType[] = [
    { type: 'navbar', label: 'Navigation Bar', description: 'Top navigation menu with logo and links', icon: '☰' },
    { type: 'hero', label: 'Hero Section', description: 'Large header section with title and CTA', icon: '🎯' },
    { type: 'features', label: 'Features', description: 'Showcase product or service features', icon: '⭐' },
    { type: 'gallery', label: 'Gallery', description: 'Image or content gallery', icon: '🖼️' },
    { type: 'about', label: 'About Section', description: 'About your company or product', icon: '📖' },
    { type: 'contact', label: 'Contact Form', description: 'Contact information and form', icon: '📧' },
    { type: 'testimonials', label: 'Testimonials', description: 'Customer reviews and feedback', icon: '💬' },
    { type: 'cta', label: 'Call to Action', description: 'Encourage users to take action', icon: '🎪' },
    { type: 'footer', label: 'Footer', description: 'Bottom page footer with links', icon: '⬇️' },
];

interface SectionTypeSelectorProps {
    existingSections: string[];
    onSelect: (type: string) => void;
    onClose: () => void;
}

export function SectionTypeSelector({
    existingSections,
    onSelect,
    onClose,
}: SectionTypeSelectorProps) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-[var(--admin-border)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-[var(--admin-text)]">
                                Add New Section
                            </h2>
                            <p className="text-sm text-[var(--admin-text-muted)] mt-1">
                                Choose a section type to add to your website
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[var(--admin-bg-tertiary)] rounded-lg transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-[var(--admin-text-muted)]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SECTION_TYPES.map((sectionType) => {
                            const alreadyExists = existingSections.includes(sectionType.type);

                            return (
                                <button
                                    key={sectionType.type}
                                    onClick={() => {
                                        onSelect(sectionType.type);
                                        onClose();
                                    }}
                                    className={`p-4 rounded-lg border-2 text-left transition-all ${alreadyExists
                                            ? 'border-[var(--admin-border)] bg-[var(--admin-bg-tertiary)]/50 opacity-60'
                                            : 'border-[var(--admin-border)] bg-[var(--admin-bg-tertiary)] hover:border-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-3xl">{sectionType.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-[var(--admin-text)]">
                                                    {sectionType.label}
                                                </h3>
                                                {alreadyExists && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">
                                                        Added
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-[var(--admin-text-muted)] mt-1">
                                                {sectionType.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--admin-border)] flex justify-end">
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
