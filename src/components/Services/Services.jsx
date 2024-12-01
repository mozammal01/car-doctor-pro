import { getServices } from "@/services/getServices";
import ServiceCard from "../cards/ServiceCard";
import SectionTitle from "../SectionTitle/SectionTitle";

const Services = async () => {

  const data = await getServices();
  const services = data.services
  console.log("services:", data);

  // console.log('services', services);

  return (
    <div>

      <div>
        <SectionTitle subHeader='Service' header='Our service area' description='the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.' />
      </div>
      <div className="grid grid-cols-3 gap-6 my-10">
        {
          services.length > 0 && services.map(service => <ServiceCard key={service._id} service={service} />)
        }
      </div>
    </div>
  );
};

export default Services;