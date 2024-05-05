import React, { useState } from 'react';
import ProseApi from "../api/api";
import "./PromptForm.css"

function Form() {
  const [type, setType] = useState('');
  const [adj, setAdj] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting prompt form...');
      const response = await ProseApi.makeRequestWithProxy(type, adj, prompt);
      console.log('Response for form:', response);
      setResult(response);
    } catch (error) {
      console.error("Failed to submit prompt form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
        <input type="text" value={adj} onChange={(e) => setAdj(e.target.value)} placeholder="Adjective" />
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Prompt"></textarea>
        <button type="submit">Submit</button>
      </form>
      {/* {result && <pre>{result}</pre>} */}
      {result &&
        <div>
          <p>Original Rating: {result.original_rating}</p>
          <p>Rewritten {type}: {result.rewrite}</p>
          <p>Rewritten Rating: {result.new_rating}</p>
        </div>
      }
    </div>
  );
}

export default Form;
