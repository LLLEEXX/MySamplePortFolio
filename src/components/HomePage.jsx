import { useInView } from "react-intersection-observer";
import { smoothScroll } from "./Script";
import { Tools } from "./Tools";
import { Skills } from "./Skills";
import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [navLinkText, setNavLinkText] = useState("Programming Langauges");

  const { ref: contactRef, inView: contactVisible } = useInView({
    threshold: 0.5,
  });
  const { ref: homeRef, inView: homeVisible } = useInView({
    threshold: 0.5,
  });
  const { ref: aboutRef, inView: aboutVisible } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const updateNavLinkText = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 417) {
        setNavLinkText("Prog. Lang.");
      } else if (screenWidth <= 580) {
        setNavLinkText("Prog. Languages");
      } else {
        setNavLinkText("Programming Languages");
      }
    };

    updateNavLinkText();

    window.addEventListener("resize", updateNavLinkText);

    return () => {
      window.removeEventListener("resize", updateNavLinkText);
    };
  }, []);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (commentText) {
      const newComment = { commentText };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  const handleRemove = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  return (
    <>
      {/* HEADER*/}
      <header>
        <section className="header-container">
          <h1 onClick={() => window.location.reload()}>SamplePort.</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <a
                  onClick={() => smoothScroll("home")}
                  className={homeVisible ? "active" : ""}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => smoothScroll("about")}
                  className={aboutVisible ? "active" : ""}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  onClick={() => smoothScroll("contact")}
                  className={contactVisible ? "active" : ""}
                >
                  Comment
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </header>

      {/* HOME SECTION*/}
      <main>
        <section id="home" ref={homeRef} className="homeCont">
          <section className="imgCont">
            <img
              className="myImg"
              src="./src/assets/ItsMe.jpg"
              alt="MyPicture"
            />
          </section>
          <section className="introDiv">
            <p>Hello I'am</p>
            <p>Lexter Cabarse</p>
            <p>Web Developer</p>
          </section>
        </section>

        {/* ABOUT SECTION*/}
        <section id="about" ref={aboutRef} className="aboutCon">
          <section className="aboutCol">
            <p>About Me</p>
            <p>
              Hello! I am a recent IT graduate who is passionate about web
              programming and wants to constantly improve my skills in the
              constantly evolving tech landscape. My programming journey has
              been a fascinating adventure, and I am particularly drawn to web
              development. My current objectives revolve around exploring deeper
              into various web programming frameworks and honing my coding
              skills. I enjoy the process of learning. As I embark on this
              exciting career path, I would appreciate any insights and comments
              that can help me grow.
            </p>
          </section>
          <section className="aboutCol">
            <nav className="skillsNavBar">
              <p>Skills</p>
              <NavLink to="/">{navLinkText}</NavLink>
              <NavLink to="/tools">Tools</NavLink>
            </nav>
            <Routes>
              <Route path="./" element={<Skills />} />
              <Route path="./tools" element={<Tools />} />
            </Routes>
            {/* INCLUDE THE LINKS HERE */}
          </section>
        </section>

        {/* CONTACT SECTION*/}
        <section id="contact" ref={contactRef} className="contactCon">
          <section className="contactForm">
            <label htmlFor="fromWho" className="labelText">
              From:
            </label>
            <input
              type="text"
              name="fromWho"
              className="fromWho"
              id="fromWho"
              defaultValue="Anonymous"
              readOnly
            />

            <textarea
              name="textArea"
              className="textArea"
              placeholder="Leave a comment"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            ></textarea>

            <input
              type="button"
              value="Submit"
              onClick={handleSubmit}
              className="submitText"
            />
          </section>
          <section className="commentSec">
            <h3 className="commentsInst">
              You can leave a comment about my portfolio, and any tips and
              suggestions would be appreciated.
              <span> Your comment will be posted here.</span>
            </h3>
            <section className="commentBody">
              {comments.map((comment, index) => (
                <section key={index} className="comments">
                  <section className="commentHeader">
                    <h3 className="commentName">Anonymous</h3>
                  </section>
                  <section className="commentContent">
                    <p className="commentText">{comment.commentText}</p>
                    <button
                      className="removeBtn"
                      onClick={() => handleRemove(index)}
                    >
                      <span>
                        <img
                          src="../src/assets/trash-can-regular.svg"
                          alt="trash-can"
                        />
                      </span>
                    </button>
                  </section>
                </section>
              ))}
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default Home;
