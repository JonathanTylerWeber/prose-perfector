import React, { useState } from 'react';
import ProseApi from '../API/api';
import "./PromptForm.css"

function Form() {
  const [type, setType] = useState('');
  const [adj, setAdj] = useState('');
  const [prompt, setPrompt] = useState('');
  const [ratingResult, setRatingResult] = useState('');
  const [rewriteResult, setRewriteResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting prompt form...');
      const ratingResponse = await ProseApi.getRating(type, adj, prompt);
      const rewriteResponse = await ProseApi.rewritePrompt(type, adj, prompt);
      console.log('Rating response for form:', ratingResponse);
      console.log('Rewrite response for form:', rewriteResponse);
      setRatingResult(ratingResponse);
      setRewriteResult(rewriteResponse);
      await ProseApi.savePrompt(ratingResponse, prompt, rewriteResponse, type, adj)
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
      {ratingResult &&
        <div>
          <p>Rating: {ratingResult}</p>
          <p>Rewritten {type}: {rewriteResult}</p>
        </div>
      }
    </div>
  );
}

export default Form;
