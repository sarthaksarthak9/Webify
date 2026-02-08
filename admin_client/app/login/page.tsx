"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/api";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { loginSuccess } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			// Call the login API using the service
			const data = await authService.login(email, password);

			// Store token and user info via context
			loginSuccess(data.token, data.user);

			// Redirect to dashboard
			router.push("/dashboard");
		} catch (err: any) {
			// Axios errors have response.data.message usually
			const errorMessage =
				err.response?.data?.message ||
				err.message ||
				"Invalid email or password";
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
			<div className="w-full max-w-[440px]">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-white/5 border border-white/10 mb-6">
						<svg
							className="w-7 h-7 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
							/>
						</svg>
					</div>
					<h1 className="text-2xl font-semibold text-white mb-2">
						Webify Admin
					</h1>
					<p className="text-sm text-[#888888]">
						Sign in to your dashboard
					</p>
				</div>

				{/* Login Card */}
				<div className="bg-[#121212] border-2 border-[#262626] rounded-lg p-10 shadow-2xl">
					<form onSubmit={handleSubmit} className="space-y-8">
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-white mb-2"
							>
								Email Address
							</label>
							<input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="off"
								className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#262626] rounded-md text-white placeholder-[#555555] focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all font-medium"
							/>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-white mb-2"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								autoComplete="off"
								className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#262626] rounded-md text-white placeholder-[#555555] focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all font-medium"
							/>
						</div>

						{/* Error Message */}
						{error && (
							<div className="flex items-start gap-3 p-4 rounded-md bg-red-500/10 border border-red-500/20">
								<svg
									className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="text-sm text-red-300">{error}</p>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full py-3 px-4 bg-white hover:bg-gray-100 active:bg-gray-200 text-black font-bold rounded-lg border-2 border-white shadow-lg hover:shadow-xl text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Signing in..." : "Sign In"}
						</button>
					</form>

					{/* Demo Credentials */}

				</div>

				{/* Footer */}
				<p className="text-center text-[#555555] text-xs mt-6">
					© 2026 Webify AI. All rights reserved.
				</p>
			</div>
		</div>
	);
}
