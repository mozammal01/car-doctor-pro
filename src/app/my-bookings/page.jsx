'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [bookings, setBookings] = useState([])

  const session = useSession();

  useEffect(() => {
    axios.get(`http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`)
      .then(data => setBookings(data.data.booking))
      .catch(err => console.log(err)
      )
  }, [session])

  const handleDelete = async (id) => {
    console.log('Deleted Id', id);
    const res = await axios.delete(`http://localhost:3000/my-bookings/api/booking/${id}`)
    console.log(res.data);
    // const deleted = res.datajson();
    console.log(res.data.res.deletedCount);
    if (res.data.res.deletedCount > 0) {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios.get(`http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`)
              .then(data => setBookings(data.data.booking))
              .catch(err => console.log(err))
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been deleted.",
              icon: "success"
            });
          }
        });


    }
  }

  const handleUpdate = async (id) => {
    console.log(id);
    const res = await axios.get(`http://localhost:3000/my-bookings/api/booking/${id}`)
    // console.log(res.data);
  }
  // console.log(bookings);

  return (
    <div className="my-10">
      <h2 className="text-5xl text-center font-bold text-red-500">My Bookings : {bookings?.length}</h2>

      {/* Table */}
      <div className="overflow-x-auto w-full my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              bookings.map((booking, i) =>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{booking.serviceTitle}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.price}</td>
                  <td>
                    <div className="flex items-center gap-5">
                      <Link href={`/my-bookings/update/${booking._id}`}><button onClick={() => handleUpdate(booking._id)} className="btn btn-warning text-white">Edit</button></Link>
                      <button onClick={() => handleDelete(booking._id)} className="btn btn-error text-white">Delete</button>
                    </div>
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MyBookings;