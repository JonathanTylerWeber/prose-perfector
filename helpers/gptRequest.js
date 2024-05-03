const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
require('dotenv').config();

// Function to make a request using a proxy
async function makeRequestWithProxy(type, adj, prompt) {
  console.log('*******gptRequest')
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

    const basePrompt = `You will be provided with a ${type} and must rate it from 1-10 on grammar and how ${adj} it is. If it is not a 10 then you must rewrite it to make it a 10 with proper grammar and making it more ${adj}: ${prompt}`

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

// Call the function and handle the response
// makeRequestWithProxy('thank you letter', 'sincere', "Dear grandma,thank you so much for the money you gave me for my birthday. It will help me to buy the new video game that I want.Sincerely,Dave")
//   .then(data => {
//     console.log(JSON.stringify(data));
//   })
//   .catch(error => {
//     console.log(error);
//   });

module.exports = makeRequestWithProxy;
