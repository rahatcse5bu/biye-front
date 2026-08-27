import { getToken, removeToken } from "../utils/cookies";
import { getErrorMessage } from "../utils/error";
import { Toast } from "../utils/toast";
import { userServices } from "./user";

export const verifyToken = async (user_id, logOut, log = "verify-token") => {
	try {
		const response = await userServices.verifyToken(getToken()?.token);
		console.log(`${log}~`, response);
		const data = response?.data;

		if (data?.user_id !== user_id) {
			await logOut();
			removeToken();
			Toast.errorToast("You are not authorized");
			window.location.href = "/login";
		}
	} catch (error) {
		console.error(`${log}~`, error);
		let msg = getErrorMessage(error);
		Toast.errorToast(msg);
		await logOut();
		removeToken();
		window.location.href = "/login";
	}
};
