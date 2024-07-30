import { GET_PLANS_URL } from "../../../store/constants/api-contstants";
import http from "../../../store/http/http-common";

class Plan {
  async getAll() {
    const { data } = await http(GET_PLANS_URL);

    return data;
  }
}

export default new Plan();
