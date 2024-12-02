'use client'
import { getServicesDetails } from "@/services/getServices";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// export const metadata = {
//   title: "Checkout",
//   description: "Checkout form"
// }

const Checkout = ({ params }) => {
  const [service, setService] = useState({})
  const { data } = useSession();

  const loadData = async () => {
    const serviceDetails = await getServicesDetails(params?.id)
    setService(serviceDetails.service)
  }

  const { _id, title, price } = service;


  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target;
    const newBookings = {
      name: data?.user?.name,
      email: data?.user?.email,
      price: form?.price?.value,
      phone: form?.phone?.value,
      message: form?.message?.value,
      serviceTitle: title,
    }

    const res = await axios.post('https://car-doctor-pro-phi.vercel.app/checkout/api/new-booking', newBookings)
    if (res.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    }

    console.log('Response', res.data);
    console.log('form', newBookings);
  }

  useEffect(() => {
    loadData();
  }, [params])

  return (
    <div className="my-20 text-center">

      <p className="my-10 text-4xl font-bold">Checkout page : {title}</p>



      {/* Form */}
      <div className="card bg-base-300 shadow-2xl my-10 w-[1140]">
        <form onSubmit={handleSubmit} className="card-body">

          <div className="flex gap-5">

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input defaultValue={data?.user?.name} name="name" type="text" placeholder="Name" className="input input-bordered w-full" required />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Price</span>
              </label>
              <input value={price} name="price" type="number" placeholder="Price" className="input input-bordered" />
            </div>
          </div>

          <div className="flex gap-5">

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Phone</span>
              </label>
              <input name="phone" type="number" placeholder="Phone Number" className="input input-bordered w-full" required />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input defaultValue={data?.user?.email} name="email" type="email" placeholder="Enter Email" className="input input-bordered" required />
            </div>
          </div>

          <div className="form-control w-full mt-10">
            <textarea name="message" className="textarea textarea-bordered pb-20" placeholder="Your Message"></textarea>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Submit</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Checkout;