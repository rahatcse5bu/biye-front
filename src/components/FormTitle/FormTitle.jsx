/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Colors } from "../../constants/colors";

const FormTitle = ({ title }) => {
  return (
    <div>
      <h1
        style={{ color: Colors.titleText }}
        className="text-2xl font-semibold mb-3"
      >
        {title}
      </h1>
      <hr />
    </div>
  );
};

export default FormTitle;
