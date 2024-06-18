'use client'
import { CHECKUSER } from '@/Graphql/Schema'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
   const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [add_user, { data:LoginUser }] = useMutation(CHECKUSER);
    // console.log(LoginUser, "datahlloo");
    
    const router = useRouter()
    const handleLogin = async () => {
           if (!Email || !Password) {
             return alert("Fill all Fields");
           }
        try {
            const { data }: any = await add_user({
              variables: {
                createUserInput: { Email, Password },
              },
            });
            if (data?.LoginUser?.status == 200) {
              if (data?.LoginUser?.token) {
                localStorage.setItem("token", data.LoginUser.token);
                }
            setEmail("");
              setPassword("");
                 
              alert(data.LoginUser.message);
              router.push("/");
              return;
            }
            alert(data.LoginUser.message);
        } catch (error) {
            console.log(error);   
        }
    }
  return (
    <div>
      <input
        type="emil"
        className="text-black" required
        onChange={(e) => setEmail(e.target.value)}
        value={Email}
      />
      <br />
      <input
        type="text"
        className="mt-5 text-black" required
        onChange={(e) => setPassword(e.target.value)}
        value={Password}
      />
      <button onClick={()=>handleLogin()}>Login</button>
    </div>
  );
}

export default Login
