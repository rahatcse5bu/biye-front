import React, { useState, useContext } from "react";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import { Colors } from "../../constants/colors";
import CustomCheckboxOption from "../CustomCheckBoxOption/CustomCheckBoxOption";
import BioContext from "../../contexts/BioContext";

const EducationFilter = () => {
  const { setFilterFields } = useContext(BioContext);
  const [openEducationFilter, setOpenEducationFilter] = useState(false);
  const [educationMedium, setEducationMedium] = useState([]);
  const [deeniEdu, setDeeniEdu] = useState([]);

  const handleEducationMediumChange = (value, checked) => {
    const updated = checked
      ? [...educationMedium, value]
      : educationMedium.filter((v) => v !== value);

    setEducationMedium(updated);
    setFilterFields((prev) => ({
      ...prev,
      education_medium: updated.length > 0 ? updated.join(",") : undefined,
    }));
  };

  const handleDeeniEduChange = (value, checked) => {
    const updated = checked
      ? [...deeniEdu, value]
      : deeniEdu.filter((v) => v !== value);

    setDeeniEdu(updated);
    setFilterFields((prev) => ({
      ...prev,
      deeni_edu: updated.length > 0 ? updated.join(",") : undefined,
    }));
  };

  return (
    <CustomAccordion
      isOpen={openEducationFilter}
      onToggle={() => setOpenEducationFilter((prev) => !prev)}
      title="  শিক্ষা"
    >
      <div>
        <h3
          className="mt-4 mb-2 font-semibold text-center"
          style={{ color: Colors.primary800 }}
        >
          পড়াশোনার মাধ্যম{" "}
        </h3>

        <div className="grid grid-cols-2">
          <CustomCheckboxOption
            id="general"
            label="জেনারেল"
            checked={educationMedium.includes("জেনারেল")}
            onChange={(e) =>
              handleEducationMediumChange("জেনারেল", e.target.checked)
            }
          />
          <CustomCheckboxOption
            id="qaumi"
            label="কওমী"
            checked={educationMedium.includes("কওমি")}
            onChange={(e) =>
              handleEducationMediumChange("কওমি", e.target.checked)
            }
          />
          <CustomCheckboxOption
            id="alia"
            label="আলিয়া"
            checked={educationMedium.includes("আলিয়া")}
            onChange={(e) =>
              handleEducationMediumChange("আলিয়া", e.target.checked)
            }
          />
        </div>

        <h3
          className="mt-4 mb-2 font-semibold text-center"
          style={{ color: Colors.primary800 }}
        >
          দ্বীনি শিক্ষার যোগ্যতা{" "}
        </h3>

        <div className="grid grid-cols-2">
          <CustomCheckboxOption
            id="hafez"
            label="হাফেজ"
            checked={deeniEdu.includes("হাফেজ")}
            onChange={(e) => handleDeeniEduChange("হাফেজ", e.target.checked)}
          />
          <CustomCheckboxOption
            id="maulana"
            label="মাওলানা"
            checked={deeniEdu.includes("মাওলানা")}
            onChange={(e) => handleDeeniEduChange("মাওলানা", e.target.checked)}
          />
          <CustomCheckboxOption
            id="mufti"
            label="মুফতি"
            checked={deeniEdu.includes("মুফতি")}
            onChange={(e) => handleDeeniEduChange("মুফতি", e.target.checked)}
          />
          <CustomCheckboxOption
            id="mufassir"
            label="মুফাসসির"
            checked={deeniEdu.includes("মুফাসসির")}
            onChange={(e) => handleDeeniEduChange("মুফাসসির", e.target.checked)}
          />
          <CustomCheckboxOption
            id="adib"
            label="আদিব"
            checked={deeniEdu.includes("আদিব")}
            onChange={(e) => handleDeeniEduChange("আদিব", e.target.checked)}
          />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default EducationFilter;
