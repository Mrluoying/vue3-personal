import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
    }
  },
  actions: {
    changeFoldState() {
      this.fold = !this.fold
    },
  },
})

export default useLayoutSettingStore
