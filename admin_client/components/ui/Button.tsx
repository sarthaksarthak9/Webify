import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger" | "ghost";
	isLoading?: boolean;
	children: React.ReactNode;
}

export function Button({
	variant = "primary",
	isLoading = false,
	children,
	className,
	disabled,
	...props
}: ButtonProps) {
	const baseStyles =
		"px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm h-10 whitespace-nowrap shadow-sm hover:shadow-md";

	const variants = {
		primary: "bg-white hover:bg-gray-100 text-black font-bold",
		secondary:
			"bg-[var(--admin-bg-tertiary)] hover:bg-[var(--admin-bg-hover)] text-white border border-[var(--admin-border)] hover:border-white",
		danger: "bg-red-600 hover:bg-red-700 text-white border border-red-500 font-semibold",
		ghost: "bg-transparent hover:bg-[var(--admin-bg-secondary)] text-white border border-[var(--admin-border)] hover:border-white",
	};

	return (
		<button
			className={clsx(baseStyles, variants[variant], className)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading && (
				<svg
					className="animate-spin h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}
			{children}
		</button>
	);
}
