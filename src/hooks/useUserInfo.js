import { useQuery } from '@tanstack/react-query';
import { userServices } from '../services/user';
import { UserInfoServices } from '../services/userInfo';

export const useUserInfo = (user, token) => {
  const { data, isError, error } = useQuery({
    queryKey: ['user-info', token],
    queryFn: async () => {
      return await UserInfoServices.verifyTokenByUser(token);
    },
    retry: false,
    enabled: !!token,
    refetchInterval: 3600000, // every hour
  });

  const { data: userInfoData, refetch: userInfoRefetch } = useQuery({
    queryKey: ['user-info', user?.email],
    queryFn: async () => {
      return await userServices.getUserInfoByEmail(user?.email);
    },
    retry: false,
    enabled: !!user?.email,
  });

  return { data, isError, error, userInfoData, userInfoRefetch };
};
