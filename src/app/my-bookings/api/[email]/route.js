import { connectDB } from "@/lib/connectDB"

export const GET = async (request, { params }) => {

  console.log(params);
  const db = await connectDB();
  const bookingsCollection = db.collection('bookings')
  try {
    const booking = await bookingsCollection.find({ email: params.email }).toArray();
    return Response.json({ booking })
  }
  catch (err) {
    console.log(err);
  }
}