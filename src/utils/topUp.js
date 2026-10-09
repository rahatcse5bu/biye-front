import { useQuery } from '@tanstack/react-query';
import { pointsPackageService } from '../services/pointsPackages';

// TODO: same fallback as the backend default rate, used until the admin rate loads.
const DEFAULT_POINTS_PER_TAKA = 1.2;

// TODO: the admin's points-per-taka rate; the backend credits purchase top-ups at exactly this rate.
export const useTopUpRate = () => {
  const { data } = useQuery({
    queryKey: ['points-packages', 'custom-settings'],
    queryFn: pointsPackageService.customSettings,
    staleTime: 60_000,
  });
  const rate = Number(data?.points_per_taka);
  return rate > 0 ? rate : DEFAULT_POINTS_PER_TAKA;
};

// TODO: whole taka rounded up, so the points credited are never less than the points missing.
export const takaForPoints = (points, rate) =>
  Math.max(1, Math.ceil(points / rate - 1e-9));
