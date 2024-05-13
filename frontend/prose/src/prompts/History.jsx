import React, { useState, useEffect } from "react";
import ProseApi from '../API/api';

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
    <div>
      {prompts && prompts.length > 0 ? (
        prompts.map(prompt => (
          <div key={prompt.id}>
            <p><strong>Type:</strong> {prompt.type}</p>
            <p><strong>Prompt:</strong> {prompt.prompt}</p>
            <p><strong>Rating:</strong> {prompt.rating}</p>
            <p><strong>Adjective:</strong> {prompt.adj}</p>
            <p><strong>Rewrite:</strong> {prompt.rewrite}</p>
            <button onClick={() => handleDeletePrompt(prompt.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No prompts available</p>
      )}
    </div>
  );
}



{/* <p>{prompts.prompts[0].prompt}</p> */ }

export default History;