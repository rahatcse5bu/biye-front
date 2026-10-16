/* eslint-disable react/prop-types */
import { useState } from 'react';
import Select from '../Select/Select';
import Input from '../Input/Input';
import {
  EXTRA_EDU_FIELDS,
  LEVEL_BLOCKS,
  afterSscOptions,
  classType,
  deenStatusOptions,
  educationOptions,
  educationTypeOptions,
  group,
  hscOptions,
  qawmiEducationOptions,
  qawmiResult,
} from './educationQualification.constant';
import Textarea from '../Textarea/Textarea';
import { Colors } from '../../constants/colors';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { useEffect } from 'react';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
// import { useNavigate } from "@/lib/navigation";
import MultipleSelect from '../MultitpleSelect/MultipleSelect';
import {
  dataToMultipleExpectedPartner,
  getDataFromMultipleInputExpectedPartner,
} from '../../utils/form';
import { getErrorMessage } from '../../utils/error';
import { Toast } from '../../utils/toast';
import { trackEvent } from "@/utils/analytics";
import { EducationalQualificationInfoServices } from '../../services/educationalQualification';
import { getToken } from '../../utils/cookies';

const EducationalQualificationForm = ({ setUserForm, userForm, religion = 'islam', religiousType = '' }) => {
	// TODO: non-practicing (general) Muslims don't get the deeni-education question.
	const showDeeni = religion === 'islam' && religiousType !== 'general_muslim';
  const [eduType, setEduType] = useState('');
  const [status, setStatus] = useState([]);
  const [maxEdu, setMaxEdu] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [othersEdu, setOthersEdu] = useState('');
  const [sscPassYear, setSscPassYear] = useState('');
  const [sscGroup, setSscGroup] = useState('');
  const [sscResult, setSscResult] = useState('');
  const [hscRunning, setHscRunning] = useState('');
  const [hscPassYear, setHscPassYear] = useState('');
  const [hscGroup, setHscGroup] = useState('');
  const [hscResult, setHscResult] = useState('');
  const [diplomaInst, setDiplomaInst] = useState('');
  const [diplomaSub, setDiplomaSub] = useState('');
  const [diplomaYear, setDiplomaYear] = useState('');
  const [diplomaPassYear, setDiplomaPassYear] = useState('');
  const [afterSsc, setAfterSsc] = useState('');
  const [bscInst, setBscInst] = useState('');
  const [bscSub, setBscSub] = useState('');
  const [bscYear, setBscYear] = useState('');
  const [bscPassYear, setBscPassYear] = useState('');
  const [mscPassYear, setMscPassYear] = useState('');
  const [mscSub, setMscSub] = useState('');
  const [mscInst, setMscInst] = useState('');
  const [phdSub, setPhdSub] = useState('');
  const [phdInst, setPhdInst] = useState('');
  const [phdPassYear, setPhdPassYear] = useState('');
  const [ibtiInst, setIbtiInst] = useState('');
  const [ibtiPassYear, setIbtiPassYear] = useState('');
  const [ibtiResult, setIbtiResult] = useState('');
  const [mutawasInst, setMutawasInst] = useState('');
  const [mutawasResult, setMutawasResult] = useState('');
  const [mutawasPassYear, setMutawasPassYear] = useState('');
  const [sanabiyaInst, setSanaInst] = useState('');
  const [sanabiyaPassYear, setSanabiyaPassYear] = useState('');
  const [sanabiyaResult, setSanabiyaResult] = useState('');
  const [fozilatInst, setFozilatInst] = useState('');
  const [fozilatPassYear, setFozilatPassYear] = useState('');
  const [fozilatResult, setFozilatResult] = useState('');
  const [takmilInst, setTakmilInst] = useState('');
  const [takmilPassYear, setTakmilPassYear] = useState('');
  const [takmilResult, setTakmilResult] = useState('');
  const [takhassusInst, setTakhassusInst] = useState('');
  const [takhassusResult, setTakhassusResult] = useState('');
  const [takhassusPassYear, setTakhassusPassYear] = useState('');
  const [takhassusSub, setTakhassusSub] = useState('');
  const { userInfo } = useContext(UserContext);
  // const navigate = useNavigate();

  // TODO: fields of the newer running/professional levels live in one object instead of a useState each.
  const [extra, setExtra] = useState({});
  const extraProps = (key) => ({
    value: extra[key] || '',
    setValue: (value) => setExtra((current) => ({ ...current, [key]: value })),
  });
  const [loading, setLoading] = useState(false);

  const { data: educationalQualification = null, isLoading } = useQuery({
    queryKey: [
      'educational-qualification',
      userInfo?.data?._id,
      getToken()?.token,
    ],
    queryFn: async () => {
      return await EducationalQualificationInfoServices.getEducationalQualificationInfoByUser(
        getToken()?.token
      );
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  // useEffect(() => {
  //   verifyToken(
  //     userInfo?.data?._id,
  //     logOut,
  //     "educational-qualification-form-verify-token"
  //   );
  // }, [logOut, userInfo?.data]);

  // console.log(educationalQualification);

  useEffect(() => {
    if (educationalQualification?.data) {
      const {
        education_medium,
        highest_edu_level,
        others_edu,
        before_ssc,
        deeni_edu,
        ssc_year,
        ssc_group,
        ssc_result,
        after_ssc_running,
        after_ssc_result,
        after_ssc_group,
        after_ssc_year,
        diploma_running_year,
        diploma_sub,
        diploma_inst,
        diploma_pass_year,
        hons_inst,
        hons_year,
        hons_sub,
        after_ssc_medium,
        hons_pass_year,
        msc_sub,
        msc_pass_year,
        msc_inst,
        phd_pass_year,
        phd_inst,
        phd_sub,
        ibti_result,
        ibti_pass_year,
        ibti_inst,
        mutawas_inst,
        mutawas_pass_year,
        mutawas_result,
        sanabiya_inst,
        sanabiya_result,
        sanabiya_pass_year,
        fozilat_inst,
        fozilat_result,
        fozilat_pass_year,
        takmil_inst,
        takmil_result,
        takmil_pass_year,
        takhassus_inst,
        takhassus_result,
        takhassus_sub,
        takhassus_pass_year,
        status,
      } = educationalQualification.data;
      if (education_medium) {
        setEduType(education_medium);
      }
      if (highest_edu_level) {
        setMaxEdu(highest_edu_level);
      }
      if (others_edu) {
        setOthersEdu(others_edu);
      }
      if (before_ssc) {
        setSelectedClass(before_ssc);
      }
      if (deeni_edu) {
        setStatus(dataToMultipleExpectedPartner(deeni_edu));
      }
      if (ssc_year) {
        setSscPassYear(ssc_year);
      }

      if (ssc_group) {
        setSscGroup(ssc_group);
      }

      if (after_ssc_running) {
        setHscRunning(after_ssc_running);
      }
      if (ssc_result) {
        setSscResult(ssc_result);
      }
      if (after_ssc_result) {
        setHscResult(after_ssc_result);
      }
      if (after_ssc_group) {
        setHscGroup(after_ssc_group);
      }
      if (after_ssc_year) {
        setHscPassYear(after_ssc_year);
      }
      if (diploma_running_year) {
        setDiplomaYear(diploma_running_year);
      }
      if (diploma_inst) {
        setDiplomaInst(diploma_inst);
      }
      if (diploma_sub) {
        setDiplomaSub(diploma_sub);
      }
      if (diploma_pass_year) {
        setDiplomaPassYear(diploma_pass_year);
      }
      if (hons_sub) {
        setBscSub(hons_sub);
      }

      if (hons_year) {
        setBscYear(hons_year);
      }

      if (hons_inst) {
        setBscInst(hons_inst);
      }
      if (after_ssc_medium) {
        setAfterSsc(after_ssc_medium);
      }
      if (hons_pass_year) {
        setBscPassYear(hons_pass_year);
      }
      if (msc_sub) {
        setMscSub(msc_sub);
      }
      if (msc_inst) {
        setMscInst(msc_inst);
      }
      if (msc_pass_year) {
        setMscPassYear(msc_pass_year);
      }
      if (phd_pass_year) {
        setPhdPassYear(phd_pass_year);
      }
      if (phd_inst) {
        setPhdInst(phd_inst);
      }
      if (phd_sub) {
        setPhdSub(phd_sub);
      }
      if (ibti_pass_year) {
        setIbtiPassYear(ibti_pass_year);
      }
      if (ibti_inst) {
        setIbtiInst(ibti_inst);
      }
      if (ibti_result) {
        setIbtiResult(ibti_result);
      }
      if (mutawas_inst) {
        setMutawasInst(mutawas_inst);
      }
      if (mutawas_pass_year) {
        setMutawasPassYear(mutawas_pass_year);
      }
      if (mutawas_result) {
        setMutawasResult(mutawas_result);
      }
      if (sanabiya_inst) {
        setSanaInst(sanabiya_inst);
      }
      if (sanabiya_pass_year) {
        setSanabiyaPassYear(sanabiya_pass_year);
      }
      if (sanabiya_result) {
        setSanabiyaResult(sanabiya_result);
      }
      if (fozilat_inst) {
        setFozilatInst(fozilat_inst);
      }
      if (fozilat_pass_year) {
        setFozilatPassYear(fozilat_pass_year);
      }
      if (fozilat_result) {
        setFozilatResult(fozilat_result);
      }
      if (takmil_inst) {
        setTakmilInst(takmil_inst);
      }
      if (takmil_pass_year) {
        setTakmilPassYear(takmil_pass_year);
      }
      if (takmil_result) {
        setTakmilResult(takmil_result);
      }

      if (takhassus_inst) {
        setTakhassusInst(takhassus_inst);
      }
      if (takhassus_pass_year) {
        setTakhassusPassYear(takhassus_pass_year);
      }
      if (takhassus_result) {
        setTakhassusResult(takhassus_result);
      }
      if (takhassus_sub) {
        setTakhassusSub(takhassus_sub);
      }
      if (Array.isArray(status)) {
        setStatus(dataToMultipleExpectedPartner(status));
      }
      setExtra(
        Object.fromEntries(
          EXTRA_EDU_FIELDS.filter((key) => educationalQualification.data[key]).map((key) => [
            key,
            educationalQualification.data[key],
          ])
        )
      );
    }
  }, [educationalQualification?.data]);

  const blocks = LEVEL_BLOCKS[maxEdu] || [];
  const hasBlock = (name) => blocks.includes(name);

  const sscFields = (requireYear) => (
    <>
      <Input
        title=" এস.এস.সি / দাখিল / সমমান পাসের সন "
        value={sscPassYear}
        setValue={setSscPassYear}
        type="number"
        required={requireYear}
      />
      <Select title="বিভাগ" value={sscGroup} setValue={setSscGroup} options={group} required />
      <Input title="ফলাফল (GPA)" value={sscResult} setValue={setSscResult} type="number" min="0" max="5" step="0.01" placeholder="4.50" subtitle="৫.০০-এর মধ্যে প্রাপ্ত GPA লিখুন" required />
    </>
  );

  const hscFields = (requireYear) => (
    <>
      <Input
        title="এইচ.এস.সি / আলিম / সমমান পাসের সন "
        value={hscPassYear}
        setValue={setHscPassYear}
        type="number"
        required={requireYear}
      />
      <Select title="বিভাগ" value={hscGroup} setValue={setHscGroup} options={group} required />
      <Input title="ফলাফল (GPA)" value={hscResult} setValue={setHscResult} type="number" min="0" max="5" step="0.01" placeholder="4.50" subtitle="৫.০০-এর মধ্যে প্রাপ্ত GPA লিখুন" required />
    </>
  );

  const diplomaFields = (running, required) => (
    <>
      <Input
        title="ডিপ্লোমা কোন বিষয়ে পড়েছেন?"
        value={diplomaSub}
        setValue={setDiplomaSub}
        placeholder="ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং"
        required={required}
      />
      <Input
        title="শিক্ষাপ্রতিষ্ঠানের নাম"
        value={diplomaInst}
        setValue={setDiplomaInst}
        placeholder="ঢাকা পলিটেকনিক ইনস্টিটিউট"
        required={required}
      />
      {running ? (
        <Input title="এখন কোন বর্ষে পড়ছেন?" value={diplomaYear} setValue={setDiplomaYear} />
      ) : (
        <Input
          title="পাসের বছর "
          value={diplomaPassYear}
          setValue={setDiplomaPassYear}
          placeholder="2016"
          type="number"
          required={required}
        />
      )}
    </>
  );

  // TODO: one block per stage; "running" asks the current year/semester instead of the pass year.
  const degreeFields = ({ label, sub, inst, running, year, required = true }) => (
    <>
      {sub && (
        <Input title={`${label} পড়াশোনার বিষয়`} value={sub.value} setValue={sub.setValue} required={required} />
      )}
      <Input title={`${label} শিক্ষাপ্রতিষ্ঠানের নাম`} value={inst.value} setValue={inst.setValue} required={required} />
      {running ? (
        <Input title={`${label} কোন বর্ষে / সেমিস্টারে পড়ছেন?`} value={year.value} setValue={year.setValue} required={required} />
      ) : (
        <Input title={`${label} পাসের সন`} value={year.value} setValue={year.setValue} type="number" required={required} />
      )}
    </>
  );

  const field = (value, setValue) => ({ value, setValue });

  const renderGeneralLevel = () => (
    <>
      {(hasBlock('ssc') || hasBlock('sscRunning')) && (
        <Input title="স্কুল / মাদ্রাসার নাম" {...extraProps('ssc_inst')} required />
      )}
      {(hasBlock('hsc') || hasBlock('hscRunning') || (hasBlock('afterSsc') && afterSsc === 'HSC')) && (
        <Input title="কলেজ / মাদ্রাসার নাম" {...extraProps('after_ssc_inst')} required />
      )}
      {hasBlock('belowSsc') && (
        <Select
          title="আপনি কোন ক্লাস পর্যন্ত পড়াশুনা করেছেন?"
          value={selectedClass}
          setValue={setSelectedClass}
          options={classType}
          required
        />
      )}
      {hasBlock('sscRunning') && (
        <>
          <Input
            title="এস.এস.সি / দাখিল / সমমান পরীক্ষার সম্ভাব্য সন"
            type="number"
            required
            {...extraProps('ssc_exam_year')}
          />
          <Select title="বিভাগ" value={sscGroup} setValue={setSscGroup} options={group} required />
        </>
      )}
      {hasBlock('ssc') && sscFields(blocks.length > 2 || hasBlock('afterSsc'))}
      {hasBlock('sscNext') && (
        <Select
          title=" এইচ.এস.সি / আলিম / সমমান কোন বর্ষে পড়ছেন ?"
          value={hscRunning}
          setValue={setHscRunning}
          options={hscOptions}
        />
      )}
      {hasBlock('hscRunning') && (
        <>
          <Select
            title="এইচ.এস.সি / আলিম / সমমান কোন বর্ষে পড়ছেন?"
            value={hscRunning}
            setValue={setHscRunning}
            options={hscOptions.slice(0, 3)}
            required
          />
          <Select title="বিভাগ" value={hscGroup} setValue={setHscGroup} options={group} required />
        </>
      )}
      {hasBlock('hsc') && hscFields(false)}
      {hasBlock('diplomaRunning') && diplomaFields(true, false)}
      {hasBlock('diploma') && diplomaFields(false, false)}
      {hasBlock('afterSsc') && (
        <>
          <Select
            title="SSC পরে কোন মাধ্যমে পড়াশুনা করেছেন? "
            value={afterSsc}
            setValue={setAfterSsc}
            options={afterSscOptions}
            required
          />
          {afterSsc === 'ডিপ্লোমা' ? diplomaFields(false, true) : hscFields(true)}
        </>
      )}
      {hasBlock('honsRunning') &&
        degreeFields({ label: 'স্নাতক (অনার্স) / ফাজিল', sub: field(bscSub, setBscSub), inst: field(bscInst, setBscInst), running: true, year: field(bscYear, setBscYear) })}
      {hasBlock('hons') &&
        degreeFields({ label: 'স্নাতক (অনার্স) / ফাজিল', sub: field(bscSub, setBscSub), inst: field(bscInst, setBscInst), year: field(bscPassYear, setBscPassYear) })}
      {hasBlock('mscRunning') &&
        degreeFields({ label: 'স্নাতকোত্তর (মাস্টার্স) / কামিল', sub: field(mscSub, setMscSub), inst: field(mscInst, setMscInst), running: true, year: extraProps('msc_running_year') })}
      {hasBlock('msc') &&
        degreeFields({ label: 'স্নাতকোত্তর (মাস্টার্স) / কামিল', sub: field(mscSub, setMscSub), inst: field(mscInst, setMscInst), year: field(mscPassYear, setMscPassYear), required: maxEdu === 'স্নাতকোত্তর' })}
      {hasBlock('phdRunning') &&
        degreeFields({ label: 'পিএইচডি', sub: field(phdSub, setPhdSub), inst: field(phdInst, setPhdInst), running: true, year: extraProps('phd_running_year') })}
      {hasBlock('phd') &&
        degreeFields({ label: 'পিএইচডি / ডক্টরেট', sub: field(phdSub, setPhdSub), inst: field(phdInst, setPhdInst), year: field(phdPassYear, setPhdPassYear) })}
      {hasBlock('bedRunning') &&
        degreeFields({ label: 'বিএড', inst: extraProps('bed_inst'), running: true, year: extraProps('bed_running_year') })}
      {hasBlock('bed') && degreeFields({ label: 'বিএড', inst: extraProps('bed_inst'), year: extraProps('bed_pass_year') })}
      {hasBlock('medRunning') &&
        degreeFields({ label: 'এমএড', inst: extraProps('med_inst'), running: true, year: extraProps('med_running_year') })}
      {hasBlock('med') && degreeFields({ label: 'এমএড', inst: extraProps('med_inst'), year: extraProps('med_pass_year') })}
      {hasBlock('mphilRunning') &&
        degreeFields({ label: 'এমফিল', sub: extraProps('mphil_sub'), inst: extraProps('mphil_inst'), running: true, year: extraProps('mphil_running_year') })}
      {hasBlock('mphil') &&
        degreeFields({ label: 'এমফিল', sub: extraProps('mphil_sub'), inst: extraProps('mphil_inst'), year: extraProps('mphil_pass_year') })}
      {hasBlock('postdocRunning') &&
        degreeFields({ label: 'পোস্ট ডক', sub: extraProps('postdoc_sub'), inst: extraProps('postdoc_inst'), running: true, year: extraProps('postdoc_running_year') })}
      {hasBlock('postdoc') &&
        degreeFields({ label: 'পোস্ট ডক', sub: extraProps('postdoc_sub'), inst: extraProps('postdoc_inst'), year: extraProps('postdoc_pass_year') })}
    </>
  );

  // TODO: mirrors renderGeneralLevel: each visible block contributes its own fields.
  const generalLevelPayload = () => {
    const pick = (...keys) => Object.fromEntries(keys.map((key) => [key, extra[key] || '']));
    const diplomaPayload = (running) =>
      running
        ? { diploma_sub: diplomaSub, diploma_inst: diplomaInst, diploma_running_year: diplomaYear }
        : { diploma_sub: diplomaSub, diploma_inst: diplomaInst, diploma_pass_year: diplomaPassYear };
    const hscPayload = { ...pick('after_ssc_inst'), after_ssc_year: hscPassYear, after_ssc_group: hscGroup, after_ssc_result: hscResult };
    const payloads = {
      belowSsc: { before_ssc: selectedClass },
      sscRunning: { ...pick('ssc_exam_year', 'ssc_inst'), ssc_group: sscGroup },
      ssc: { ...pick('ssc_inst'), ssc_year: sscPassYear, ssc_group: sscGroup, ssc_result: sscResult },
      sscNext: { after_ssc_running: hscRunning },
      hscRunning: { ...pick('after_ssc_inst'), after_ssc_running: hscRunning, after_ssc_group: hscGroup },
      hsc: hscPayload,
      diplomaRunning: diplomaPayload(true),
      diploma: diplomaPayload(false),
      afterSsc: { after_ssc_medium: afterSsc, ...(afterSsc === 'ডিপ্লোমা' ? diplomaPayload(false) : hscPayload) },
      honsRunning: { hons_sub: bscSub, hons_inst: bscInst, hons_year: bscYear },
      hons: { hons_sub: bscSub, hons_inst: bscInst, hons_pass_year: bscPassYear },
      mscRunning: { msc_sub: mscSub, msc_inst: mscInst, ...pick('msc_running_year') },
      msc: { msc_sub: mscSub, msc_inst: mscInst, msc_pass_year: mscPassYear },
      phdRunning: { phd_sub: phdSub, phd_inst: phdInst, ...pick('phd_running_year') },
      phd: { phd_sub: phdSub, phd_inst: phdInst, phd_pass_year: phdPassYear },
      bedRunning: pick('bed_inst', 'bed_running_year'),
      bed: pick('bed_inst', 'bed_pass_year'),
      medRunning: pick('med_inst', 'med_running_year'),
      med: pick('med_inst', 'med_pass_year'),
      mphilRunning: pick('mphil_sub', 'mphil_inst', 'mphil_running_year'),
      mphil: pick('mphil_sub', 'mphil_inst', 'mphil_pass_year'),
      postdocRunning: pick('postdoc_sub', 'postdoc_inst', 'postdoc_running_year'),
      postdoc: pick('postdoc_sub', 'postdoc_inst', 'postdoc_pass_year'),
    };
    return Object.assign({}, ...blocks.map((name) => payloads[name] || {}));
  };

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  const submitButtonHandler = async (e) => {
    e.preventDefault();
    let educationQualificationData = {
      education_medium: eduType,
      highest_edu_level: maxEdu,
      others_edu: othersEdu,
      deeni_edu: getDataFromMultipleInputExpectedPartner(status),
    };
    // TODO: general/alia levels save exactly the fields of the blocks their form showed.
    if (eduType === 'জেনারেল' || eduType === 'আলিয়া') {
      educationQualificationData = {
        ...educationQualificationData,
        ...generalLevelPayload(),
      };
    } else if (maxEdu === 'ইবতিদাইয়্যাহ' && eduType === 'কওমি') {
      educationQualificationData = {
        ...educationQualificationData,
        ibti_pass_year: ibtiPassYear,
        ibti_inst: ibtiInst,
        ibti_result: ibtiResult,
      };
    } else if (maxEdu === 'মুতাওয়াসসিতাহ' && eduType === 'কওমি') {
      educationQualificationData = {
        ...educationQualificationData,
        mutawas_pass_year: mutawasPassYear,
        mutawas_inst: mutawasInst,
        mutawas_result: mutawasResult,
      };
    } else if (maxEdu === 'সানাবিয়া উলইয়া' && eduType === 'কওমি') {
      educationQualificationData = {
        ...educationQualificationData,
        sanabiya_pass_year: sanabiyaPassYear,
        sanabiya_inst: sanabiyaInst,
        sanabiya_result: sanabiyaResult,
      };
    } else if (maxEdu === 'ফযীলত' && eduType === 'কওমি') {
      educationQualificationData = {
        ...educationQualificationData,
        fozilat_pass_year: fozilatPassYear,
        fozilat_inst: fozilatInst,
        fozilat_result: fozilatResult,
      };
    } else if (maxEdu === 'তাকমীল' && eduType === 'কওমি') {
      educationQualificationData = {
        ...educationQualificationData,
        takmil_pass_year: takmilPassYear,
        takmil_inst: takmilInst,
        takmil_result: takmilResult,
      };
    } else if (maxEdu === 'তাখাসসুস' && eduType === 'কওমি') {
      educationQualificationData = {
        ...educationQualificationData,
        takmil_pass_year: takmilPassYear,
        takmil_inst: takmilInst,
        takmil_result: takmilResult,
        takhassus_pass_year: takhassusPassYear,
        takhassus_inst: takhassusInst,
        takhassus_result: takhassusResult,
        takhassus_sub: takhassusResult,
      };
    }
    let data;

    setLoading(true);
    try {
      if (educationalQualification?.success === true) {
        data =
          await EducationalQualificationInfoServices.updateEducationalQualificationInfo(
            educationQualificationData,
            getToken()?.token
          );

        // console.log(getToken()?.token);
      } else {
        data =
          await EducationalQualificationInfoServices.createEducationalQualificationInfo(
            { ...educationQualificationData, user_form: userForm },
            getToken()?.token
          );
      }

      if (data.success) {
        trackEvent('biodata_section_saved', { section: 'education' });
        Toast.successToast('আপনার তথ্য আপডেট  করা হয়েছে ');
        setUserForm((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = getErrorMessage(error);
      Toast.errorToast(errorMsg);

      //! for token error redirect to logout
      // if (errorMsg.includes("You are not authorized")) {
      //   await logOut();
      //   removeToken();
      //   navigate("/");
      // }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <h3
        style={{ color: Colors.titleText }}
        className="mb-3 text-2xl font-semibold"
      >
        শিক্ষাগত যোগ্যতা
      </h3>
      <hr />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form action="" onSubmit={submitButtonHandler}>
          <Select
            title="আপনার শিক্ষা মাধ্যম"
            value={eduType}
            setValue={setEduType}
            options={educationTypeOptions}
            required
          />
          {eduType === 'জেনারেল' || eduType === 'আলিয়া' ? (
            <>
              <Select
                title=" সর্বোচ্চ শিক্ষাগত যোগ্যতা"
                value={maxEdu}
                setValue={setMaxEdu}
                options={educationOptions}
                required
              />

              {renderGeneralLevel()}
            </>
          ) : eduType === 'কওমি' ? (
            <>
              <Select
                title=" সর্বোচ্চ শিক্ষাগত যোগ্যতা"
                value={maxEdu}
                setValue={setMaxEdu}
                options={qawmiEducationOptions}
                required
              />

              {maxEdu === 'প্রাথমিক দ্বীনি শিক্ষা' ? (
                <></>
              ) : maxEdu === 'ইবতিদাইয়্যাহ' ? (
                <>
                  {' '}
                  <Input
                    title=" ইবতিদাইয়্যাহ কোন মাদ্রাসা থেকে পড়েছেন?"
                    value={ibtiInst}
                    required
                    setValue={setIbtiInst}
                  />
                  <Select
                    title="ফলাফল"
                    value={ibtiResult}
                    setValue={setIbtiResult}
                    options={qawmiResult}
                    required
                  />
                  <Input
                    title="পাসের সন"
                    value={ibtiPassYear}
                    setValue={setIbtiPassYear}
                    type="number"
                    required
                  />
                </>
              ) : maxEdu === 'মুতাওয়াসসিতাহ' ? (
                <>
                  {' '}
                  <Input
                    title="মুতাওয়াসসিতাহ কোন মাদ্রাসা থেকে পড়েছেন?"
                    value={mutawasInst}
                    setValue={setMutawasInst}
                    required
                  />
                  <Select
                    title="ফলাফল"
                    value={mutawasResult}
                    setValue={setMutawasResult}
                    options={qawmiResult}
                    required
                  />
                  <Input
                    title="পাসের সন"
                    value={mutawasPassYear}
                    setValue={setMutawasPassYear}
                    type="number"
                    required
                  />
                </>
              ) : maxEdu === 'সানাবিয়া উলইয়া' ? (
                <>
                  {' '}
                  <Input
                    title="সানাবিয়া উলইয়া কোন মাদ্রাসা থেকে পড়েছেন?"
                    value={sanabiyaInst}
                    setValue={setSanaInst}
                    required
                  />
                  <Select
                    title="ফলাফল"
                    value={sanabiyaResult}
                    setValue={setSanabiyaResult}
                    options={qawmiResult}
                    required
                  />
                  <Input
                    title="পাসের সন"
                    value={sanabiyaPassYear}
                    setValue={setSanabiyaPassYear}
                    type="number"
                    required
                  />
                </>
              ) : maxEdu === 'ফযীলত' ? (
                <>
                  {' '}
                  <Input
                    title="ফযীলত  কোন মাদ্রাসা থেকে পড়েছেন?"
                    value={fozilatInst}
                    setValue={setFozilatInst}
                    required
                  />
                  <Select
                    title="ফলাফল"
                    value={fozilatResult}
                    setValue={setFozilatResult}
                    options={qawmiResult}
                    required
                  />
                  <Input
                    title="পাসের সন"
                    value={fozilatPassYear}
                    setValue={setFozilatPassYear}
                    type="number"
                    required
                  />
                </>
              ) : maxEdu === 'তাকমীল' ? (
                <>
                  {' '}
                  <Input
                    title="তাকমীল কোন মাদ্রাসা থেকে পড়েছেন? "
                    value={takmilInst}
                    setValue={setTakmilInst}
                    required
                  />
                  <Select
                    title="ফলাফল"
                    value={takmilResult}
                    setValue={setTakmilResult}
                    options={qawmiResult}
                    required
                  />
                  <Input
                    title="পাসের সন"
                    value={takmilPassYear}
                    setValue={setTakmilPassYear}
                    type="number"
                    required
                  />
                </>
              ) : maxEdu === 'তাখাসসুস' ? (
                <>
                  {' '}
                  <Input
                    title="তাকমীল কোন মাদ্রাসা থেকে পড়েছেন? "
                    value={takmilInst}
                    setValue={setTakmilInst}
                    required
                  />
                  <Select
                    title="ফলাফল"
                    value={takmilResult}
                    setValue={setTakmilResult}
                    options={qawmiResult}
                    required
                  />
                  <Input
                    title="পাসের সন"
                    value={takmilPassYear}
                    setValue={setTakmilPassYear}
                    type="number"
                    required
                  />
                  <Input
                    title="তাখাসসুস কোন মাদ্রাসা থেকে পড়েছেন? "
                    value={takhassusInst}
                    setValue={setTakhassusInst}
                    required
                  />
                  <Input
                    title=" তাখাসসুসের বিষয়"
                    value={takhassusSub}
                    setValue={setTakhassusSub}
                    required
                  />
                  <Select
                    title="ফলাফল"
                    value={takhassusResult}
                    setValue={setTakhassusResult}
                    options={qawmiResult}
                    required
                  />
                  <Input
                    title="পাসের সন"
                    value={takhassusPassYear}
                    setValue={setTakhassusPassYear}
                    type="number"
                    required
                  />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          <Textarea
            title="অন্যান্য শিক্ষাগত যোগ্যতা"
            value={othersEdu}
            setValue={setOthersEdu}
          />
          {/* <Select
				title="দ্বীনি শিক্ষাগত পদ্ববীসমূহ"
				value={status}
				setValue={setStatus}
				options={deenStatusOptions}
			/> */}
          {showDeeni && (
            <MultipleSelect
              title="দ্বীনি শিক্ষাগত পদ্ববীসমূহ"
              options={deenStatusOptions}
              value={status}
              setValue={setStatus}
              classes="z-10"
              closeMenuOnSelect={true}
            />
          )}

          <div className="flex items-center justify-between my-5">
            <button
              type="button"
              onClick={backButtonHandler}
              className="px-5 py-2 text-xl text-white bg-gray-700 rounded-3xl"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xl text-white rounded-3xl"
              style={{
                background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
              }}
            >
              {loading ? <LoadingCircle /> : 'Save & Next'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EducationalQualificationForm;
