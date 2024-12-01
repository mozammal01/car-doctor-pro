import Image from 'next/image';
import Link from 'next/link';

const ServiceCard = ({ service }) => {
  
  const { title, img, price, description, _id } = service;
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl my-2">
      <figure>
        <Image
          src={img}
          alt="Shoes" width={350} height={200} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-between items-center">
          <h6 className="text-primary font-bold">Price: ${price}</h6>
          <Link href={`/services/${_id}`}><button className="btn btn-primary text-white">View Details</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;