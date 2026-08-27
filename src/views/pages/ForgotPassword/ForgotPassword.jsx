import { useState } from "react";
import { Colors } from "../../../constants/colors";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../../firebase/app";

function ForgotPasswordForm() {
	const [email, setEmail] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleResetPassword = () => {
		//! Implement the logic to send a password reset email using the 'email' state.

		if (!email) {
			toast.success("Enter your email", {
				duration: 5000,
				position: "bottom-right",
				style: { backgroundColor: "red", color: "#fff" },
			});
			return;
		}

		sendPasswordResetEmail(auth, email)
			.then(() => {
				// Password reset email sent!
				toast.success("Password reset email sent!", {
					duration: 5000,
					position: "bottom-right",
					style: { backgroundColor: "green", color: "#fff" },
				});
				setEmail("");
				// ..
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log("🚀 ~ file: Login.jsx:131 ~ Login ~ errorCode:", errorCode);
				const errorMessage = error.message;
				toast.error(errorMessage, {
					duration: 5000,
					position: "bottom-right",
					style: { backgroundColor: "red", color: "#fff" },
				});
			});
	};

	return (
		<div className="bg-white w-[400px] mx-auto my-10 p-6 rounded-lg shadow-md">
			<p className="text-gray-900 mb-4">
				Enter your email address to reset your password:
			</p>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={handleEmailChange}
				className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
			/>
			<button
				style={{
					background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
				}}
				onClick={handleResetPassword}
				className="w-full mt-4 px-4 py-2  text-white rounded-md  focus:outline-none focus:ring focus:ring-blue-400"
			>
				Reset Password
			</button>
		</div>
	);
}

export default ForgotPasswordForm;
