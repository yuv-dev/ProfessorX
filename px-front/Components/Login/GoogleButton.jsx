import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const GoogleLoginButton = () => {

  const { login } = useContext(AuthContext);

  return (
    <GoogleLogin
      onSuccess={login}
      onError={() => console.error("Login failed:")}
    />
  );
};

export default GoogleLoginButton;
