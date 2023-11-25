import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
  actions: {
    changeFoldState() {
      this.fold = !this.fold
    },
    changeRefreshState() {
      this.refresh = !this.refresh
    },
  },
})

export default useLayoutSettingStore
