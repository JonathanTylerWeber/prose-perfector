import React from "react";
import "./Home.css"

function Home({ currentUser }) {
  return (
    <section className="col-md-8">
      <h1 className="font-weight-bold">
        Prose Perfector
      </h1>
      {currentUser ? (
        <>
          <p>Perfect your prose</p>
          <p>Welcome back, {currentUser.username}!</p>
        </>
      ) : (
        <p>We have jobs waiting for you. Please log in or sign up to explore.</p>
      )}
    </section>
  );
}

export default Home;