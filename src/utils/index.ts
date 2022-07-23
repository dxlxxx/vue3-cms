import LocalCache from './tools/cache'
import formatTime from './tools/format-time'
import firstUpperCase from './tools/firstUpperCase'

const localCache = new LocalCache()

export { localCache, formatTime, firstUpperCase }

export * from './tools/map-menu'
