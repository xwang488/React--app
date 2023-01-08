// import all module 
//export useStore
import React from "react"
import LoginStore from "./login.Store"
import userStore from './user.Store'
import ChannelStore from './channel.Store'
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new userStore()
    this.channelStore = new ChannelStore()
  }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }