import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddressInfoForm from "../AddressInfoForm/AddressInfoForm";
import ContactInfoForm from "../ContactInfoForm/ContactInfoForm";
import EducationalQualificationForm from "../EducationalQualificationForm/EducationalQualificationForm";
import ExpectedPartnerForm from "../ExpectedPartnerForm/ExpectedPartnerForm";
import FamilyInfoForm from "../FamilyInfoForm/FamilyInfoForm";
import GeneralInfoForm from "../GeneralInfoForm/GeneralInfoForm";
import MaritalInfoForm from "../MaritalInfoForm/MaritalInfoForm";
import OngikarNamaForm from "../OngikarNamaForm/OngikarNamaForm";
import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm";
import ProfessionInfoForm from "../ProfessionInfoForm/ProfessionInfoForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import UserContext from "../../contexts/UserContext";
import { getToken } from "../../utils/cookies";
import { GeneralInfoServices } from "../../services/generalInfo";

// eslint-disable-next-line react/prop-types
const Form = ({ userForm, setUserForm }) => {
	const { userInfo } = useContext(UserContext);
	const queryClient = useQueryClient();

	const userId = userInfo?.data?._id;
	const token = getToken()?.token;
	const generalInfoQueryKey = ["general-info", userId, token];

	// Fetch generalInfo once at parent level — never auto-refetch
	const { data: parentGeneralInfo = null } = useQuery({
		queryKey: generalInfoQueryKey,
		queryFn: async () => {
			return await GeneralInfoServices.getGeneralInfoByUser(token);
		},
		retry: false,
		enabled: !!userId,
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	// Derived values from the single cache source
	const religion = parentGeneralInfo?.data?.religion || "islam";
	const gender = parentGeneralInfo?.data?.gender || "";
	const maritalStatus = parentGeneralInfo?.data?.marital_status || "";

	// When GeneralInfoForm saves, directly update the React Query cache
	// so that when the next step renders, it reads fresh religion/gender/maritalStatus
	const handleGeneralInfoSaved = (savedFormData) => {
		queryClient.setQueryData(generalInfoQueryKey, (oldData) => {
			if (!oldData) {
				return { success: true, data: savedFormData };
			}
			return {
				...oldData,
				data: {
					...oldData.data,
					...savedFormData,
				},
			};
		});
	};

	return (
		<>
			{userForm === 1 ? (
				<GeneralInfoForm
					setUserForm={setUserForm}
					userForm={userForm}
					onGeneralInfoSaved={handleGeneralInfoSaved}
				/>
			) : userForm === 2 ? (
				<div>
					<AddressInfoForm setUserForm={setUserForm} userForm={userForm} />
				</div>
			) : userForm === 3 ? (
				<EducationalQualificationForm
					setUserForm={setUserForm}
					userForm={userForm}
					religion={religion}
				/>
			) : userForm === 4 ? (
				<FamilyInfoForm
					setUserForm={setUserForm}
					userForm={userForm}
					religion={religion}
				/>
			) : userForm === 5 ? (
				<PersonalInfoForm
					setUserForm={setUserForm}
					userForm={userForm}
					religion={religion}
					gender={gender}
				/>
			) : userForm === 6 ? (
				<ProfessionInfoForm setUserForm={setUserForm} userForm={userForm} />
			) : userForm === 7 ? (
				<MaritalInfoForm
					setUserForm={setUserForm}
					userForm={userForm}
					religion={religion}
					gender={gender}
					maritalStatus={maritalStatus}
				/>
			) : userForm === 8 ? (
				<ExpectedPartnerForm setUserForm={setUserForm} userForm={userForm} />
			) : userForm === 9 ? (
				<OngikarNamaForm
					setUserForm={setUserForm}
					userForm={userForm}
					religion={religion}
				/>
			) : userForm === 10 ? (
				<ContactInfoForm
					setUserForm={setUserForm}
					userForm={userForm}
					gender={gender}
				/>
			) : (
				<ReviewForm />
			)}
		</>
	);
};

export default Form;
