import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const booking = await request.json();
  const db = await connectDB();
  const bookingsCollection = db.collection('bookings')
  try {
    const res = await bookingsCollection.insertOne(booking);
    return Response.json({ message: 'booked' }, { status: 200 })
  }
  catch (err) {
    return Response.json({ message: 'Something Went Wrong' }, { status: 400 })
  }
}