import { createContext, useContext, useEffect } from "react";
import { useGetProfileQuery } from "../Redux/Apis/authApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const {
    data: userData,
    isLoading,
    isFetching,
    refetch,
  } = useGetProfileQuery();
  const user = userData?.data;
  const loading = isLoading || isFetching;

  // Function to refetch user data
  const refetchUser = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Failed to refetch user data", error);
      throw error;
    }
  };

  // Persist user data to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refetchUser,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
