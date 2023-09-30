import type { App, Component } from 'vue'
const components = import.meta.glob('./**/index.vue', { eager: true })
const componetMap: { [name: string]: Component } = Object.keys(
  components,
).reduce((prev, cur) => {
  // console.log(cur, 'cur')
  // const match = cur.match(/^\.\/(\\w+)\/$/)
  // if (match) {
  //   cur = match[0]
  // } else {
  //   throw new Error('组件名称取不到')
  // }
  const componentName = cur.split('/')[1]
  prev[componentName] = components[cur].default
  return prev
}, {})
console.log(componetMap, 'map')
export default {
  install(app: App) {
    Object.keys(componetMap).forEach((name) => {
      app.component(name, componetMap[name])
    })
  },
}
