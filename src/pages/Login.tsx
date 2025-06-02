import * as React from "react";
import Header from "../components/Login/Header";
import ContainerForm from "../components/Login/ContainerForm";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = React.useCallback(() => {
    if (onLogin) onLogin();
    navigate("/wall");
  }, [onLogin, navigate]);

  return (
    <div>
      <Header onLogin={handleLogin} />
      <ContainerForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
