import React from "react";
import clsx from "clsx";

interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
	glass?: boolean;
}

export function Card({
	children,
	className,
	hover = false,
	glass = false,
}: CardProps) {
	return (
		<div
			className={clsx(
				"rounded-lg p-6 bg-[var(--admin-bg-secondary)] border-2 border-[var(--admin-border)]",
				hover &&
					"hover:border-white hover:bg-[var(--admin-bg-tertiary)] cursor-pointer hover:shadow-lg",
				"transition-all duration-300 shadow-md",
				className,
			)}
		>
			{children}
		</div>
	);
}
