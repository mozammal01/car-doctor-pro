const Banner = () => {

  const banners = [
    // 1
    {
      text: 'Affordable Price For Car Servicing',
      description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
      next: 'slide2',
      prev: 'slide4'
    },
    // 2
    {
      text: 'Affordable Price For Car Servicing',
      description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
      next: 'slide3',
      prev: 'slide1'
    },
    // 3
    {
      text: 'Affordable Price For Car Servicing',
      description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
      next: 'slide4',
      prev: 'slide2'
    },
    // 4
    {
      text: 'Affordable Price For Car Servicing',
      description: 'There are many variations of passages of  available, but the majority have suffered alteration in some form',
      next: 'slide1',
      prev: 'slide3'
    },
  ]

  return (
    <div className="carousel w-full mb-20">
      {
        banners.map((banner, i) =>
          <div
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(7,25,82,0.7), rgba(0,0,0,0.3)), url(/assets/images/banner/${i + 1}.jpg)`
            }}
            key={i}
            id={`slide${i + 1}`}
            className="carousel-item relative w-full h-[90vh] bg-top bg-no-repeat bg-cover rounded-xl"
          >
            <div className="h-full w-full flex items-center container pl-20">
              <div className="text-white space-y-5 flex flex-col items-start">
              <h2 className="text-5xl font-bold">{banner.text}</h2>
              <p className="text-xl">{banner.description}</p>
              <div className="flex gap-3">
              <button className="btn btn-primary text-white">Discover More</button>
              <button className="btn btn-outline text-white hover:bg-primary hover:border-none">Latest Project</button>
              </div>
              </div>
            </div>
            <div className="absolute right-12 bottom-12 flex justify-between gap-5">
              <a href={`#${banner.prev}`} className="btn btn-circle hover:bg-primary hover:text-white hover:border-none">❮</a>
              <a href={`#${banner.next}`} className="btn btn-circle btn-primary text-white hover:bg-white hover:text-black hover:border-none">❯</a>
            </div>
          </div>)
      }
    </div>
  );
};

export default Banner;