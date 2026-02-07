"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section } from "@/types/website";
import { SortableSection } from "./SortableSection";
import { SectionEditorModal } from "./SectionEditorModal";
import { SectionTypeSelector } from "./SectionTypeSelector";
import { toast } from "sonner";

interface SectionsListProps {
	sections: Section[];
	onUpdate: (sections: Section[]) => void;
}

export function SectionsList({ sections, onUpdate }: SectionsListProps) {
	const params = useParams();
	const [editingSection, setEditingSection] = useState<Section | null>(null);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [showTypeSelector, setShowTypeSelector] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = sections.findIndex(
				(_, i) => i.toString() === active.id,
			);
			const newIndex = sections.findIndex(
				(_, i) => i.toString() === over.id,
			);

			// Reorder the sections array
			const reorderedSections = arrayMove(sections, oldIndex, newIndex);

			// Update the order field for each section to match its new array position
			const sectionsWithUpdatedOrder = reorderedSections.map((section, index) => ({
				...section,
				order: index,
			}));

			onUpdate(sectionsWithUpdatedOrder);
			toast.success("Section moved successfully");
		}
	};

	const handleDelete = (index: number) => {
		if (confirm("Are you sure you want to delete this section?")) {
			const newSections = sections.filter((_, i) => i !== index);
			onUpdate(newSections);
			toast.success("Section deleted successfully");
		}
	};

	const handleEdit = (section: Section, index: number) => {
		setEditingSection(section);
		setEditingIndex(index);
		setIsAddingNew(false);
	};

	const handleAddSection = () => {
		// Show the section type selector instead of creating a default section
		setShowTypeSelector(true);
	};

	const handleSectionTypeSelected = (type: string) => {
		// Create a new section with the selected type
		const newSection: Section = {
			id: `section_${Date.now()}`,
			type: type,
			title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
			content: getDefaultContentForType(type),
			order: sections.length,
		};
		setEditingSection(newSection);
		setEditingIndex(null);
		setIsAddingNew(true);
	};

	const getDefaultContentForType = (type: string): Record<string, any> => {
		// Provide sensible defaults based on section type
		switch (type) {
			case 'hero':
				return { heading: 'Welcome', subheading: 'Discover something amazing' };
			case 'navbar':
				return { logo: 'Logo', links: [] };
			case 'features':
				return { heading: 'Features', items: [] };
			case 'gallery':
				return { heading: 'Gallery', images: [] };
			case 'about':
				return { heading: 'About Us', description: '' };
			case 'contact':
				return { heading: 'Contact Us', email: '', phone: '' };
			case 'testimonials':
				return { heading: 'Testimonials', items: [] };
			case 'cta':
				return { heading: 'Get Started', buttonText: 'Sign Up' };
			case 'footer':
				return { copyright: '© 2024', links: [] };
			default:
				return {};
		}
	};

	const handleSaveSection = (updatedSection: Section) => {
		if (isAddingNew) {
			// Add new section
			onUpdate([...sections, updatedSection]);
			toast.success("Section added successfully");
		} else if (editingIndex !== null) {
			// Update existing section
			const newSections = [...sections];
			newSections[editingIndex] = updatedSection;
			onUpdate(newSections);
			toast.success("Section updated successfully");
		}
		setEditingSection(null);
		setEditingIndex(null);
		setIsAddingNew(false);
	};

	const handleCloseModal = () => {
		setEditingSection(null);
		setEditingIndex(null);
		setIsAddingNew(false);
	};

	return (
		<div className="space-y-8">
			<Card>
				<div className="flex items-center justify-between mb-4">
					<div>
						<h3 className="text-lg font-semibold text-white">
							Sections
						</h3>
						<p className="text-sm text-gray-400">
							Drag and drop to reorder sections
						</p>
					</div>
					<Button variant="primary" onClick={handleAddSection}>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Add Section
					</Button>
				</div>

				{sections.length === 0 ? (
					<div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
						<svg
							className="w-12 h-12 mx-auto text-gray-500 mb-3"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
							/>
						</svg>
						<p className="text-gray-400">No sections yet</p>
					</div>
				) : (
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={sections.map((_, i) => i.toString())}
							strategy={verticalListSortingStrategy}
						>
							<div className="space-y-3">
								{sections.map((section, index) => (
									<SortableSection
										key={index}
										id={index.toString()}
										section={section}
										index={index}
										onEdit={() => handleEdit(section, index)}
										onDelete={() => handleDelete(index)}
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>
				)}
			</Card>

			{/* Section Editor Modal */}
			{editingSection && (
				<SectionEditorModal
					section={editingSection}
					onSave={handleSaveSection}
					onClose={handleCloseModal}
				/>
			)}

			{/* Section Type Selector Modal */}
			{showTypeSelector && (
				<SectionTypeSelector
					existingSections={sections.map(s => s.type)}
					onSelect={handleSectionTypeSelected}
					onClose={() => setShowTypeSelector(false)}
				/>
			)}
		</div>
	);
}
