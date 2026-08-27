import { useEffect } from "react";
import { useNavigate, useSearchParams } from "@/lib/navigation";

const RefundFail = () => {
	const [searchParams] = useSearchParams();
	const message = searchParams.get("message");
	const navigate = useNavigate();
	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate("/admin/refund");
		}, 10000); // 10 seconds timeout
		return () => clearTimeout(timeout);
	}, [navigate]);

	return (
		<div className="sm:mx-auto mx-3 my-10 rounded-md border-green-500 p-10 flex flex-col items-center justify-center w-full sm:w-1/2 bg-green-300">
			<h1 className="text-3xl mb-4 text-red-900 text-center">Refund Fail</h1>
			{message && <p className="text-red-900 text-center mb-4">{message}</p>}
		</div>
	);
};

export default RefundFail;
