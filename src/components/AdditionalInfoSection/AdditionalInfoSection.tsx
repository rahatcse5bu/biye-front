import React from "react";
import ExtraFieldsDisplay, { hasValue } from "../ExtraFieldsDisplay/ExtraFieldsDisplay";

interface ExtraField {
  label: string;
  value: string | number | boolean;
  fieldType: "section" | "text" | "multi-line" | "numeric" | "email" | "phone" | "select" | "boolean";
  options?: string[];
}

interface AdditionalInfoSectionProps {
  fields: ExtraField[] | undefined;
  isPurchased?: boolean;
}

/**
 * Component to display extra fields in a dedicated section
 * Similar styling to other info sections (BioInfo, AddressInfo, etc.)
 */
const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  fields,
  isPurchased = true,
}) => {
  if (!fields?.some((field) => field.fieldType !== "section" && hasValue(field))) {
    return null;
  }

  return (
    <div className="my-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        অতিরিক্ত তথ্য
      </h3>
      <div className="space-y-3">
        <ExtraFieldsDisplay fields={fields} isPurchased={isPurchased} />
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
