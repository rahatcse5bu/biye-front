import React from 'react';
import { Colors } from '../../../constants/colors';
import { BioDataServices } from '../../../services/bioData';
import { useQuery } from '@tanstack/react-query';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';

// Custom Hook for fetching BioData Stats
const useBioStats = () => {
  return useQuery({
    queryKey: ['bio-all-stats'],
    queryFn: async () => {
      try {
        const response = await BioDataServices.getAllBioDataStats();
        return response.data;
      } catch (error) {
        throw new Error('Error fetching biodata stats');
      }
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};

const StatCard = ({ value, label }) => (
  <div className="p-4 py-12 m-2 bg-white border border-blue-500 shadow-xl stat-card rounded-xl">
    <h1 className="text-3xl font-semibold text-center">{value}</h1>
    <h3 className="text-xl text-center">{label}</h3>
  </div>
);

const BioStats = () => {
  const { data: biosStats, isLoading, error } = useBioStats();

  if (error) {
    return <div className="text-center text-red-500">Failed to load data</div>;
  }

  const totalBios = (biosStats?.পুরুষ || 0) + (biosStats?.মহিলা || 0);

  return (
    <div>
      <h2
        className="mt-8 mb-2 text-xl font-bold text-center md:text-2xl lg:text-4xl text-uppercase"
        style={{
          color: Colors.titleText,
        }}
      >
        এক নজরে আমাদের সাইটঃ
      </h2>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <div className="grid grid-cols-1 py-5 md:grid-cols-2 lg:grid-cols-4">
          <StatCard value={totalBios} label="সর্বমোট বায়োডাটা" />
          <StatCard
            value={biosStats?.পুরুষ || 0}
            label="সর্বমোট পাত্রের বায়োডাটা"
          />
          <StatCard
            value={biosStats?.মহিলা || 0}
            label="সর্বমোট পাত্রীর বায়োডাটা"
          />
          <StatCard
            value={biosStats?.completedMarriages || 0}
            label="বিয়ে সম্পন্ন হয়েছে"
          />
        </div>
      )}
    </div>
  );
};

export default BioStats;
