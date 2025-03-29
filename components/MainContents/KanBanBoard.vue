<script setup lang="ts">
  import Collum from "~/components/CustomizedComps/KanBanComps/Collum.vue";

  const projectTitle = defineProps<{
      title : string
  }>()


</script>

<template>
    <Card class="mx-4 mb-4">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription> Overview of your project</CardDescription>
      </CardHeader>
      <div class="grid h-5/6 mx-4  gap-6 md:grid-cols-4">
        <Collum class="border-t-4 border-purple-300"/>
        <Collum class="border-t-4 border-yellow-300"/>
        <Collum class="border-t-4 border-blue-300"/>
        <Collum class="border-t-4 border-green-300"/>
      </div>



    </Card>
</template>

