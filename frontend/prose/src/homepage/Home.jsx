import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Row, Col } from "react-bootstrap"
import "./Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileWink, faCommentDots, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faAutoprefixer } from "@fortawesome/free-brands-svg-icons";
import { getOpacity } from "./utils";

function Home({ currentUser }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [iconOpacities, setIconOpacities] = useState({
    prefix: 0,
    smile: 0,
    comment: 0,
    wand: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    const updateOpacity = () => {
      const prefixOpacity = getOpacity(1, prefixRef);
      const smileOpacity = getOpacity(2, smileRef);
      const commentOpacity = getOpacity(3, commentRef);
      const wandOpacity = getOpacity(4, wandRef);
      setIconOpacities({
        prefix: prefixOpacity,
        smile: smileOpacity,
        comment: commentOpacity,
        wand: wandOpacity
      });
    };

    window.addEventListener("scroll", handleScroll);
    updateOpacity();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const prefixRef = useRef(null);
  const smileRef = useRef(null);
  const commentRef = useRef(null);
  const wandRef = useRef(null);

  return (
    <section className="home-section">
      {currentUser ? (
        <>
          <Container className="fluid">
            <div className="head">
              <h1 className="title">Perfect your prose</h1>
              <p className='head-p2'>Welcome back, {currentUser.username}!</p>
              <p className="head-p3">
                Edit new writing:
              </p>
              <Nav.Link className="nav-link" exact='true' href="/submitForm">
                <div className="pen-container">
                  <FontAwesomeIcon className="pen" icon={faPenToSquare} />
                </div>
              </Nav.Link>
            </div>
          </Container>
        </>
      ) : (
        <>
          <Container className="fluid">
            <div className="head">
              <h1 className="title">Perfect your prose</h1>
              <p className='head-p2'>
                Input your writing and the mood you want to convey, <br />and get a rating with tips to improve it.
              </p>
            </div>
            <Row>
              <Col lg={1}></Col>
              <Col lg={5}>
                <div className="text">
                  <h2>Refine any type of writing with ease</h2>
                  <p>
                    Whether you're looking to express gratitude with a heartfelt thank-you letter or showcase your product with captivating descriptions, we've got you covered.
                  </p>
                </div>
              </Col>
              <Col lg={6} className="img-col">
                <div className="prefix" style={{ opacity: getOpacity(1, prefixRef) }} ref={prefixRef}>
                  <FontAwesomeIcon icon={faAutoprefixer} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={1}></Col>
              <Col lg={5}>
                <div className="text">
                  <h2>Customize the Tone</h2>
                  <p>
                    Select an adjective that best represents the tone you desire. Whether it's "gracious," "enticing," "persuasive," or any other adjective, we'll ensure your content reflects your desired style.
                  </p>
                </div>
              </Col>
              <Col lg={6} className="img-col">
                <div className="smile" style={{ opacity: getOpacity(2, smileRef) }} ref={smileRef}>
                  <FontAwesomeIcon icon={faFaceSmileWink} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={1}></Col>
              <Col lg={5}>
                <div className="text">
                  <h2>Get Feedback</h2>
                  <p>
                    Powered by the OpenAI API, we evaluate your text based on grammar and the chosen adjective, offering invaluable insights to help you refine and enhance your message.
                  </p>
                </div>
              </Col>
              <Col lg={6} className="img-col">
                <div className="comment" style={{ opacity: getOpacity(3, commentRef) }} ref={commentRef}>
                  <FontAwesomeIcon icon={faCommentDots} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={1}></Col>
              <Col lg={5}>
                <div className="text">
                  <h2>Why Choose Us?</h2>
                  <p>
                    <b>User-Friendly Interface:</b> With a simple and intuitive interface, creating impactful content has never been easier.
                  </p>
                  <p>
                    <b>Reliable Feedback:</b> Receive actionable feedback on your writing to help you improve and excel.
                  </p>
                  <p>
                    <b>Powered by OpenAI:</b> Leveraging cutting-edge technology, we harness the power of the OpenAI API to deliver exceptional results.
                  </p>
                </div>
              </Col>
              <Col lg={6} className="img-col">
                <div className="wand" style={{ opacity: getOpacity(4, wandRef) }} ref={wandRef}>
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>
                <div className="foot">
                  <h2>Start Creating Today:</h2>
                  <span>Ready to elevate your content? Sign up now to unleash the full potential of your writing with Prose Perfector. It's free and always will be.</span>
                  <Nav.Link className="nav-link sign" exact='true' href="/signup">
                    <button className="btn signup-btn">Sign up</button>
                  </Nav.Link>
                </div>
              </Col>
            </Row>

          </Container>
        </>
      )
      }
    </section >
  );
}

export default Home;