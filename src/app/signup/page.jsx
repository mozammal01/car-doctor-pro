'use client'
import SocialLogin from "@/components/SocialLogin/SocialLogin";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import Swal from "sweetalert2";
import loginImg from "../../../public/assets/images/login/login.svg";

const SignUpPage = (props) => {
  const searchParams = use(props.searchParams)
  const path = searchParams.redirect

  const handleSubmit = async e => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    const newUser = {
      name,
      email,
      password
    }
    console.log(newUser);

    const res = await axios.post('http://localhost:3000/signup/api', newUser)
    if (res.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign Up Successfull",
        showConfirmButton: false,
        timer: 1500
      });
      router.push('/')
    }
    console.log(res.data);
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content gap-40">
        <Image src={loginImg} width={500} height={500} alt="loginImg" />
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-10">
          <h2 className="text-4xl font-bold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="card-body">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
            </div>
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
              <button className="btn btn-primary text-white">Sign UP</button>
            </div>
          </form>
          <div className="text-center">
            <p>Or Sign Up With </p>
            <br />
            <SocialLogin path={path} />
          </div>
          <p className="text-center">Do Not have an account ? <Link href='/signin'><span className="text-blue-700 underline font-bold">Sign In</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;