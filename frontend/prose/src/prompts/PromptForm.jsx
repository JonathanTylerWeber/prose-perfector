import React, { useState } from 'react';
import ProseApi from "../api/api";

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
      {result && <pre>{result}</pre>}
    </div>
  );
}

export default Form;
