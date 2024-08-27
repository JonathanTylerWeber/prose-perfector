import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class ProseApi {
  // the token for interacting with the API will be stored here.
  static token;
  static BASE_URL = BASE_URL;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = ProseApi.token ? { Authorization: `Bearer ${ProseApi.token}` } : {};
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getUserPrompts(username) {
    try {
      const res = await this.request(`users/${username}/prompts`);
      return res;
    } catch (error) {
      console.error('Error getting user prompts:', error);
      throw error;
    }
  }

  static async savePrompt(rating, prompt, rewrite, type, adj) {
    try {
      const res = await this.request('prompt', { rating, prompt, rewrite, type, adj }, 'post');
      console.log(res);
      return res;
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }

  static async deletePrompt(promptId, username) {
    try {
      return await this.request(`prompt/${username}/${promptId}`, {}, 'delete');
    } catch (error) {
      console.error('Error deleting prompt:', error);
      throw error;
    }
  }

  static async getRating(type, adj, prompt) {
    try {
      let res = await this.request('submit/rating', { type, adj, prompt }, 'post');
      return res.choices[0].message.content;
    } catch (error) {
      console.error('Error getting rating:', error);
      throw error;
    }
  }

  static async rewritePrompt(type, adj, prompt) {
    try {
      let res = await this.request('submit/rewrite', { type, adj, prompt }, 'post');
      return res.choices[0].message.content;
    } catch (error) {
      console.error('Error getting rewrite:', error);
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