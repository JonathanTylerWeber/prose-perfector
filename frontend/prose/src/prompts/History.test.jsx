import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import History from './History';
import ProseApi from '../API/api';

// Mock the API module
vi.mock('../API/api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getUserPrompts: vi.fn().mockResolvedValue({ prompts: [] }), // Mock the getUserPrompts function
    deletePrompt: vi.fn().mockResolvedValue({}), // Mock the deletePrompt function
  };
});

describe('History', () => {
  it('renders without crashing', async () => {
    render(<History />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<History />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders no prompts available message when there are no prompts', async () => {
    // Mock the getUserPrompts function to return an empty array of prompts
    const getUserPromptsMock = vi.fn();
    getUserPromptsMock.mockResolvedValueOnce({ prompts: [] });
    ProseApi.getUserPrompts = getUserPromptsMock;

    render(<History currentUser={{ username: 'testuser' }} />);
    await waitFor(() => {
      expect(screen.getByText('No prompts available')).toBeInTheDocument();
    });
    expect(ProseApi.getUserPrompts).toHaveBeenCalledWith('testuser');
  });

  it('renders prompts and handles prompt deletion', async () => {
    // Mock prompts data
    // Mock the deletePrompt function to return an empty object
    const deletePromptMock = vi.fn();
    deletePromptMock.mockResolvedValueOnce({});
    ProseApi.deletePrompt = deletePromptMock;

    const prompts = [
      {
        id: 1,
        type: 'Test Type',
        adj: 'Test Adjective',
        prompt: 'Test Prompt',
        rating: 5,
        rewrite: 'Test Rewrite',
      },
    ];

    // Mock the getUserPrompts function to return the mock prompts
    ProseApi.getUserPrompts.mockResolvedValueOnce({ prompts });

    render(<History currentUser={{ username: 'testuser' }} />);

    // Wait for prompts to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Type')).toBeInTheDocument();
    });

    // Assert that the delete button exists and simulate click
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    // Wait for deletion to be handled
    await waitFor(() => {
      expect(ProseApi.deletePrompt).toHaveBeenCalledWith(1, 'testuser');
    });

    // Ensure the prompt is no longer rendered after deletion
    expect(screen.queryByText('Test Type')).not.toBeInTheDocument();
  });
});
