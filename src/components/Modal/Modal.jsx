import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import Select from '../Select/Select';
import { genderOptions } from '../GeneralInfoForm/generalInfoForm.constant';
import { getGender, setGenderToLocal } from '../../utils/localStorage';

export function Modal() {
  const [open, setOpen] = React.useState(true);
  const [gender, setGender] = useState('');

  useEffect(() => {
    const gender = getGender();
    if (gender) {
      setOpen(false);
    }
  }, []);

  const handleOpen = () => setOpen(!open);
  const submitHandler = () => {
    setGenderToLocal(gender);
    setOpen(false);
    // console.log(gender);
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-red-800">Its Important</DialogHeader>
        <DialogBody>
          <Select
            value={gender}
            title="আপনার লিঙ্গ নিশ্চিন্ত করুন"
            setValue={setGender}
            options={genderOptions}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={submitHandler}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
