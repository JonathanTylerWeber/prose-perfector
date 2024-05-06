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

  static async savePrompt(rating, prompt, rewrite) {
    try {
      const response = await this.request('prompt', { rating, prompt, rewrite }, 'post');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving rating and rewrite data:', error);
      throw error;
    }
  }

  static async deletePrompt(promptId) {
    try {
      return await this.request(`prompt/${promptId}`, 'delete');
    } catch (error) {
      throw error;
    }
  }

  static async getRating(type, adj, prompt) {
    try {
      let res = await this.request('submit/rating', { type, adj, prompt }, 'post');
      return res.choices[0].message.content;
    } catch (error) {
      throw error;
    }
  }

  static async rewritePrompt(type, adj, prompt) {
    try {
      let res = await this.request('submit/rewrite', { type, adj, prompt }, 'post');
      return res.choices[0].message.content;
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