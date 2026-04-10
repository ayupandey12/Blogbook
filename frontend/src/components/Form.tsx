import { useContext, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type {Signuptype} from "@ayushdevinfer1/medium-common"
import axios from "axios"
import { baseurl } from "../../config";
import { Auth } from "../context/context";
import { motion } from "framer-motion";

export const Form=({type}:{type:"signin"|"signup"})=>{
  const {setloggedin}=useContext(Auth)
    const navigate =useNavigate();
    const [error,seterror]=useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [postbody , setpostbody]=useState<Signuptype>({
           name:"",
           email:"",
           password:""
    })
    async function submitform(){
           try {
          if(type==='signup')
          {
              if(!postbody.name){
                seterror("name is required!");
                return;
            }
            if(postbody.name?.length<=4)
            {
                seterror("name length should be greater than 4");
                return;
            }
           for (const e of postbody.name) {
              if(e>='a'&&e<='z'||e>='A'&&e<='Z'||e>='0'&&e<='9') continue;
              else {
                seterror("name should not contain special characters")
                return;
              }
           }
          }
            setIsLoading(true)
            const response=await axios.post(`${baseurl}/api/v1/user/${type==="signin"?"signin":"signup"}`,postbody
           );
          const jwt = `Bearer ${response.data.token}`;
           localStorage.setItem("token",jwt);
           setloggedin(true);
            navigate('/blogs');
           } catch (e:any) {
            seterror(e.response.data.message);
            setIsLoading(false)
           }
    }
    return (
      <div className="min-h-screen w-full bg-[#efede7] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="rounded-[32px] border border-[#d7cab2] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="font-[Cinzel] text-3xl font-semibold uppercase tracking-tight text-[#1c1814]">
                {type === 'signup' ? 'Join BlogBook' : 'Welcome Back'}
              </h1>
              <p className="mt-2 text-sm text-[#6a5c48]">
                {type === 'signup'
                  ? 'Create your account and start publishing'
                  : 'Sign in to your account'}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              {type === "signup" && (
                <div>
                  {inputbox({
                    label: "Full Name",
                    placeholder: "John Doe",
                    onchange: (e) => setpostbody({ ...postbody, name: e.target.value }),
                    text: "text"
                  })}
                </div>
              )}
              <div>
                {inputbox({
                  label: "Email Address",
                  placeholder: "your@email.com",
                  onchange: (e) => setpostbody({ ...postbody, email: e.target.value }),
                  text: "email"
                })}
              </div>
              <div>
                {inputbox({
                  label: "Password",
                  placeholder: "••••••••",
                  onchange: (e) => setpostbody({ ...postbody, password: e.target.value }),
                  text: "password"
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-2xl border border-[#d97476] bg-[#f9eeee] px-4 py-3 text-sm text-[#a94549]">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={submitform}
              disabled={isLoading}
              className="w-full rounded-full bg-[#1c1814] px-6 py-3 font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#1c1814]/20 transition hover:bg-[#2f2b28] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (type === 'signup' ? 'Creating...' : 'Signing in...') : (type === 'signup' ? 'Create Account' : 'Sign In')}
            </button>

            {/* Toggle Link */}
            <div className="mt-6 text-center text-sm text-[#6a5c48]">
              {type === 'signup' ? "Already have an account? " : "Don't have an account? "}
              <Link
                to={`/${type === 'signup' ? 'signin' : 'signup'}`}
                className="font-semibold text-[#1c1814] transition hover:text-[#4a3f35]"
              >
                {type === 'signup' ? 'Sign In' : 'Create one'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
}

interface inputboxtype{
    label:string;
    placeholder :string;
    onchange: (e:ChangeEvent<HTMLInputElement>)=>void;
    text?: string;
 }

function inputbox({label,placeholder,onchange,text}:inputboxtype) {
    return (
      <div>
        <label className="block mb-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#4a3f35]">
          {label}
        </label>
        <input
          type={text}
          onChange={onchange}
          className="w-full rounded-lg border border-[#d7cab2] bg-[#faf8f5] px-4 py-3 text-sm text-[#1c1814] placeholder:text-[#9d8b72] transition focus:border-[#b5a391] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d7cab2]/50"
          placeholder={placeholder}
          required
        />
      </div>
    )
}