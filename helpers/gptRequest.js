const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
require('dotenv').config();

// Function to make a request using a proxy
async function makeRequestWithProxy() {
  try {
    // Define your proxy address and port
    const proxyAddress = 'http://127.0.0.1';
    const proxyPort = 7890;

    // Create the proxy agent
    const proxyAgent = new HttpsProxyAgent(`${proxyAddress}:${proxyPort}`);

    // Create an instance of Axios with the proxy configuration
    const instance = axios.create({
      httpsAgent: proxyAgent, // Use the proxy agent for HTTPS requests
      httpAgent: proxyAgent, // Use the proxy agent for HTTP requests (optional, but recommended)
    });

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
          "content": "what is 4+4?"
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

// Call the function and handle the response
makeRequestWithProxy()
  .then(data => {
    console.log(JSON.stringify(data));
  })
  .catch(error => {
    console.log(error);
  });
