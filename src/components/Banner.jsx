const Banner = ({ title, description }) => {
  return (
    <section className="py-3 py-md-5 text-center container text-white">
      <div className="row">
        <div className="mx-auto">
          <h1 className="display-3 text-warning">{title}</h1>
          <p className="lead text-white">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
