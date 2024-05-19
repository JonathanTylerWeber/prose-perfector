import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PromptForm from './PromptForm';
import fetchMock from 'fetch-mock';

describe('PromptForm', () => {
  // Mock the rating and rewrite responses
  const mockRatingResponse = 'Your rating response';
  const mockRewriteResponse = 'Your rewrite response';

  beforeEach(() => {
    // Reset fetch mock before each test
    fetchMock.reset();
  });

  it('renders without crashing', async () => {
    render(<PromptForm />);
    expect(screen.getByText('Enter writing and info to get rating, tips, and a rewrite')).toBeInTheDocument();
  });

  it('displays loading spinner when submitting form', async () => {
    render(<PromptForm />);
    const typeInput = screen.getByPlaceholderText("e.g. 'thank you letter', 'product description', etc");
    const adjInput = screen.getByPlaceholderText("e.g. 'sincere', 'inspirational', etc");
    const promptInput = screen.getByPlaceholderText("Enter your writing to get feedback");

    fireEvent.change(typeInput, { target: { value: 'Thank You Letter' } });
    fireEvent.change(adjInput, { target: { value: 'Sincere' } });
    fireEvent.change(promptInput, { target: { value: 'Thank you for your help.' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByText('Submitting...')).toBeInTheDocument());
  });

  it('displays rating result and rewritten prompt after submission', async () => {
    // Mock the API responses
    fetchMock.post('/submit/rating', { choices: [{ message: { content: mockRatingResponse } }] });
    fetchMock.post('/submit/rewrite', { choices: [{ message: { content: mockRewriteResponse } }] });

    render(<PromptForm />);
    const typeInput = screen.getByPlaceholderText("e.g. 'thank you letter', 'product description', etc");
    const adjInput = screen.getByPlaceholderText("e.g. 'sincere', 'inspirational', etc");
    const promptInput = screen.getByPlaceholderText("Enter your writing to get feedback");

    fireEvent.change(typeInput, { target: { value: 'Thank You Letter' } });
    fireEvent.change(adjInput, { target: { value: 'Sincere' } });
    fireEvent.change(promptInput, { target: { value: 'Thank you for your help.' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Wait for the response elements to appear
    await waitFor(() => {
      expect(screen.getByText(/Your rating response/i)).toBeInTheDocument();
      expect(screen.getByText(/Your rewrite response/i)).toBeInTheDocument();
    });
  });
});
