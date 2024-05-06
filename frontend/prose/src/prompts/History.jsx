import React, { useState, useEffect } from "react";
import ProseApi from '../API/api';

function History({ currentUser }) {
  const [prompts, setPrompts] = useState();

  useEffect(() => {
    const fetchUserPrompts = async () => {
      try {
        let username = currentUser.username;
        let prompts = await ProseApi.getUserPrompts(username);
        setPrompts(prompts);
      } catch (error) {
        console.error("Failed to fetch user prompts:", error);
      }
    };

    fetchUserPrompts();
  }, [prompts]);

  return (
    <div>
      <p>hello</p>
    </div>
  );
}

export default History;