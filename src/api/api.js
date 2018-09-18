import axios from "axios";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://scjgapi.iething.com" : "http://scjgapi.iething.com";
// axios.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded';