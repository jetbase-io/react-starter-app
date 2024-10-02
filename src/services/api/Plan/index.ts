import { GET_PLANS_URL } from '../../../store/constants/api-contstants'
import http from '../../../store/http/http-common'
import type { IPlan } from '../../../types/plan.types'

class Plan {
  async getAll() {
    const { data } = await http.get<IPlan[]>(GET_PLANS_URL)

    return data
  }
}

export default new Plan()
