import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProtectedRoute>
			<div className="flex min-h-screen bg-[var(--admin-bg-primary)]">
				<Sidebar />
				<main className="flex-1 flex flex-col w-full overflow-hidden">
					{children}
				</main>
			</div>
		</ProtectedRoute>
	);
}
