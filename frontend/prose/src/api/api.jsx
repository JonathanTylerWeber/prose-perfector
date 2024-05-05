import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ProseApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = ProseApi.token ? { Authorization: `Bearer ${ProseApi.token}` } : {};
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // static async makeRequestWithProxy(type, adj, prompt) {
  //   try {
  //     const response = await this.request("submit/form", { type, adj, prompt }, "post");
  //     const content = response.choices[0].message.content;
  //     console.log(`func res: ${response}`);
  //     console.log(`content: ${content}`);
  //     return content;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async makeRequestWithProxy(type, adj, prompt) {
    try {
      const response = await this.request("submit/form", { type, adj, prompt }, "post");
      // Extract the 'content' property from the first element of 'choices'
      const content = response.choices[0].message.content;

      // Remove the leading "Object:" and split the content by line breaks
      const objectLines = content.replace(/^Object:\s*/, '').split('\n');

      // Initialize an empty object to store the parsed content
      const parsedContent = {};

      // Loop through each line in the content
      objectLines.forEach(line => {
        // Skip empty lines and lines that don't contain a colon
        if (line.trim() && line.includes(':')) {
          // Split the line by colon and trim whitespace
          const [key, value] = line.split(':').map(part => part.trim());
          // Add the key-value pair to the parsed content object
          parsedContent[key] = value;
        }
      });

      console.log(`func res: ${response}`);
      console.log(`parsed content:`, parsedContent);

      // Return the parsed content object
      return parsedContent;
    } catch (error) {
      throw error;
    }
  }


  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, {}, "get");
    return res.user;
  }

  static async updateUser(username, userData) {
    try {
      let res = await this.request(`users/${username}`, userData, "patch");
      return res.user;
    } catch (error) {
      throw error;
    }
  }

  static async signup(userData) {
    try {
      let res = await this.request("auth/register", userData, "post");
      return res.token;
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    try {
      let res = await this.request("auth/token", { username, password }, "post");
      return res.token;
    } catch (error) {
      throw error;
    }
  }


}



export default ProseApi;