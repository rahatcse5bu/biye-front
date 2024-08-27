import { Button } from '@material-tailwind/react';
import { Colors } from '../../constants/colors';
import { AiOutlineDelete, AiOutlineSearch } from 'react-icons/ai';
import { useBio } from '../../contexts/useBio';
import { useNavigate } from 'react-router-dom';
import { convertToQuery } from '../../utils/query';
import { useFilter } from '../../contexts/useFilter';

const BioDataButton = () => {
  const { filterFields, setQuery } = useBio();
  const { setSideBarDisplay, setAddressFilterOpen, setPrimaryFilterOpen } =
    useFilter();
  const navigate = useNavigate();
  const buttonHandler = async (type) => {
    // console.log('type~', type);
    // console.log("filterFields~", filterFields);

    if (type === 'search') {
      setQuery((prev) => {
        return {
          ...prev,
          ...filterFields,
        };
      });
      const temp = convertToQuery(filterFields);
      navigate(`/biodatas?${temp}`);
    } else if (type === 'delete') {
      setQuery({});
      navigate('/biodatas');
    }
    setSideBarDisplay(false);
    setAddressFilterOpen(true);
    setPrimaryFilterOpen(true);
  };
  return (
    <div className="flex items-center justify-between my-10 ">
    
      <Button
        style={{
          background: `#c41010`,
        }}
        className="flex items-center px-5"
        onClick={() => buttonHandler('delete')}
      >
        <AiOutlineDelete className="w-4 h-6" />
        ক্লিয়ার
      </Button>
      <Button
        className="flex items-center px-5"
        style={{
          background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
        }}
        onClick={() => buttonHandler('search')}
      >
        <AiOutlineSearch className="w-4 h-6" />
        বায়োডাটা খুজুন
      </Button>
    </div>
  );
};

export default BioDataButton;
