import { useEffect } from "react";
import { useNavigate, useSearchParams } from "@/lib/navigation";

const RefundSuccess = () => {
	const [searchParams] = useSearchParams();
	const message = searchParams.get("message");
	const navigate = useNavigate();
	const refundTrxID = searchParams.get("refundTrxID");
	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate("/admin/refund");
		}, 10000); // 10 seconds timeout
		return () => clearTimeout(timeout);
	}, [navigate]);

	return (
		<div className="sm:mx-auto mx-3 my-10 rounded-md border-green-500 p-10 flex flex-col items-center justify-center w-full sm:w-1/2 bg-green-300">
			<h1 className="text-3xl mb-4 text-green-900 text-center">
				Refund Success
			</h1>
			{refundTrxID && (
				<p className="text-center mb-4 text-green-900">
					Your refund transaction ID: {refundTrxID}
				</p>
			)}
			{message && <p className="text-center text-green-900">{message}</p>}
		</div>
	);
};

export default RefundSuccess;
