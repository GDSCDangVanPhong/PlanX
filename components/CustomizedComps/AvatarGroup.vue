<template>
  <div class="flex -space-x-3.5 w-1/3 justify-end">
    <!-- Hiển thị các avatar -->
    <div
        v-for="(avatar, index) in displayedAvatars"
        :key="index"
        class="relative flex-shrink-0"
        :class="avatarSizeClass"
    >
      <img
          :src="avatar.src"
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

// Props nhận từ parent component
const props = defineProps({
  avatars: {
    type: Array,
    required: true,
    default: () => [],
  },
  maxVisible: {
    type: Number,
    default: 4, // Số avatar tối đa hiển thị trước khi co lại
  },
  size: {
    type: String,
    default: 'md', // Kích thước avatar: 'sm', 'md', 'lg'
  },
});

// Tính toán danh sách avatar hiển thị
const displayedAvatars = computed(() => {
  return props.avatars.slice(0, props.maxVisible);
});

// Tùy chỉnh kích thước avatar dựa trên prop size
const avatarSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-8 h-8';
    case 'md':
      return 'w-10 h-10';
    case 'lg':
      return 'w-12 h-12';
    default:
      return 'w-10 h-10';
  }
});
</script>
