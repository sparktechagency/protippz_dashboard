import { useUser } from '../Context/UserContext';

export const useUserProfile = () => {
  const { user, loading, updateUser, refetchUser, isAuthenticated } = useUser();
  
  return {
    user,
    loading,
    isAuthenticated,
    updateUser,
    refetchUser,
  };
};
