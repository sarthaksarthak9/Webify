"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Section } from "@/types/website";

interface SectionEditorModalProps {
	section: Section;
	onSave: (section: Section) => void;
	onClose: () => void;
}

export function SectionEditorModal({
	section,
	onSave,
	onClose,
}: SectionEditorModalProps) {
	const [editedSection, setEditedSection] = useState<Section>(section);

	// Reset the edited section when the section prop changes
	// This ensures that if you cancel and reopen, you get a fresh copy
	useEffect(() => {
		setEditedSection(section);
	}, [section]);

	const handleContentChange = (key: string, value: any) => {
		setEditedSection({
			...editedSection,
			content: {
				...editedSection.content,
				[key]: value,
			},
		});
	};

	const handleSave = () => {
		onSave(editedSection);
	};

	const renderContentEditor = (key: string, value: any) => {
		// Only render editable types (strings and numbers)
		if (typeof value === "string") {
			return (
				<Input
					key={key}
					label={key.charAt(0).toUpperCase() + key.slice(1)}
					value={value}
					onChange={(e) => handleContentChange(key, e.target.value)}
				/>
			);
		}

		if (typeof value === "number") {
			return (
				<Input
					key={key}
					type="number"
					label={key.charAt(0).toUpperCase() + key.slice(1)}
					value={value}
					onChange={(e) =>
						handleContentChange(key, parseFloat(e.target.value))
					}
				/>
			);
		}

		// Don't render arrays, objects, or other complex types
		return null;
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
				{/* Header */}
				<div className="p-8 border-b border-[var(--admin-border)]">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-bold text-[var(--admin-text)]">
								Edit {section.type} Section
							</h2>
							<p className="text-sm text-[var(--admin-text-muted)] mt-1">
								Customize the properties of this section
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
				<div className="flex-1 overflow-y-auto p-8 space-y-6">
					{(() => {
						const editableFields = Object.entries(editedSection.content ?? {}).filter(
							([key, value]) => typeof value === 'string' || typeof value === 'number'
						);

						if (editableFields.length === 0) {
							return (
								<div className="text-center py-12">
									<p className="text-[var(--admin-text-muted)]">
										No simple text fields available for editing.
									</p>
									<p className="text-xs text-[var(--admin-text-muted)] mt-2">
										This section contains complex data that requires advanced editing.
									</p>
								</div>
							);
						}

						return editableFields.map(([key, value]) => renderContentEditor(key, value));
					})()}
				</div>

				{/* Footer */}
				<div className="p-8 border-t border-[var(--admin-border)] flex justify-end gap-4">
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Save Changes
					</Button>
				</div>
			</div>
		</div>
	);
}
