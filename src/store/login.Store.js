//login module
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '@/utils'
class LoginStore {
  token = getToken() || '';
  constructor() {
    makeAutoObservable(this)
  }
  getTokens = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    // console.log(res.data)
    this.token = res.data.token
    //add to local storage
    setToken(this.token)
  }
  //clearToken
  Logout = () => {
    this.token = ''
    removeToken()//clear localstorage infomation
  }
}

export default LoginStore