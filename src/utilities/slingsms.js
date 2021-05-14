import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const config = {
  headers: { Accept: "application/json", "Content-type": "application/x-www-form-urlencoded" }
};
const bodyParameters = {};

export default class sling {
  static setApiKey(key) {
    config.headers.Authorization = `Bearer ${key}`;
  }

  static async sendMessage(number, message) {
    bodyParameters.to = number;
    bodyParameters.message = message;
    await axios.post(
      "https://v2.sling.com.ng/api/v1/send-sms",
      bodyParameters,
      config
    ).then(res => res.data).catch(err => err.response.data);
  }
}
