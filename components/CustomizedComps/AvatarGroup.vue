<template>
  <div class="flex -space-x-4 w-1/3 justify-end">
    <!-- Hiển thị các avatar -->
    <div
        v-for="(avatar, index) in displayedAvatars"
        :key="index"
        class="relative flex-shrink-0"
        :class="avatarSizeClass"
    >
      <img
          :src="avatar"
          alt="Avatar"
          class="rounded-full border-2 border-white object-cover w-full h-full"
      />
    </div>

    <div
        v-if="avatars.length > maxVisible"
        class="relative flex items-center justify-center rounded-full bg-gray-200 border-2 border-white text-gray-700 font-semibold"
        :class="avatarSizeClass"
    >
      +{{ avatars.length - maxVisible }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
  avatars: {
    type: Array,
    required: true,
    default: () => [],
  },
  maxVisible: {
    type: Number,
    default: 4,
  },
  size: {
    type: String,
    default: 'md',
  },
});


const displayedAvatars = computed(() => {
  return props.avatars.slice(0, props.maxVisible);
});

const avatarSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-7 h-7';
    case 'md':
      return 'w-10 h-10';
    case 'lg':
      return 'w-12 h-12';
    default:
      return 'w-10 h-10';
  }
});
</script>
