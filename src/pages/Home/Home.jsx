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
import AboutFeature from '../../components/Home/AboutFeature/AboutFeature';
import { getReligionInfo } from '../../utils/localStorage';
import { getContentForReligion } from '../../constants/religionContent';

const Home = () => {
  const { religion } = getReligionInfo();
  const content = getContentForReligion(religion);

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
      <HomeBanner content={content.banner} />
      <IslamicQuote content={content.quote} />
      <AboutFeature />
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
        {content.heading}
      </h2>

      <HadithSlider slides={content.slides} />
      <BioStats />
    </div>
  );
};

export default Home;
