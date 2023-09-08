
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/signup" />;
  }
  return children;
};
export default ProtectedRoute;
