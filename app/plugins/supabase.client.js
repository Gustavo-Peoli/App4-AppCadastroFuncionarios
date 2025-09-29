import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  console.log('DEBUG - Variáveis de ambiente:')
  console.log('process.env.NUXT_PUBLIC_SUPABASE_URL:', process.env.NUXT_PUBLIC_SUPABASE_URL)
  console.log('process.env.NUXT_PUBLIC_SUPABASE_KEY:', process.env.NUXT_PUBLIC_SUPABASE_KEY)
  console.log('config.public:', config.public)
  
  const supabaseUrl = config.public.supabaseUrl || process.env.NUXT_PUBLIC_SUPABASE_URL
  const supabaseKey = config.public.supabaseKey || process.env.NUXT_PUBLIC_SUPABASE_KEY
  
  console.log('Final supabaseUrl:', supabaseUrl)
  console.log('Final supabaseKey:', supabaseKey)
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Erro: Variáveis do Supabase não encontradas!')
    return
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  nuxtApp.provide('supabase', supabase)
})
