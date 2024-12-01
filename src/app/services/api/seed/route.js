import { connectDB } from "@/lib/connectDB"
import { services } from "@/lib/services";

export const GET = async () => {
  const db = await connectDB();
  const servicesCollection = db.collection('services')
  try{
    await servicesCollection.deleteMany();
    const res = await servicesCollection.insertMany(services);
    return NextResponse.json({message: 'Services inserted'})
  }
  catch (err) {
    return NextResponse.json({ message: 'There is a Error Here' })
  }
}