"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const SignUpPage = () => {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: "",
		username: "",
	});
	const [btnEnabled, setBtnEnabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setBtnEnabled(false);
		} else {
			setBtnEnabled(true);
		}
	}, [user]);
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			// Example: Posting user data to a backend endpoint using Axios
			const response = await axios.post("/api/users/signUp", user);
			console.log(response.data);
			// Redirect user to another page after successful signup
			router.push("/login");
		} catch (error: any) {
			console.error("Signup failed", error.message);
			// Handle error (e.g., show error message to the user)
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">
				{loading ? "Processing" : "SignUp"}
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={user.email}
						onChange={handleChange}
						required
						className="mt-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						required
						className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-gray-300 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={user.username}
						onChange={handleChange}
						required
						className="mt-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{btnEnabled ? "No Signup" : "Signup"}
				</button>
				<p className="mt-4 text-sm text-gray-700">
					Already have an account?{" "}
					<Link href="/login" className="text-indigo-700">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUpPage;
