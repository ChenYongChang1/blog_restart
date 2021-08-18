export default async function({ isHMR, app, store, route, req, params, query, error, redirect }) {
  if (isHMR) return
  const isClient = process.client
  const isServer = process.server
  if (isServer) {
    await store.dispatch('getLogin')
  }
}
