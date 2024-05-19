import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProseApi from './api';

const mock = new MockAdapter(axios);

describe('ProseApi', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('getUserPrompts', () => {
    it('should return user prompts', async () => {
      const mockResponse = [{ id: 1, prompt: 'Sample Prompt' }];
      mock.onGet('http://localhost:3001/users/testuser/prompts').reply(200, mockResponse);

      const result = await ProseApi.getUserPrompts('testuser');
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      mock.onGet('http://localhost:3001/users/testuser/prompts').reply(500);

      await expect(ProseApi.getUserPrompts('testuser')).rejects.toThrowError();
    });
  });

  describe('savePrompt', () => {
    it('should save a prompt', async () => {
      const mockResponse = { id: 1, success: true }; // Define the mock response
      mock.onPost('http://localhost:3001/prompt').reply(200, mockResponse); // Set up the mock response for the POST request

      // Call the savePrompt method
      const result = await ProseApi.savePrompt(5, 'Test Prompt', 'Rewritten Prompt', 'type', 'adj');

      // Verify that the result matches the expected response
      expect(result).toEqual(mockResponse);
    });
  });


  // describe('deletePrompt', () => {
  //   it('should delete a prompt', async () => {
  //     mock.onDelete('http://localhost:3001/prompt/testuser/1').reply(200);

  //     const result = await ProseApi.deletePrompt(1, 'testuser');
  //     expect(result).toBeUndefined();
  //   });

  //   it('should handle errors', async () => {
  //     mock.onDelete('http://localhost:3001/prompt/testuser/1').reply(500);

  //     await expect(ProseApi.deletePrompt(1, 'testuser')).rejects.toThrowError();
  //   });
  // });

  // describe('getRating', () => {
  //   it('should return a rating', async () => {
  //     const mockResponse = '5 stars';
  //     mock.onPost('http://localhost:3001/submit/rating').reply(200, { choices: [{ message: { content: mockResponse } }] });

  //     const result = await ProseApi.getRating('type', 'adj', 'Prompt text');
  //     expect(result).toEqual(mockResponse);
  //   });

  //   it('should handle errors', async () => {
  //     mock.onPost('http://localhost:3001/submit/rating').reply(500);

  //     await expect(ProseApi.getRating('type', 'adj', 'Prompt text')).rejects.toThrowError();
  //   });
  // });

  // describe('rewritePrompt', () => {
  //   it('should return a rewritten prompt', async () => {
  //     const mockResponse = 'Rewritten prompt';
  //     mock.onPost('http://localhost:3001/submit/rewrite').reply(200, { choices: [{ message: { content: mockResponse } }] });

  //     const result = await ProseApi.rewritePrompt('type', 'adj', 'Prompt text');
  //     expect(result).toEqual(mockResponse);
  //   });

  //   it('should handle errors', async () => {
  //     mock.onPost('http://localhost:3001/submit/rewrite').reply(500);

  //     await expect(ProseApi.rewritePrompt('type', 'adj', 'Prompt text')).rejects.toThrowError();
  //   });
  // });

  // describe('getCurrentUser', () => {
  //   it('should return the current user', async () => {
  //     const mockResponse = { id: 1, username: 'testuser' };
  //     mock.onGet('http://localhost:3001/users/testuser').reply(200, { user: mockResponse });

  //     const result = await ProseApi.getCurrentUser('testuser');
  //     expect(result).toEqual(mockResponse);
  //   });

  //   it('should handle errors', async () => {
  //     mock.onGet('http://localhost:3001/users/testuser').reply(500);

  //     await expect(ProseApi.getCurrentUser('testuser')).rejects.toThrowError();
  //   });
  // });

  // describe('updateUser', () => {
  //   it('should update the user', async () => {
  //     const mockResponse = { id: 1, username: 'testuser' };
  //     mock.onPatch('http://localhost:3001/users/testuser').reply(200, { user: mockResponse });

  //     const result = await ProseApi.updateUser('testuser', { username: 'newusername' });
  //     expect(result).toEqual(mockResponse);
  //   });

  //   it('should handle errors', async () => {
  //     mock.onPatch('http://localhost:3001/users/testuser').reply(500);

  //     await expect(ProseApi.updateUser('testuser', { username: 'newusername' })).rejects.toThrowError();
  //   });
  // });

  // describe('signup', () => {
  //   it('should sign up a user', async () => {
  //     const mockResponse = { token: 'mockToken' };
  //     mock.onPost('http://localhost:3001/auth/register').reply(200, mockResponse);

  //     const result = await ProseApi.signup({ username: 'testuser', password: 'password', email: 'test@test.com' });
  //     expect(result).toEqual(mockResponse.token);
  //   });

  //   it('should handle errors', async () => {
  //     mock.onPost('http://localhost:3001/auth/register').reply(500);

  //     await expect(ProseApi.signup({ username: 'testuser', password: 'password', email: 'test@test.com' })).rejects.toThrowError();
  //   });
  // });

  // describe('login', () => {
  //   it('should log in a user', async () => {
  //     const mockResponse = { token: 'mockToken' };
  //     mock.onPost('http://localhost:3001/auth/token').reply(200, mockResponse);

  //     const result = await ProseApi.login('testuser', 'password');
  //     expect(result).toEqual(mockResponse.token);
  //   });

  //   it('should handle errors', async () => {
  //     mock.onPost('http://localhost:3001/auth/token').reply(500);

  //     await expect(ProseApi.login('testuser', 'password')).rejects.toThrowError();
  //   });
  // });
});
