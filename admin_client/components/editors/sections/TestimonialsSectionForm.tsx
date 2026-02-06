"use client";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Testimonial {
    id?: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    text: string;
}

interface TestimonialsSectionFormProps {
    data: {
        title: string;
        testimonials: Testimonial[];
        layout: string;
    };
    onChange: (field: string, value: any) => void;
}

export function TestimonialsSectionForm({ data, onChange }: TestimonialsSectionFormProps) {
    const testimonials = data.testimonials || [];

    const addTestimonial = () => {
        const newTestimonials = [
            ...testimonials,
            { id: `test_${Date.now()}`, name: "", role: "", avatar: "", rating: 5, text: "" }
        ];
        onChange("testimonials", newTestimonials);
    };

    const updateTestimonial = (index: number, field: string, value: string | number) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index] = { ...newTestimonials[index], [field]: value };
        onChange("testimonials", newTestimonials);
    };

    const removeTestimonial = (index: number) => {
        const newTestimonials = testimonials.filter((_, i) => i !== index);
        onChange("testimonials", newTestimonials);
    };

    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Testimonials Section Content</h3>
            <div className="space-y-6">
                <Input
                    label="Section Title"
                    value={data.title || ""}
                    onChange={(e) => onChange("title", e.target.value)}
                    placeholder="What Our Clients Say"
                />

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-white">
                            Testimonials ({testimonials.length})
                        </label>
                        <Button variant="secondary" onClick={addTestimonial}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Testimonial
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {testimonials.map((testimonial, index) => (
                            <div key={testimonial.id || index} className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-400">Testimonial {index + 1}</span>
                                    <button
                                        onClick={() => removeTestimonial(index)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input
                                            label="Client Name"
                                            value={testimonial.name}
                                            onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                                            placeholder="John Doe"
                                        />
                                        <Input
                                            label="Role/Company"
                                            value={testimonial.role}
                                            onChange={(e) => updateTestimonial(index, "role", e.target.value)}
                                            placeholder="CEO, TechCorp"
                                        />
                                    </div>
                                    <Input
                                        label="Avatar URL (Optional)"
                                        value={testimonial.avatar}
                                        onChange={(e) => updateTestimonial(index, "avatar", e.target.value)}
                                        placeholder="/avatars/john.jpg"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Rating (1-5)</label>
                                        <select
                                            value={testimonial.rating}
                                            onChange={(e) => updateTestimonial(index, "rating", parseInt(e.target.value))}
                                            className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option value={1}>⭐ 1 Star</option>
                                            <option value={2}>⭐⭐ 2 Stars</option>
                                            <option value={3}>⭐⭐⭐ 3 Stars</option>
                                            <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                                            <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Testimonial Text
                                        </label>
                                        <textarea
                                            value={testimonial.text}
                                            onChange={(e) => updateTestimonial(index, "text", e.target.value)}
                                            placeholder="Amazing service! Highly recommended."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {testimonials.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
                                <p className="text-gray-400">No testimonials added yet. Click "Add Testimonial" above to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-2">Layout</label>
                    <select
                        value={data.layout || "carousel"}
                        onChange={(e) => onChange("layout", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        <option value="grid">Grid</option>
                        <option value="carousel">Carousel</option>
                    </select>
                </div>
            </div>
        </Card>
    );
}
