import Image from "next/image";

const About = () => {
  return (
    <div className="my-20">

      <div>

        <div className="grid grid-cols-2">

          <div>
            <Image className="relative" alt="person" src='/assets/images/about_us/person.jpg' width={500} height={450} />
            <Image className="absolute left-80 -mt-40 border-8 border-white" alt="parts" src='/assets/images/about_us/parts.jpg' width={300} height={280} />
          </div>

          <div className="space-y-5">
            <p className="text-primary font-bold">About Us</p>
            <h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. </p>
            <p>the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. </p>
            <button className="btn btn-primary text-white">Get more Info</button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default About;