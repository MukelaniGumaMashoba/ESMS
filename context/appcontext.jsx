import { auth } from "@/firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { use, useEffect} from "react";
import { createContext, useState, useContext } from "react";

export const AppContext = createContext({user: null, loading: true});

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    });

    return (
        <AppContext.Provider value={{ user, loading }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAuth = () => useContext(AppContext);