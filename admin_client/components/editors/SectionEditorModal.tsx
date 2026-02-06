"use client";

import { useState } from "react";
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

	const handlePropChange = (key: string, value: any) => {
		setEditedSection({
			...editedSection,
			props: {
				...editedSection.props,
				[key]: value,
			},
		});
	};

	const handleSave = () => {
		onSave(editedSection);
	};

	const renderPropEditor = (key: string, value: any) => {
		// Handle different types of values
		if (typeof value === "string") {
			return (
				<Input
					key={key}
					label={key.charAt(0).toUpperCase() + key.slice(1)}
					value={value}
					onChange={(e) => handlePropChange(key, e.target.value)}
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
						handlePropChange(key, parseFloat(e.target.value))
					}
				/>
			);
		}

		if (Array.isArray(value)) {
			return (
				<div key={key} className="space-y-2">
					<label className="block text-sm font-medium text-[var(--admin-text)]">
						{key.charAt(0).toUpperCase() + key.slice(1)}
					</label>
					<div className="p-3 bg-[var(--admin-bg-tertiary)] rounded-lg border border-[var(--admin-border)]">
						<p className="text-sm text-[var(--admin-text-muted)]">
							Array with {value.length} items (advanced editing
							coming soon)
						</p>
					</div>
				</div>
			);
		}

		if (typeof value === "object" && value !== null) {
			return (
				<div key={key} className="space-y-2">
					<label className="block text-sm font-medium text-[var(--admin-text)]">
						{key.charAt(0).toUpperCase() + key.slice(1)}
					</label>
					<div className="p-3 bg-[var(--admin-bg-tertiary)] rounded-lg border border-[var(--admin-border)]">
						<p className="text-sm text-[var(--admin-text-muted)]">
							Object (advanced editing coming soon)
						</p>
					</div>
				</div>
			);
		}

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
					{Object.entries(editedSection.props ?? {}).map(([key, value]) =>
						renderPropEditor(key, value),
					)}
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
