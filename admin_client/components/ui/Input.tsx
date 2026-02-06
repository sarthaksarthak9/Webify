import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-semibold text-[var(--admin-text)] mb-3">
					{label}
				</label>
			)}
			<input
				className={clsx(
					"w-full px-4 py-3 rounded-lg font-medium",
					"bg-[var(--admin-bg-secondary)] border-2 border-[var(--admin-border)]",
					"text-[var(--admin-text)] placeholder-[var(--admin-text-muted)]",
					"focus:outline-none focus:ring-2 focus:ring-white focus:border-white",
					"transition-all duration-200",
					error &&
						"border-2 border-[var(--admin-error)] focus:ring-[var(--admin-error)] focus:border-[var(--admin-error)]",
					className,
				)}
				{...props}
			/>
			{error && (
				<p className="mt-1.5 text-sm text-[var(--admin-error)]">
					{error}
				</p>
			)}
		</div>
	);
}
