import "./MyReports.css";
import { Button } from "@material-tailwind/react";
import { FaEye, FaTrash } from "react-icons/fa";
const MyReports = () => {
	return (
		<div className="py-12 mx-auto ">
			<div className="">
				{/* <!-- End of Left Sidebar -->*/}
				<div className="col right-sidebar-main my-reports">
					<div className="w-auto border-t-2 rounded shadow my-reports-info">
						<h5 className="my-3 text-2xl text-center card-title">
							রিপোর্ট সমূহ
						</h5>
						<div className="overflow-x-auto">
							<table className="w-full table-auto">
								<thead>
									<tr className="border-t border-b">
										<th className="px-4 py-2 text-center w-1/7">SL</th>
										<th className="px-4 py-2 text-center w-1/7">
											রিপোর্ট আইডি
										</th>
										<th className="px-4 py-2 text-center w-1/7">
											বায়োডাটা নং
										</th>
										<th className="px-4 py-2 text-center w-1/7">স্ট্যাটাস</th>
										<th className="px-4 py-2 text-center w-1/7">তারিখ</th>
										<th className="px-4 py-2 text-center w-1/7">নতুন উত্তর</th>
										<th className="px-4 py-2 text-center w-1/7">অপশন</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b">
										<td className="px-4 py-2 text-center border-l w-1/7">1</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											PNCRID453
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											BID-2023
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Pending
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											4th Jan 2023
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Nothing
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											<Button color="green" size="xs" className="mr-2">
												<FaEye size={12} />
											</Button>
											<Button color="red" size="xs">
												<FaTrash size={12} />
											</Button>
										</td>
									</tr>
									<tr className="border-b">
										<td className="px-4 py-2 text-center border-l w-1/7">2</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											PNCRID453
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											BID-2023
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Pending
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											4th Jan 2023
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Nothing
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											<Button color="green" size="xs" className="mr-2">
												<FaEye size={12} />
											</Button>
											<Button color="red" size="xs">
												<FaTrash size={12} />
											</Button>
										</td>
									</tr>
									<tr className="border-b">
										<td className="px-4 py-2 text-center border-l w-1/7">3</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											PNCRID453
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											BID-2023
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Pending
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											4th Jan 2023
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Nothing
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											<Button color="green" size="xs" className="mr-2">
												<FaEye size={12} />
											</Button>
											<Button color="red" size="xs">
												<FaTrash size={12} />
											</Button>
										</td>
									</tr>
									<tr className="border-b">
										<td className="px-4 py-2 text-center border-l w-1/7">4</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											PNCRID403
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											BID-2049
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Completed
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											14th Jan 2023
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											Nothing
										</td>
										<td className="px-4 py-2 text-center border-l w-1/7">
											<Button color="green" size="xs" className="mr-2">
												<FaEye size={12} />
											</Button>
											<Button color="red" size="xs">
												<FaTrash size={12} />
											</Button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyReports;
