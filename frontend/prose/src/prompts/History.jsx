import React, { useState, useEffect } from "react";
import ProseApi from '../API/api';
import "./History.css"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function History({ currentUser }) {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchUserPrompts = async () => {
      try {
        let username = currentUser.username;
        let res = await ProseApi.getUserPrompts(username);
        setPrompts(res.prompts);
      } catch (error) {
        console.error("Failed to fetch user prompts:", error);
      }
    };

    fetchUserPrompts();
  }, [currentUser]);

  const handleDeletePrompt = async (promptId) => {
    try {
      await ProseApi.deletePrompt(promptId, currentUser.username);
      // Filter out the deleted prompt from the prompts array
      setPrompts(prompts.filter(prompt => prompt.id !== promptId));
    } catch (error) {
      console.error("Failed to delete prompt:", error);
    }
  };

  return (
    <Container className="history-container">
      <h1 className="history-h1">Prompt History:</h1>
      {prompts && prompts.length > 0 ? (
        prompts.map(prompt => (
          <div key={prompt.id} className="prompt">
            <h3 className="h-title">Type:</h3>
            <p className="h-text">{prompt.type}</p>
            <h3 className="h-title">Adjective:</h3>
            <p className="h-text">{prompt.adj}</p>
            <h3 className="h-title">Prompt:</h3>
            <pre className="h-text">{prompt.prompt}</pre>
            <h3 className="h-title">Rating:</h3>
            <p className="h-text">{prompt.rating}</p>
            <h3 className="h-title">Rewrite:</h3>
            <pre className="h-text">{prompt.rewrite}</pre>
            <button variant="primary" className="btn"
              onClick={() => handleDeletePrompt(prompt.id)}>
              <FontAwesomeIcon className="trash" icon={faTrashCan} />
            </button>
          </div>
        ))
      ) : (
        <p>No prompts available</p>
      )}
    </Container>
  );
}



{/* <p>{prompts.prompts[0].prompt}</p> */ }

export default History;