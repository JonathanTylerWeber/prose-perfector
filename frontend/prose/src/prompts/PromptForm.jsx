import React, { useState } from 'react';
import ProseApi from '../API/api';
import { Container, Form, Button, Spinner } from "react-bootstrap"
import "./PromptForm.css"

function PromptForm() {
  const [type, setType] = useState('');
  const [adj, setAdj] = useState('');
  const [prompt, setPrompt] = useState('');
  const [ratingResult, setRatingResult] = useState('');
  const [rewriteResult, setRewriteResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const ratingResponse = await ProseApi.getRating(type, adj, prompt);
      const rewriteResponse = await ProseApi.rewritePrompt(type, adj, prompt);
      console.log('Rating response for form:', ratingResponse);
      console.log('Rewrite response for form:', rewriteResponse);
      setRatingResult(ratingResponse);
      setRewriteResult(rewriteResponse);
      await ProseApi.savePrompt(ratingResponse, prompt, rewriteResponse, type, adj)
      console.log('Prompt saved successfully');
    } catch (error) {
      console.error("Failed to submit prompt form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="m-auto form-cntr">
      <Form onSubmit={handleSubmit} className='form'>
        <h1 className="form-h1">Enter writing and info to get rating, tips, and a rewrite</h1>
        <Form.Group className="mb-3" controlId="type">
          <Form.Label className='label'>Type:</Form.Label>
          <Form.Control type="text" value={type}
            onChange={(e) => setType(e.target.value)}
            required placeholder="e.g. 'thank you letter', 'product description', etc" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="adj">
          <Form.Label className='label'>Adjective:</Form.Label>
          <Form.Control type="text" value={adj}
            onChange={(e) => setAdj(e.target.value)}
            required placeholder="e.g. 'sincere', 'inspirational', etc" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="prompt">
          <Form.Label className='label'>Prompt:</Form.Label>
          <Form.Control as="textarea" value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required placeholder="Enter your writing to get feedback"
            rows={6} />
        </Form.Group>
        <Button className="btn form-btn" variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="spinner-container">
              <Spinner animation="border" className='spinner' size="sm" />
              <span className="spin-text"> Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
      {ratingResult &&
        <div className='response'>
          <h2 className='review'>Review:</h2>
          <h3 className='label'>Rating:</h3>
          <p className='res-box'>{ratingResult}</p>
          <br />
          <h3 className='label'>Rewritten {type}:</h3>
          <pre className='res-box'>{rewriteResult}</pre>
        </div>
      }
    </Container>
  );
}

export default PromptForm;
