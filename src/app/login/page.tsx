"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


const LoginPage = () => {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: "",
	});
    const [loading ,setLoading]=React.useState(false)
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
			const response = await axios.post("/api/users/login", user);
			console.log(response.data);
			// Redirect user to another page after successful signup
			router.push("/profile");
		} catch (error:any) {
			console.error("Login failed", error.message);
			// Handle error (e.g., show error message to the user)
		} finally {
			setLoading(false);
		}
	};
	

	return (
		<div className="max-w-md mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">{loading?"Processing":"Login"}</h2>
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
						className="mt-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Login
				</button>
			</form>
			<p className="mt-4 text-sm text-gray-700">
				Dont have an account?{" "}
				<Link href="/signup" className="text-indigo-700">
					SigUp
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
