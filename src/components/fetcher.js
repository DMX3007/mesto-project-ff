class Fetcher {
    /**
  * @param {string} baseUrl 
  * @param {string} token
  */
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  } 
  /**
  * @param {string} url 
  */
  async get(url) {
    const res = await fetch(this.baseUrl + url, {
      method: "GET",
      headers: {
        authorization: this.token,
      },
    })
    return await res.json();
  }
  /**
 * @param {string} url 
 * @param {object} body 
 */
  async post(url, body) {
  return await fetch(this.baseUrl + url, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-type": 'application/json',
      },
      body: JSON.stringify(body)
    })
  }
    /**
 * @param {string} url 
 */
  async delete(url) {
    return await fetch(this.baseUrl + url, {
      method: "DELETE", 
      headers: {
        authorization: this.token
      }
    })
  }

  /**
 * @param {string} url 
 * @param {object} body 
 */
  async patch(url, body) {
    return await fetch(this.baseUrl + url, {
      method: "PATCH", 
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
  }
  async put(url) {
    return await fetch(this.baseUrl + url, {
      method: 'PUT', 
      header: {
        authorization: this.token
      },
    })
  }
}

export {Fetcher};