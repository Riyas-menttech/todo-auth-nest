'use client'
import { REGISTERUSER } from '@/Graphql/Schema'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Signup = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [loginUser] = useMutation(REGISTERUSER);
      const router = useRouter();
  const handleRegister = async (e: any) => {
    e.preventDefault()
    if (!Email || !Password) {
      return alert('Fill all Fields')
    }
    try {
      const { data }: any = await loginUser({
        variables: {
          createUserInput: { Email, Password },
        },
      });
      if (data?.SignupUser?.status == 200) {
        setEmail('')
        setPassword('')
        alert(data.SignupUser.message);
        router.push("/Login");
        return;
      }
      alert(data.SignupUser.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form >
        <input
          type="email"
          className="text-black"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
        />
        <br />
        <input
          type="text"
          className="mt-5 text-black"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
        />
        <button onClick={(e) => handleRegister(e)}>Register</button>
      </form>
    </div>
  );
}

export default Signup
