import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebaseConfig";

type AuthContextValue = { 
    user: User | null,
    loading: boolean,
}

type AuthProviderProps = {
    children: React.ReactNode,
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(() => user); // if user is null, then not signed in
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{  user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        console.log("The component is not being placed inside a context");
    }

    return context;
}