import backgroundImage from "../assets/img/book-music-movie.jpg"; 

export const About = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    color: "#fff",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div className="container position-relative text-center py-5">
        <h1 className="display-4 fw-bold mb-4">About WireFrames</h1>
        <p className="lead px-3 px-md-5">
          Welcome to <strong>WireFrames</strong>, your personalized 
          recommendation hub.  
          Through a simple form where you share your tastes and current mood—
          whether you are <strong>bored, happy, sad, or looking for self-improvement</strong>—
          we will suggest the best <strong>music to listen to</strong>, 
          <strong> series to watch</strong>, and <strong>books to read</strong>.
        </p>
        <p className="lead px-3 px-md-5 mt-3">
          Our mission is to help you discover content that resonates with your 
          current moment and make your day a little more special.
        </p>
        <a href="/formulary" className="btn btn-warning mt-4 fw-bold px-4 py-2">
          Try the Form
        </a>
      </div>
    </div>
  );
};
