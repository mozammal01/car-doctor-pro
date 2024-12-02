'use client'

import Link from "next/link";
import loginImg from "../../../public/assets/images/login/login.svg";
import { signIn } from 'next-auth/react'
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "@/components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const SignIn = () => {

  const router = useRouter();

  const searchParams = useSearchParams();
  const path = searchParams.get('redirect')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: path ? path : '/'
    })
    console.log(res);
    if (res.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfull",
        showConfirmButton: false,
        timer: 1500
      });
      router.push('/')
    }
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content gap-40">
        <Image src={loginImg} width={500} height={500} alt="loginImg" />
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-10">
          <h2 className="text-4xl font-bold text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="card-body">

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white">Sign In</button>
            </div>
          </form>
          <div className="text-center">
            <p>Or Sign Up With </p>
            <br />
            <SocialLogin />
          </div>
          <p className="text-center">Do Not have an account ? <Link href='/signup'><span className="text-blue-700 underline font-bold">Sign Up</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;