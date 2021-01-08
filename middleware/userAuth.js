export default function({ route, app, req, res, redirect, store }) {
  const token = app.$cookies.get('token')
  // 需要进行权限判断的页面开头
  if (!token) {
    redirect('/')
  }
}
