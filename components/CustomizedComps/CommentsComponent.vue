<script setup lang="ts">
    const props = defineProps<{
      avatar: string ,
      username : string,
      content: string
    }>()



</script>

<template>
  <div class="flex space-x-2">
      <Avatar>
        <AvatarImage :src="props.avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    <div>
      <span class="text-gray-700">{{props.username}}</span>
      <p >{{content}}</p>
    </div>

  </div>

</template>

