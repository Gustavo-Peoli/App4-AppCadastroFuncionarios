<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <!-- Header -->
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-secondary-900 mb-4"
              >
                {{ title }}
              </DialogTitle>

              <!-- Content -->
              <div class="mb-6">
                <p class="text-sm text-secondary-600">
                  {{ message }}
                </p>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 justify-end">
                <AppButton
                  variant="secondary"
                  @click="closeModal"
                  :disabled="loading"
                >
                  {{ cancelText }}
                </AppButton>
                <AppButton
                  :variant="confirmVariant"
                  @click="handleConfirm"
                  :loading="loading"
                >
                  {{ confirmText }}
                </AppButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import AppButton from './AppButton.vue'

interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm'): void
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  confirmVariant: 'primary',
  loading: false
})

const emit = defineEmits<Emits>()

const closeModal = () => {
  if (!props.loading) {
    emit('close')
  }
}

const handleConfirm = () => {
  emit('confirm')
}
</script>