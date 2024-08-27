import '../../assets/styles/home.css';
import { Colors } from '../../constants/colors';
import FeaturedBioDataGrid from '../../components/FeaturedBioDataGrid/FeaturedBioDataGrid';
import HadithSlider from '../../components/HadithSlider/HadithSlider';

import '../../fonts/fonts.css';
import { useQuery } from '@tanstack/react-query';
import { GeneralInfoServices } from '../../services/generalInfo';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import BioStats from '../../components/Home/BioStats/BioStats';
import Advertisement from '../../components/Home/Advertisement/Advertisement';
import IslamicQuote from '../../components/Home/IslamicQuote/IslamicQuote';
import HomeBanner from '../../components/Home/HomeBanner/HomeBanner';
import HomeFilter from '../../components/Home/HomeFilter/HomeFilter';

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['general-info', 'featured'],
    queryFn: async () =>
      GeneralInfoServices.getALLGeneralInfo({ isFeatured: true }),
  });

  const colors = {
    lnLeft: Colors.lnLeft,
    lnRight: Colors.lnRight,
  };

  return (
    <div className="px-2 lg:px-10">
      <HomeBanner />
      <IslamicQuote />
      <Advertisement colors={colors} />

      <HomeFilter />

      <div className="mt-5">
        {isLoading ? (
          <LoadingCircle classes="my-5" />
        ) : (
          <FeaturedBioDataGrid data={data?.data || []} />
        )}
      </div>

      <h2 className="my-4 text-xl text-center text-blue-700 md:text-2xl lg:text-4xl">
        বিয়ে সম্পর্কিত কুরআনের কিছু আয়াত ও কিছু হাদিসঃ
      </h2>

      <HadithSlider />
      <BioStats />
    </div>
  );
};

export default Home;
