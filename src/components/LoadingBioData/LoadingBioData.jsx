import { Grid } from "react-loader-spinner";
import { Colors } from "../../constants/colors";

const LoadingBioData = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
			}}
		>
			<Grid
				height="80"
				width="80"
				color={Colors.pncPrimaryColor}
				ariaLabel="grid-loading"
				radius="12.5"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

export default LoadingBioData;
