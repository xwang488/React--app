import { makeAutoObservable } from "mobx"
import { http } from "@/utils"
class userStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    const res = await http.get('/user/profile')
    this.userInfo = res.data
  }
}
export default userStore