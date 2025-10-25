import { defineNuxtPlugin } from '#app'
import Toast, { POSITION } from 'vue-toastification'
// Import CSS do toast
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    // Configurações do toast
    position: POSITION.TOP_RIGHT,
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    // Configurações de container
    container: document.body,
    // Customizações CSS inline
    toastClassName: 'custom-toast',
    bodyClassName: ['custom-toast-body'],
    maxToasts: 5,
    newestOnTop: true
  })

  // Adicionar estilos customizados inline
  if (process.client) {
    const style = document.createElement('style')
    style.textContent = `
      /* Toast Success */
      .Vue-Toastification__toast--success {
        background: rgb(240 253 244);
        border-left: 4px solid rgb(34 197 94);
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .Vue-Toastification__toast--success .Vue-Toastification__toast-body {
        color: rgb(22 101 52);
      }

      /* Toast Error */
      .Vue-Toastification__toast--error {
        background: rgb(254 242 242);
        border-left: 4px solid rgb(239 68 68);
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .Vue-Toastification__toast--error .Vue-Toastification__toast-body {
        color: rgb(153 27 27);
      }

      /* Toast Info */
      .Vue-Toastification__toast--info {
        background: rgb(239 246 255);
        border-left: 4px solid rgb(59 130 246);
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .Vue-Toastification__toast--info .Vue-Toastification__toast-body {
        color: rgb(30 64 175);
      }

      /* Toast Warning - usando nossa cor primária */
      .Vue-Toastification__toast--warning {
        background: rgba(255, 136, 0, 0.1);
        border-left: 4px solid #FF8800;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .Vue-Toastification__toast--warning .Vue-Toastification__toast-body {
        color: #B34A00;
      }

      /* Customização geral */
      .Vue-Toastification__toast {
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }

      .Vue-Toastification__close-button {
        color: #B3B3B3;
      }
      .Vue-Toastification__close-button:hover {
        color: #222222;
      }

      .Vue-Toastification__progress-bar {
        background: rgba(255, 136, 0, 0.2);
      }
    `
    document.head.appendChild(style)
  }
})