import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PromptForm from './PromptForm';
import ProseApi from '../API/api';

describe('PromptForm', () => {
  let mock;

  const mockRatingResponse = 'Your rating response';
  const mockRewriteResponse = 'Your rewrite response';

  beforeEach(() => {
    // Initialize axios mock adapter
    mock = new MockAdapter(axios);

    // Mock the API responses
    mock.onPost(`${ProseApi.BASE_URL}/submit/rating`).reply(200, {
      choices: [{ message: { content: mockRatingResponse } }],
    });
    mock.onPost(`${ProseApi.BASE_URL}/submit/rewrite`).reply(200, {
      choices: [{ message: { content: mockRewriteResponse } }],
    });
  });

  afterEach(() => {
    // Reset the mock after each test
    mock.reset();
  });

  it('renders without crashing', () => {
    render(<PromptForm />);
    expect(screen.getByText('Enter writing and info to get rating, tips, and a rewrite')).toBeInTheDocument();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<PromptForm />);
    expect(asFragment()).toMatchSnapshot();
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
      expect(screen.getByText(mockRatingResponse)).toBeInTheDocument();
      expect(screen.getByText(mockRewriteResponse)).toBeInTheDocument();
    });
  });
});
