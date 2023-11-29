import { Navigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { user } = useStore();
  return user.id ? <>{children}</> : <Navigate to="/login" />;
}
