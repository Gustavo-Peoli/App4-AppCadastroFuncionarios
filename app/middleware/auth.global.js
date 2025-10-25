export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()
  
  // Rotas que não precisam de autenticação
  const publicRoutes = ['/Login']
  
  // Se a rota atual é pública (Login), permite o acesso
  if (publicRoutes.includes(to.path)) {
    // Se o usuário já está logado e tenta acessar login, redireciona para index
    if (user.value) {
      return navigateTo('/')
    }
    return
  }
  
  // Para todas as outras rotas, verifica se está logado
  if (!user.value) {
    return navigateTo('/Login')
  }
})