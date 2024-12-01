import { getServicesDetails } from "@/services/getServices";
import Link from "next/link";

export const metadata = {
  title: "Details",
  description: "Service Details"
}

const ServiceDetails = async ({ params }) => {


  const serviceDetails = await getServicesDetails(params?.id)

  const { _id } = serviceDetails.service;

  return (
    <div className="my-20 text-center">

      <p className="my-10">Heres Your Service Details : {params?.id}</p>

      <Link className="btn btn-primary text-white text-center" href={`/checkout/${_id}`}><button>Check Out</button></Link>

    </div>
  );
};

export default ServiceDetails;