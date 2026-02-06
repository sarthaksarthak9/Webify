"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function SettingsPage() {
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	// Mock user data - replace with actual user data from context/API
	const [userData, setUserData] = useState({
		name: "Yash Mittal",
		email: "yash@gmail.com",
		company: "Webify Inc.",
		role: "Admin",
		bio: "Building amazing websites with AI",
		avatar: "",
	});

	const [editData, setEditData] = useState({ ...userData });

	const handleSave = async () => {
		setIsSaving(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setUserData(editData);
			setIsEditing(false);
			toast.success("Profile updated successfully!");
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setEditData({ ...userData });
		setIsEditing(false);
	};

	const handleLogout = () => {
		// Clear any auth tokens/session
		localStorage.removeItem("isAuthenticated");
		toast.success("Logged out successfully");
		router.push("/login");
	};

	return (
		<div className="flex flex-col min-h-full w-full">
			<Header
				title="Settings"
				subtitle="Manage your account and preferences"
			/>

			<div className="flex-1 overflow-y-auto w-full">
				<div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
					{/* Profile Section */}
					<div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
						<div className="px-4 sm:px-6 py-4 border-b border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
							<div>
								<h2 className="text-base font-semibold text-white">Profile Information</h2>
								<p className="text-sm text-gray-500 mt-1">
									Update your personal details and information
								</p>
							</div>
							{!isEditing && (
								<Button
									variant="secondary"
									onClick={() => setIsEditing(true)}
									className="w-full sm:w-auto"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
									</svg>
									Edit Profile
								</Button>
							)}
						</div>

						<div className="p-4 sm:p-6">
							{!isEditing ? (
								// View Mode
								<div className="space-y-6">
									{/* Avatar */}
									<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
										<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
											{userData.name.split(' ').map(n => n[0]).join('')}
										</div>
										<div className="text-center sm:text-left">
											<h3 className="text-lg sm:text-xl font-semibold text-white">{userData.name}</h3>
											<p className="text-gray-400 text-sm sm:text-base">{userData.email}</p>
											<p className="text-sm text-gray-500 mt-1">{userData.role} • {userData.company}</p>
										</div>
									</div>

									{/* Bio */}
									{userData.bio && (
										<div>
											<label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
											<p className="text-white">{userData.bio}</p>
										</div>
									)}

									{/* Details Grid */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
										<div>
											<label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
											<p className="text-white">{userData.name}</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
											<p className="text-white">{userData.email}</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
											<p className="text-white">{userData.company}</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
											<p className="text-white">{userData.role}</p>
										</div>
									</div>
								</div>
							) : (
								// Edit Mode
								<div className="space-y-6">
									<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-6 border-b border-gray-800">
										<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
											{editData.name.split(' ').map(n => n[0]).join('')}
										</div>
										<div className="flex-1 text-center sm:text-left w-full">
											<p className="text-sm text-gray-400 mb-2">Profile Picture</p>
											<Button variant="secondary" className="w-full sm:w-auto">
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
												</svg>
												Upload Image
											</Button>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<Input
											label="Full Name"
											value={editData.name}
											onChange={(e) => setEditData({ ...editData, name: e.target.value })}
											placeholder="John Doe"
										/>
										<Input
											label="Email Address"
											type="email"
											value={editData.email}
											onChange={(e) => setEditData({ ...editData, email: e.target.value })}
											placeholder="john@example.com"
										/>
										<Input
											label="Company"
											value={editData.company}
											onChange={(e) => setEditData({ ...editData, company: e.target.value })}
											placeholder="Acme Inc."
										/>
										<Input
											label="Role"
											value={editData.role}
											onChange={(e) => setEditData({ ...editData, role: e.target.value })}
											placeholder="Admin"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-white mb-2">Bio</label>
										<textarea
											value={editData.bio}
											onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
											placeholder="Tell us about yourself..."
											rows={3}
											className="w-full px-4 py-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
										/>
									</div>

									{/* Action Buttons */}
									<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-800">
										<Button
											variant="primary"
											onClick={handleSave}
											isLoading={isSaving}
											className="w-full sm:w-auto"
										>
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
											Save Changes
										</Button>
										<Button
											variant="secondary"
											onClick={handleCancel}
											disabled={isSaving}
											className="w-full sm:w-auto"
										>
											Cancel
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Account Actions */}
					<div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
						<div className="px-4 sm:px-6 py-4 border-b border-gray-800">
							<h2 className="text-base font-semibold text-white">Account</h2>
							<p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
						</div>
						<div className="p-4 sm:p-6 space-y-4">
							<button
								onClick={handleLogout}
								className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border-2 border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all w-full"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								<div className="text-left flex-1">
									<p className="font-semibold">Sign Out</p>
									<p className="text-xs text-gray-500">Sign out of your account</p>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
