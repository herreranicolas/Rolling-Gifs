const Navbar = () => {
  return (
    <header className="py-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <i className="bi bi-filetype-gif text-warning fs-3"></i>
          </a>

          <ul className="nav">
            <li>
              <a href="/" className="nav-link px-2 text-light">
                Rolling GIFs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
