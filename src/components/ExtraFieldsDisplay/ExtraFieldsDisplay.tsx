import React from "react";
import GridQuestionAnswerCard from "../GridQuestionAnswerCard/GridQuestionAnswerCard";

interface ExtraField {
  label: string;
  value: string | number | boolean;
  fieldType: "section" | "text" | "multi-line" | "numeric" | "email" | "phone" | "select" | "boolean";
  options?: string[];
}

interface ExtraFieldsDisplayProps {
  fields: ExtraField[] | undefined;
  isPurchased?: boolean;
}

const ExtraFieldsDisplay: React.FC<ExtraFieldsDisplayProps> = ({
  fields,
  isPurchased = true,
}) => {
  if (!fields || fields.length === 0) return null;

  const renderValue = (field: ExtraField) => {
    if (!isPurchased) {
      return <span className="text-gray-400 italic">তথ্য সংরক্ষিত</span>;
    }

    switch (field.fieldType) {
      case "email":
        return (
          <a href={`mailto:${field.value}`} className="text-blue-600 underline hover:text-blue-800">
            {field.value}
          </a>
        );
      case "phone":
        return (
          <a href={`tel:${field.value}`} className="text-blue-600 underline hover:text-blue-800">
            {field.value}
          </a>
        );
      case "numeric":
        return <span>{Number(field.value).toLocaleString("en-BD")}</span>;
      case "boolean":
        return (
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${field.value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
            {field.value ? "হ্যাঁ / Yes" : "না / No"}
          </span>
        );
      case "select":
        return (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {field.value}
          </span>
        );
      case "multi-line":
        return <span style={{ whiteSpace: "pre-wrap" }}>{field.value}</span>;
      default:
        return <span>{field.value}</span>;
    }
  };

  return (
    <>
      {fields.map((field, index) => {
        if (field.fieldType === "section") {
          return (
            <div key={index} className="col-span-full px-4 pt-5 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-indigo-700">{field.label}</span>
                <div className="flex-1 h-px bg-indigo-200" />
              </div>
            </div>
          );
        }

        return (
          <GridQuestionAnswerCard
            key={index}
            question={field.label}
            answer={renderValue(field)}
          />
        );
      })}
    </>
  );
};

export default ExtraFieldsDisplay;
