import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRouters = ({ children }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PrivateRouters;
