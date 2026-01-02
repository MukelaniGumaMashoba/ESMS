import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppContextType {
  user: any;
  loading: boolean;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  loading: true,
});

const AUTH_TOKEN_KEY = "auth_token";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);
  
  useEffect(() => {
    AsyncStorage.getItem(AUTH_TOKEN_KEY).then((storedToken) => {
      setToken(storedToken);
      setLoadingToken(false);
    });
  }, []);

  const user = useQuery(
    api.auth.getCurrentUser,
    token ? { tokenIdentifier: token } : "skip"
  );
  
  const loading = loadingToken || user === undefined;

  return (
    <AppContext.Provider value={{ user, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppAuth = () => useContext(AppContext);

