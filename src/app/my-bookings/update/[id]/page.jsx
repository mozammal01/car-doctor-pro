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

const UpdateBooking = ({ params }) => {
  const [service, setService] = useState({})
  const { data } = useSession();

  useEffect(() => {
    axios.get(`http://localhost:3000/my-bookings/api/booking/${params.id}`)
      .then(data => setService(data.data.res))
  }, [params])


  const { _id, name, email, serviceTitle, price, phone, message } = service;

  console.log(service);

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target;
    const newBookings = {
      name,
      email,
      price,
      serviceTitle,
      phone: form?.phone?.value,
      message: form?.message?.value,
    }

    console.log('form', newBookings);
    const res = await axios.patch(`http://localhost:3000/my-bookings/api/booking/${_id}`, newBookings)
    if (res?.data?.res?.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: 'Updated Successfull',
        showConfirmButton: false,
        timer: 1500
      });
    }

    console.log('Response', res.data.res);
  }

  // useEffect(() => {
  //   loadData();
  // }, [params])

  return (
    <div className="my-20 text-center">

      <p className="my-10 text-4xl font-bold">Update page : {serviceTitle}</p>



      {/* Form */}
      <div className="card bg-base-300 shadow-2xl my-10 w-[1140]">
        <form onSubmit={handleSubmit} className="card-body">

          <div className="flex gap-5">

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input value={data?.user?.name} name="name" type="text" placeholder="Name" className="input input-bordered w-full" required />
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
              <input name="phone" defaultValue={phone} type="number" placeholder="Phone Number" className="input input-bordered w-full" required />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input value={data?.user?.email} name="email" type="email" placeholder="Enter Email" className="input input-bordered" required />
            </div>
          </div>

          <div className="form-control w-full mt-10">
            <textarea defaultValue={message} name="message" className="textarea textarea-bordered pb-20" placeholder="Your Message"></textarea>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Submit</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default UpdateBooking;