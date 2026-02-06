"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/Button";
import { Section } from "@/types/website";

interface SortableSectionProps {
	id: string;
	section: Section;
	index: number;
	onEdit: () => void;
	onDelete: () => void;
}

export function SortableSection({
	id,
	section,
	index,
	onEdit,
	onDelete,
}: SortableSectionProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	// Get a preview of the section content
	const getPreview = () => {
		const content = section.content;

		// Handle undefined or null content
		if (!content || typeof content !== 'object') {
			return section.title || 'No content';
		}

		const keys = Object.keys(content).slice(0, 3);
		if (keys.length === 0) {
			return section.title || 'Empty section';
		}

		return keys
			.map((key) => {
				const value = content[key];
				if (typeof value === "string") {
					return `${key}: ${value.substring(0, 30)}${value.length > 30 ? "..." : ""}`;
				}
				if (Array.isArray(value)) {
					return `${key}: ${value.length} items`;
				}
				return `${key}: ${typeof value}`;
			})
			.join(" • ");
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center gap-4 p-4 md:p-5 bg-[var(--admin-bg-tertiary)] border border-[var(--admin-border)] rounded-lg hover:border-[var(--admin-accent)] transition-all group"
		>
			{/* Drag Handle */}
			<button
				{...attributes}
				{...listeners}
				className="cursor-grab active:cursor-grabbing p-2 hover:bg-[var(--admin-bg-secondary)] rounded transition-colors"
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
						d="M4 8h16M4 16h16"
					/>
				</svg>
			</button>

			{/* Section Info */}
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">
						{section.type}
					</span>
					<span className="text-xs text-[var(--admin-text-muted)]">
						Section {index + 1}
					</span>
				</div>
				<p className="text-sm text-[var(--admin-text-muted)] truncate">
					{getPreview()}
				</p>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
				<Button variant="ghost" onClick={onEdit} className="h-9 px-3">
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
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				</Button>
				<Button
					variant="danger"
					onClick={onDelete}
					className="h-9 px-3"
				>
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
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</Button>
			</div>
		</div>
	);
}
