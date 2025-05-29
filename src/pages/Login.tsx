import * as React from "react";
import Header from "../components/Login/Header";
import ContainerForm from "../components/Login/ContainerForm";

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div>
      <Header onLogin={onLogin} />
      <ContainerForm onLogin={onLogin} />
    </div>
  );
};

export default Login;
