import { useContext, useState, useEffect, useCallback } from "react";
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
import { setProfilePhotoToLocal, setReligionToLocal } from "../../utils/localStorage";

// eslint-disable-next-line react/prop-types
const Form = ({ userForm, setUserForm }) => {
	const { userInfo } = useContext(UserContext);

	// Plain React state — NO React Query, NO cache
	const [generalInfoData, setGeneralInfoData] = useState(null);
	const [generalInfoLoading, setGeneralInfoLoading] = useState(true);
	const [religion, setReligion] = useState("islam");
	const [gender, setGender] = useState("");
	const [maritalStatus, setMaritalStatus] = useState("");

	// Fetch generalInfo once on mount — plain fetch, zero caching
	useEffect(() => {
		const token = getToken()?.token;
		const userId = userInfo?.data?._id;
		if (!userId || !token) {
			setGeneralInfoLoading(false);
			return;
		}

		setGeneralInfoLoading(true);
		GeneralInfoServices.getGeneralInfoByUser(token)
			.then((res) => {
				setGeneralInfoData(res || null);
				if (res?.data) {
					setReligion(res.data.religion || "islam");
					setGender(res.data.gender || "");
					setMaritalStatus(res.data.marital_status || "");
					// Store religion for homepage content
					setReligionToLocal(res.data.religion, res.data.religious_type);
					// Store profile photo for use in navbar/sidebar/cards
					if (res.data.gender === 'পুরুষ' && res.data.photos && res.data.photos.length > 0) {
						setProfilePhotoToLocal(res.data.photos[0]);
					} else {
						setProfilePhotoToLocal(null);
					}
				}
			})
			.catch(() => {
				setGeneralInfoData(null);
			})
			.finally(() => setGeneralInfoLoading(false));
	}, [userInfo?.data?._id]);

	// When GeneralInfoForm saves, directly update local state — no cache involved
	const handleGeneralInfoSaved = useCallback((savedFormData) => {
		setReligion(savedFormData.religion || "islam");
		setGender(savedFormData.gender || "");
		setMaritalStatus(savedFormData.marital_status || "");
		// Store religion for homepage content
		setReligionToLocal(savedFormData.religion, savedFormData.religious_type);
		// Store profile photo
		if (savedFormData.gender === 'পুরুষ' && savedFormData.photos && savedFormData.photos.length > 0) {
			setProfilePhotoToLocal(savedFormData.photos[0]);
		} else {
			setProfilePhotoToLocal(null);
		}
		// Also update the full generalInfoData so step 1 knows it exists (for create vs update)
		setGeneralInfoData((prev) => ({
			...prev,
			success: true,
			data: { ...(prev?.data || {}), ...savedFormData },
		}));
	}, []);

	return (
		<>
			{userForm === 1 ? (
				<GeneralInfoForm
					setUserForm={setUserForm}
					userForm={userForm}
					onGeneralInfoSaved={handleGeneralInfoSaved}
					generalInfoData={generalInfoData}
					generalInfoLoading={generalInfoLoading}
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
