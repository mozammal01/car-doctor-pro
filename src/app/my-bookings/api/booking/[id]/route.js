import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {

  console.log(params);
  const db = await connectDB();
  const bookingsCollection = db.collection('bookings')
  try {
    const res = await bookingsCollection.findOne({ _id: new ObjectId(params.id) })
    return Response.json({ res })
  }
  catch (err) {
    console.log(err);
  }
}


export const PATCH = async (request, { params }) => {

  const bookingData = request.json();
  const db = await connectDB();
  const bookingsCollection = db.collection('bookings')

  try {
    console.log("Data inside patch", bookingData);
    // console.log("Id inside patch", params.id);

    const res = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          phone: bookingData?.phone,
          message: bookingData?.message
        }
      },
      { upsert: true })
    return Response.json({ res })
  }
  catch (err) {
    return Response.json({ message: 'Error From patch' })
  }
}


export const DELETE = async (request, { params }) => {

  console.log(params);
  const db = await connectDB();
  const bookingsCollection = db.collection('bookings')
  try {
    const res = await bookingsCollection.deleteOne({ _id: new ObjectId(params.id) })
    return Response.json({ res })
  }
  catch (err) {
    console.log(err);
  }
}