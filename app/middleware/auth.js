export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()
  
  // Se não há usuário logado, redirecionar para login
  if (!user.value) {
    return navigateTo('/Login')
  }
})