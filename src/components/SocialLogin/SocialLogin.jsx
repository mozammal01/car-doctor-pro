'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = (props) => {

  const router = useRouter();


  const searchParams = use(props.searchParams)
  const path = searchParams.redirect


  const session = useSession();

  const handleSocialLogin = (provider) => {
    const res = signIn(provider, {
      redirect: true,
      callbackUrl: path ? path : '/'
    })
  }

  if (session.status === 'authenticated') {
    router.push('/')
  }

  return (
    <div className="flex justify-center gap-10 mb-4 text-3xl">

      <button onClick={() => handleSocialLogin('google')}>
        <FcGoogle />
      </button>

      <button onClick={() => handleSocialLogin('github')}>
        <FaGithub />
      </button>

      <button onClick={() => handleSocialLogin('google')}>
        <FaFacebook />
      </button>
    </div>
  );

};

export default SocialLogin;