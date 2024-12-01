const SectionTitle = ({subHeader, header, description}) => {
  return (
    <div className="text-center my-10 w-3/6 mx-auto space-y-4">
      <span className="text-primary font-bold">{subHeader}</span>
      <h1 className="text-4xl font-bold">{header}</h1>      
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default SectionTitle;