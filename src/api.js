import axios from "axios";
import { search } from "../../backend/routes/jobs";
import { query, response } from "express";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.

  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /** Retrieve details for a specifc job by ID*/
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job
  }

  /** Retrive a list of all jobs */
  static async getAllJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  }
  /**Search jobs based on a given query */
  static async searchJobs(query) {
    let res = await this.request('jobs', {search:query});
    return res.jobs;
  }

  /**Retrieve details for a specific user by username */
  static async getUser(username){
    let res = await this.request(`users/${username}`)
    return res.username;
  }

  /** Update user details */
  static async updateUser(username, data) {
    let res = await this.response(`users/${username}`, data ,'patch');
    return res.user;
  }

  /** Send request to the backend to log in a user and get authentication token*/
  static async login(username, password) {
    let res = await this.response('login', {username,password}, 'post');
    return res.token;
  }

  /**Register a new User */
  static async newUser(user) {
    let res = await this.response('users',user, 'post');
    return res.user;
  }
  /** Retrive list of all companies  */
  static async getAllCompanies() {
    let res = await this.response('companies');
    return res.companies;
  }

  /** Search for company based on a given query */
  static async searchCompany(query) {
    let res = await this.response('companies', {search:query});
    return res.companies;
  }

  /** */
  static async applyToJob(jobId) {
    let res = await this.response(`jobs/${jobId}/apply`, {}, 'post');
    return res.appliedToJobId;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    export default JoblyApi;