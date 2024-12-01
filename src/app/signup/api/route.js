import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const usersCollection = await db.collection("users")
    const exist = await usersCollection.findOne({ email: newUser?.email })
    if (exist) {
      return Response.json({ message: 'User Exist' }, { status: 304 })
    }

    const hashedPassword = bcrypt.hashSync(newUser?.password, 14);

    const res = await usersCollection.insertOne({ ...newUser, password: hashedPassword });
    return Response.json({ message: 'User Inserted' }, { status: 200 })
  }
  catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Here', error }, { status: 400 })
  }
}