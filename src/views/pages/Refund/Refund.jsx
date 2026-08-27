import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@/lib/navigation";
import { BkashRefundPaymentAPICall } from "../../../services/bkash";
import { useState } from "react";
import { refundServices } from "../../../services/refunds";
import { getToken } from "../../../utils/cookies";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle";
import { Toast } from "../../../utils/toast";

const Refund = () => {
	const [loading, setLoading] = useState(false);
	const [loadingPaymentId, setLoadingPaymentId] = useState("");
	const navigate = useNavigate();
	// const { paymentId } = useParams();
	// const { tnxId } = useParams();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["refund", "history"],
		queryFn: async () => {
			return await refundServices.getRefundRequest(getToken().token);
		},
	});

	const refundHandler = async (item) => {
		const amount = item?.refund_amount;
		const paymentId = item?.payment_id;
		const trnxId = item?.transaction_id;
		const user_id = item?.user_id;

		if (paymentId.trim() === "" || trnxId.trim() === "") {
			alert("All fields are required.");
		} else if (isNaN(amount) || +amount <= 0) {
			alert("Please enter a valid amount.");
		} else {
			try {
				setLoading(true);
				setLoadingPaymentId(paymentId);

				const response = await BkashRefundPaymentAPICall(
					paymentId,
					trnxId,
					amount
				);

				console.log(response);
				if (response?.refundTrxID) {
					//? window.location.href = `/pay/success?message=${response?.transactionStatus}&trxID=${response?.originalTrxID}&refundTrxID=${response?.refundTrxID}`;

					const savedResponse = await refundServices.updateRefundRequest(
						{
							payment_id: paymentId,
							refund_transaction_id: response?.refundTrxID,
							refund_status: "refunded",
							amount: amount,
							user_id: user_id,
						},
						getToken().token
					);

					if (savedResponse.success) {
						console.log(savedResponse);
					}
					await refetch();
					Toast.successToast("Refunded successfully");
					setLoading(false);
					setLoadingPaymentId("");
					// navigate(
					// 	`/refund/success?message=${response?.transactionStatus}&trxID=${response?.originalTrxID}&refundTrxID=${response?.refundTrxID}`
					// );
				} else {
					//? window.location.href = `/pay/fail?message=${response?.statusMessage}`;
					setLoading(false);
					setLoadingPaymentId("");
					// navigate(`/refund/fail?message=${response?.statusMessage}`);
					Toast.errorToast("Refund failed");
				}
			} catch (error) {
				setLoading(false);
				setLoadingPaymentId("");
				alert("An error occurred during the refund process.");
			}
		}
	};

	// console.log("refund-data~", data);

	return (
		<div className="col right-sidebar-main my-favs">
			{isLoading ? (
				<LoadingCircle />
			) : data?.data?.length > 0 ? (
				<div className="my-favs-info border-t-2 w-auto rounded shadow">
					<h5 className="card-title text-center text-2xl my-3">Refund List</h5>
					<div className="overflow-x-auto">
						<table className="table-auto w-full">
							<thead>
								<tr className="border-b border-t">
									<th className="px-4 py-2 text-center w-1/8">SL</th>
									<th>পেমেন্ট আইডি</th>
									<th className="px-4 py-2 text-center w-1/8">
										ট্রানজেকশন আইডি
									</th>
									<th className="px-4 py-2 text-center w-1/8">মেথড</th>
									<th className="px-4 py-2 text-center w-1/8">পরিমাণ</th>
									<th className="px-4 py-2 text-center w-1/8">কারণ</th>
									<th className="px-4 py-2 text-center w-1/8">স্ট্যাটাস</th>
									<th className="px-4 py-2 text-center w-1/8">তারিখ</th>
									<th className="px-4 py-2 text-center w-1/8">একশন</th>
								</tr>
							</thead>
							<tbody>
								{data?.data?.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td className="text-xs">{item.payment_id}</td>
											<td className="text-xs">{item.transaction_id}</td>
											<td className="text-xs">bkash</td>
											<td className="text-xs">{item.refund_amount}</td>
											<td className="text-xs">Bio Purchases</td>
											<td className="text-xs">{item.refund_status}</td>
											<td className="text-xs">
												{item.refund_req_time} 13 Oct 2023
											</td>
											<td>
												<button
													onClick={() => refundHandler(item)}
													className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-2 px-4 mb-2 rounded"
												>
													{loading &&
													loadingPaymentId &&
													loadingPaymentId === item?.payment_id ? (
														<LoadingCircle />
													) : (
														"Refund"
													)}
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<p>there is no payment history</p>
			)}
		</div>
	);

	// return (
	// 	<div className="flex flex-col items-center justify-center h-screen">
	// 		<div className="mb-4">
	// 			<input
	// 				className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
	// 				type="number"
	// 				placeholder="amount..."
	// 				onChange={(e) => setAmount(e.target.value)}
	// 			/>
	// 		</div>
	// 		<button
	// 			onClick={refundHandler}
	// 			disabled={loading}
	// 			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	// 		>
	// 			{loading ? <LoadingCircle /> : "Refund Now"}
	// 		</button>
	// 	</div>
	// );
};
export default Refund;
