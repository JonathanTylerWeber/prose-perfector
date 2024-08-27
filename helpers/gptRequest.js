const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
require('dotenv').config();

// Function to create an Axios instance with or without a proxy
function createAxiosInstance() {
  if (process.env.USE_PROXY === 'true') {
    // Define proxy address and port
    const proxyAddress = process.env.PROXY_ADDRESS || 'http://127.0.0.1';
    const proxyPort = process.env.PROXY_PORT || 7890;

    // Create the proxy agent
    const proxyAgent = new HttpsProxyAgent(`${proxyAddress}:${proxyPort}`);

    // Create an instance of Axios with the proxy configuration
    return axios.create({
      httpsAgent: proxyAgent, // Use the proxy agent for HTTPS requests
      httpAgent: proxyAgent, // Use the proxy agent for HTTP requests 
    });
  } else {
    // Create an instance of Axios without the proxy
    return axios.create();
  }
}

// Function to make a request using Axios
async function getRating(type, adj, prompt) {
  console.log('*******gptRequest');
  try {
    const instance = createAxiosInstance();

    const basePrompt = `You will be provided with a ${type} and must rate it from 1-10 on grammar and how ${adj} it is: ${prompt}`;

    // Request data
    const data = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": `${basePrompt}`
        }
      ]
    });

    // Request configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      data: data
    };

    // Make the request
    const response = await instance.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function rewritePrompt(type, adj, prompt) {
  console.log('*******gptRequest');
  try {
    const instance = createAxiosInstance();

    const basePrompt = `You will be provided with a ${type} and must rewrite it to fix grammar and make it more ${adj}: ${prompt}`;

    // Request data
    const data = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": `${basePrompt}`
        }
      ]
    });

    // Request configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      data: data
    };

    // Make the request
    const response = await instance.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRating,
  rewritePrompt
};
