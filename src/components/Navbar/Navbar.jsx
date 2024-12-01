'use client'
import Image from "next/image";
import { IoCart } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


const Navbar = () => {

  const session = useSession();
  console.log(session);

  const navItems = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Services',
      path: '/services'
    },
    {
      title: 'MyBookings',
      path: '/my-bookings'
    },
    {
      title: 'Blog',
      path: '/blog'
    },
    {
      title: 'Contacts',
      path: '/contacts'
    },
  ]
  return (
    <div className="navbar bg-base-100 container mx-auto mb-10 mt-2">
      <div className="navbar-start">
        <Link href='/'>
          <Image src='/assets/logo.svg' height={50} width={60} alt="logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex space-x-5 items-center font-bold">
        {
          navItems.map(item => <Link className="hover:text-primary" key={item.path} href={item.path}>{item.title}</Link>)
        }
      </div>
      <div className="navbar-end">
        <div className="space-x-3 flex items-center">
          <IoCart className="text-2xl" />
          <IoIosSearch className="text-2xl" />
          <a className="btn btn-outline text-primary hover:bg-primary hover:border-none">Appointment</a>
          {
            session?.status === 'loading' ? <p className="btn btn-outline">Loading</p> :
              session?.status === 'authenticated' ? <p onClick={signOut} className="btn btn-outline text-primary">Sign Out</p> :
                <Link href='/signin'><p className="btn btn-primary text-white">Sign In</p></Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;