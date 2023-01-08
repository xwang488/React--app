//import all component and encapsulate
//export as a module

import { http } from './http'
import { setToken, getToken, removeToken } from './token'
import { history } from './history'

export {
  http,
  setToken,
  getToken,
  removeToken,
  history
}

//import {http} from '@/utils'