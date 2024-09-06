/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Colors } from '../../constants/colors';
import { AiOutlineDelete, AiOutlineSearch } from 'react-icons/ai';
import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { convertToQuery } from '../../utils/query';
import PrimaryFilter from './PrimaryFilter';
import { useQuery } from '@tanstack/react-query';
import AddressFilter from './AddressFilter';
import BioDataFilterButton from './BioDataFilterButton';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import EducationFilter from './EducationFilter';
import PersonalInfoFilter from './PersonalInfoFilte';
import OccupationFilter from './OccupationFilter';
import OthersFilter from './OthersFilter';
import { useFilter } from '../../contexts/useFilter';

const BioDataFilter = () => {
  const { setQuery, setFilterFields, filterFields } = useContext(BioContext);
  const { setAddressFilterOpen, setPrimaryFilterOpen } = useFilter();

  const [openAccordions, setOpenAccordions] = useState({
    3: true,
  });
  const navigate = useNavigate();
  const [searchParams, currentQueryParameters, setSearchParams] =
    useSearchParams();
  const newQueryParameters = new URLSearchParams();
  const [open, setOpen] = useState(3);
  const [bioType, setBioType] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [zilla, setZilla] = useState('');
  const [division, setDivision] = useState('');

  const [value, setValue] = useState(50);

  // console.log("searchParams~", searchParams.get("marital_status"));
  useEffect(() => {
    setPrimaryFilterOpen(true);
    setAddressFilterOpen(true);
  }, []);
  useEffect(() => {
    setBioType(searchParams.get('bio_type'));
    setMaritalStatus(searchParams.get('marital_status'));
    setDivision(searchParams.get('division'));
    setZilla(searchParams.get('zilla'));
  }, [searchParams]);

  useEffect(() => {
    if (division || zilla) {
      setOpenAccordions((prevState) => ({
        ...prevState,
        [1]: true,
      }));
    }

    if (maritalStatus || bioType) {
      setOpenAccordions((prevState) => ({
        ...prevState,
        [3]: true,
      }));
    }

    let queryObj = {};
    if (bioType) {
      queryObj = {
        ...queryObj,
        bio_type: bioType,
      };
    }
    if (maritalStatus) {
      queryObj = {
        ...queryObj,
        marital_status: maritalStatus,
      };
    }
    // const queryString = convertToQuery(queryObj);
    // setQuery(queryObj);
    setFilterFields(queryObj);
  }, [bioType, division, maritalStatus, setFilterFields, setQuery, zilla]);

  // useEffect(() => {}, [division, zilla, maritalStatus, bioType]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleToggle = (index) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // console.log("openAccordions~~", openAccordions);
  // console.log("filterFields~", filterFields);
  return (
    <List className=" lg:min-h-[80vh] lg:max-h-[200vh] h-auto overflow-auto overflow-x-hidden">
      <PrimaryFilter
        openAccordions={openAccordions}
        handleToggle={handleToggle}
        setBioType={setBioType}
        bioType={bioType}
        maritalStatus={maritalStatus}
        setMaritalStatus={setMaritalStatus}
        setSearchParams={setSearchParams}
        newQueryParameters={newQueryParameters}
        setOpenAccordions={setOpenAccordions}
      />

      <AddressFilter
        handleToggle={handleToggle}
        openAccordions={openAccordions}
        division={division}
        zilla={zilla}
        setDivision={setDivision}
        setZilla={setZilla}
      />

      <EducationFilter />

      <PersonalInfoFilter />

      <OccupationFilter />

      <OthersFilter />
      <BioDataFilterButton />
    </List>
  );
};

export default BioDataFilter;
