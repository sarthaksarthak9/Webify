"use client";

import { useParams, useRouter } from "next/navigation";
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
import { toast } from "sonner";

interface SectionsListProps {
	sections: Section[];
	onUpdate: (sections: Section[]) => void;
}

export function SectionsList({ sections, onUpdate }: SectionsListProps) {
	const params = useParams();
	const router = useRouter();
	const slug = params?.slug as string;

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
			onUpdate(arrayMove(sections, oldIndex, newIndex));
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

	const handleEdit = (section: Section) => {
		router.push(`/dashboard/websites/${slug}/sections/${section.id}`);
	};

	const handleAddSection = () => {
		router.push(`/dashboard/websites/${slug}/sections/new`);
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
										onEdit={() => handleEdit(section)}
										onDelete={() => handleDelete(index)}
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>
				)}
			</Card>
		</div>
	);
}
