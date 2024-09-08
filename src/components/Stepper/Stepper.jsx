/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Stepper, Step } from '@material-tailwind/react';
import { FaCheck } from 'react-icons/fa6';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export function StepperLine({ userForm, setUserForm }) {
  const { userInfo } = useContext(UserContext);

  const lastEditedIndex = userInfo?.data?.last_edited_timeline_index || 1;
  const editedTimelineIndex = userInfo?.data?.edited_timeline_index || 1;

  useEffect(() => {
    setUserForm(lastEditedIndex);
  }, [lastEditedIndex, setUserForm]);
  const stepperSize = Array.from({ length: 10 }, (_, index) => index);
  const clickStep = (index) => {
    setUserForm(index + 1);
  };

  return (
    <div className="w-full mx-auto mb-5">
      <Stepper
        activeStep={userForm - 1}
        activeLineClassName="bg-green-800"
        lineClassName="bg-blue-900"
        className="w-full"
        style={{
          width: '100%',
        }}
      >
        {stepperSize.map((_, index) => (
          <Step
            className="w-6 h-6 p-0 cursor-pointer"
            activeClassName="bg-purple-900"
            completedClassName="bg-green-900 text-white"
            key={index}
            onClick={() => clickStep(index)}
          >
            {index <= editedTimelineIndex ? (
              <FaCheck />
            ) : (
              <span>{index + 1}</span>
            )}
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
