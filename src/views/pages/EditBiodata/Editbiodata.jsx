/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { BiSidebar } from 'react-icons/bi';

import Form from '../../../components/Form/Form';
import { ScrollToTop } from '../../../constants/ScrolltoTop';
import Numbering from '../../../components/Numbering/Numbering';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { StepperLine } from '../../../components/Stepper/Stepper';

const TOTAL_STEPS = 12; // 11 data-entry steps + review step

const EditBiodata = () => {
  const [userForm, setUserForm] = useState(1);
  const { userInfo } = useContext(UserContext);
  const hasResumedStep = useRef(false);

  // Resume on the last step the user updated, once, when their info first loads.
  useEffect(() => {
    if (hasResumedStep.current || !userInfo?.data) return;

    const lastStep =
      userInfo.data.last_edited_timeline_index ||
      userInfo.data.edited_timeline_index ||
      1;

    setUserForm(Math.min(Math.max(lastStep, 1), TOTAL_STEPS));
    hasResumedStep.current = true;
  }, [userInfo]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-[30%] w-full lg:mx-5 mx-0">
        <div className="hidden lg:block">
          <Numbering setUserForm={setUserForm} userForm={userForm} />
        </div>

        <div className="block mt-10 lg:hidden">
          <StepperLine setUserForm={setUserForm} userForm={userForm} />
        </div>
      </div>
      <div className="lg:w-[70%] w-full">
        <Form setUserForm={setUserForm} userForm={userForm} />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default EditBiodata;
