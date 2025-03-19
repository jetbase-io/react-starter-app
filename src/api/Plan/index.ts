import { GET_PLANS_URL } from '../../common/constants/api-contstants'
import type { IPlan } from '../../common/types/plan.types'
import http from '../http-common'

class Plan {
  async getAll(): Promise<IPlan[]> {
    const { data } = await http.get<IPlan[]>(GET_PLANS_URL)

    return data
  }
}

export default new Plan()
