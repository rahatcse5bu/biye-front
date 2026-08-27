import {
  CheckBadgeIcon,
  HeartIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { BioDataServices } from '../../../services/bioData';
import { useQuery } from '@tanstack/react-query';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';

const useBioStats = () =>
  useQuery({
    queryKey: ['bio-all-stats'],
    queryFn: async () => {
      const response = await BioDataServices.getAllBioDataStats();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

const formatNumber = (value) =>
  new Intl.NumberFormat('bn-BD').format(value || 0);

const StatCard = ({ value, label, icon: Icon }) => (
  <article className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center sm:p-5">
    <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
    <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">
      {formatNumber(value)}
    </p>
    <h3 className="mt-1 text-sm leading-6 text-white/75 sm:text-base">
      {label}
    </h3>
  </article>
);

const BioStats = () => {
  const { data: biosStats, isLoading, error } = useBioStats();
  const totalBios = (biosStats?.পুরুষ || 0) + (biosStats?.মহিলা || 0);

  return (
    <section
      className="rounded-3xl bg-brand-900 px-4 py-8 sm:px-7 sm:py-10"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold text-white/70">এক নজরে বিয়ে</p>
        <h2
          id="stats-heading"
          className="mt-2 text-2xl font-bold text-white sm:text-3xl"
        >
          আমাদের কমিউনিটি প্রতিদিন এগিয়ে যাচ্ছে
        </h2>
      </div>

      {error ? (
        <p className="mt-8 rounded-xl bg-white/10 p-4 text-center text-white">
          পরিসংখ্যান এখন দেখানো যাচ্ছে না। পরে আবার চেষ্টা করুন।
        </p>
      ) : isLoading ? (
        <LoadingCircle classes="my-10" />
      ) : (
        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <StatCard
            value={totalBios}
            label="সর্বমোট বায়োডাটা"
            icon={UserGroupIcon}
          />
          <StatCard
            value={biosStats?.পুরুষ}
            label="পাত্রের বায়োডাটা"
            icon={UsersIcon}
          />
          <StatCard
            value={biosStats?.মহিলা}
            label="পাত্রীর বায়োডাটা"
            icon={CheckBadgeIcon}
          />
          <StatCard
            value={biosStats?.completedMarriages}
            label="বিয়ে সম্পন্ন হয়েছে"
            icon={HeartIcon}
          />
        </div>
      )}
    </section>
  );
};

export default BioStats;
