import axios from "axios";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://scjgapi.iething.com" : "https://scjgapi.iething.com";
// axios.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded';