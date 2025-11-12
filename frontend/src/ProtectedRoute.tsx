import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = {
    path: string,
    children: React.ReactNode,
}

export function ProtectedRoute({ path, children}: ProtectedRouteProps) {
    const { loading, user } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    return user 
        ? <>{children}</>
        : <Navigate to={`${path}`} />
}