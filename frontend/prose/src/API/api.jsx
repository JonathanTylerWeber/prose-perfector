// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";
// // const BASE_URL = "https://zpzi6qazm5.us-west-2.awsapprunner.com";

// /** API Class.
//  *
//  * Static class tying together methods used to get/send to to the API.
//  *
//  */

// class ProseApi {
//   // the token for interacting with the API will be stored here.
//   static token;
//   static BASE_URL = BASE_URL;

//   static async request(endpoint, data = {}, method = "get") {
//     console.debug("API Call:", endpoint, data, method);

//     const url = `${BASE_URL}/${endpoint}`;
//     const headers = ProseApi.token
//       ? { Authorization: `Bearer ${ProseApi.token}` }
//       : {};
//     const params = method === "get" ? data : {};

//     try {
//       return (await axios({ url, method, data, params, headers })).data;
//     } catch (err) {
//       console.error("API Error:", err);
//       let message = err.response.data.error.message;
//       throw Array.isArray(message) ? message : [message];
//     }
//   }

//   // Individual API routes

//   static async getUserPrompts(username) {
//     try {
//       const res = await this.request(`users/${username}/prompts`);
//       return res;
//     } catch (error) {
//       console.error("Error getting user prompts:", error);
//       throw error;
//     }
//   }

//   static async savePrompt(rating, prompt, rewrite, type, adj) {
//     try {
//       const res = await this.request(
//         "prompt",
//         { rating, prompt, rewrite, type, adj },
//         "post"
//       );
//       console.log(res);
//       return res;
//     } catch (error) {
//       console.error("Error saving data:", error);
//       throw error;
//     }
//   }

//   static async deletePrompt(promptId, username) {
//     try {
//       return await this.request(`prompt/${username}/${promptId}`, {}, "delete");
//     } catch (error) {
//       console.error("Error deleting prompt:", error);
//       throw error;
//     }
//   }

//   static async getRating(type, adj, prompt) {
//     try {
//       let res = await this.request(
//         "submit/rating",
//         { type, adj, prompt },
//         "post"
//       );
//       return res.choices[0].message.content;
//     } catch (error) {
//       console.error("Error getting rating:", error);
//       throw error;
//     }
//   }

//   static async rewritePrompt(type, adj, prompt) {
//     try {
//       let res = await this.request(
//         "submit/rewrite",
//         { type, adj, prompt },
//         "post"
//       );
//       return res.choices[0].message.content;
//     } catch (error) {
//       console.error("Error getting rewrite:", error);
//       throw error;
//     }
//   }

//   static async getCurrentUser(username) {
//     let res = await this.request(`users/${username}`, {}, "get");
//     return res.user;
//   }

//   static async updateUser(username, userData) {
//     try {
//       let res = await this.request(`users/${username}`, userData, "patch");
//       return res.user;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async signup(userData) {
//     try {
//       let res = await this.request("auth/register", userData, "post");
//       return res.token;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async login(username, password) {
//     try {
//       let res = await this.request(
//         "auth/token",
//         { username, password },
//         "post"
//       );
//       return res.token;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export default ProseApi;

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";
// const BASE_URL = "https://zpzi6qazm5.us-west-2.awsapprunner.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 *
 */
class ProseApi {
  // the token for interacting with the API will be stored here.
  static token;
  static BASE_URL = BASE_URL;

  /**
   * Helper method to make API requests using fetch.
   *
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Data to send with the request
   * @param {string} method - HTTP method (GET, POST, etc.)
   * @returns {Promise<any>} - Parsed JSON response
   */
  static async request(endpoint, data = {}, method = "GET") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(ProseApi.token && { Authorization: `Bearer ${ProseApi.token}` }),
    };

    const options = {
      method,
      headers,
    };

    if (method.toUpperCase() === "GET") {
      // For GET requests, append query parameters to the URL
      const queryParams = new URLSearchParams(data).toString();
      if (queryParams) {
        url += `?${queryParams}`;
      }
    } else {
      // For other methods, include the body as JSON
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error:", responseData);
        const message = responseData.error?.message || "An error occurred";
        throw Array.isArray(message) ? message : [message];
      }

      return responseData;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  }

  // Individual API routes

  static async getUserPrompts(username) {
    try {
      const res = await this.request(`users/${username}/prompts`);
      return res;
    } catch (error) {
      console.error("Error getting user prompts:", error);
      throw error;
    }
  }

  static async savePrompt(rating, prompt, rewrite, type, adj) {
    try {
      const res = await this.request(
        "prompt",
        { rating, prompt, rewrite, type, adj },
        "POST"
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  }

  static async deletePrompt(promptId, username) {
    try {
      return await this.request(`prompt/${username}/${promptId}`, {}, "DELETE");
    } catch (error) {
      console.error("Error deleting prompt:", error);
      throw error;
    }
  }

  static async getRating(type, adj, prompt) {
    try {
      const res = await this.request(
        "submit/rating",
        { type, adj, prompt },
        "POST"
      );
      return res.choices[0].message.content;
    } catch (error) {
      console.error("Error getting rating:", error);
      throw error;
    }
  }

  static async rewritePrompt(type, adj, prompt) {
    try {
      const res = await this.request(
        "submit/rewrite",
        { type, adj, prompt },
        "POST"
      );
      return res.choices[0].message.content;
    } catch (error) {
      console.error("Error getting rewrite:", error);
      throw error;
    }
  }

  static async getCurrentUser(username) {
    try {
      const res = await this.request(`users/${username}`, {}, "GET");
      return res.user;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  static async updateUser(username, userData) {
    try {
      const res = await this.request(`users/${username}`, userData, "PATCH");
      return res.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async signup(userData) {
    try {
      const res = await this.request("auth/register", userData, "POST");
      return res.token;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  static async login(username, password) {
    try {
      const res = await this.request(
        "auth/token",
        { username, password },
        "POST"
      );
      return res.token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
}

export default ProseApi;
