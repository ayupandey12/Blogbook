import { Form } from "../components/Form";
import { Bio } from "../components/Bio";
import { useContext, useEffect } from "react";
import { Auth } from "../context/context";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const { loggedin } = useContext(Auth);
  
  useEffect(() => {
    if (loggedin === null) return;
    if (loggedin === true) navigate("/");
  }, [loggedin, navigate])
  
  if (loggedin === null) return null;
  
  return (
    <div className="min-h-screen w-screen grid grid-cols-1 lg:grid-cols-2 items-stretch">
      <div className="flex items-center">
        <Form type="signin" />
      </div>
      <div className="hidden lg:block">
        <Bio />
      </div>
    </div>
  )
}