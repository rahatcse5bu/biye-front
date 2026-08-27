import { useEffect } from "react";
import { useNavigate } from "@/lib/navigation";

const NotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate("/");
		}, 5000);

		return () => clearTimeout(timeout);
	}, [navigate]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h2 className="text-4xl font-bold mb-4 text-gray-800">
				404 - Page Not Found
			</h2>
			<p className="text-lg text-gray-600 mb-6">
				Sorry, the page you are looking for does not exist. You will be
				redirected to the home page shortly.
			</p>
		</div>
	);
};

export default NotFound;
