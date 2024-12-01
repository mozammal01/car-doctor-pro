import Services from "../Services/Services";
import About from "./About/About";
import Banner from "./Banner/Banner";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <About />
      <Services></Services>
    </div>
  );
};

export default Homepage;