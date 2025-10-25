<template>
  <div class="relative">
    <Listbox v-model="selectedValue" @update:model-value="handleChange">
      <div class="relative">
        <!-- Botão do Dropdown -->
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md border border-border focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300"
        >
          <span class="block truncate text-text">
            {{ selectedValue || placeholder }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              class="h-5 w-5 text-text-muted"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <!-- Transição -->
        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <!-- Lista de Opções -->
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-primary/10 text-primary' : 'text-text',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ option }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/20/solid'

// Props
interface Props {
  modelValue?: string
  placeholder?: string
  options?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Selecione uma opção',
  options: () => []
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Estado local
const selectedValue = ref(props.modelValue)

// Observar mudanças no modelValue
watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

// Função para lidar com mudanças
const handleChange = (value: string) => {
  selectedValue.value = value
  emit('update:modelValue', value)
}
</script>