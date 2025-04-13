<script setup lang="ts">
  import Column from "~/components/CustomizedComps/KanBanComps/Column.vue";
  const todo = ref({ columnID: '', tasks: [] })
  const inProgress = ref({ columnID: '', tasks: [] })
  const inReview = ref({ columnID: '', tasks: [] })
  const done = ref({ columnID: '', tasks: [] })




  const { data, error } = await useFetch('http://localhost:4000/project/67f646b0c7c5aa61993aedfa')
  if (data.value) {
    const columns = data.value.data

    columns.forEach((col: any) => {
      const mappedTasks = col.tasks.map((task: any) => ({
        title: task.title,
        tag: task.level,
        date: task.deadline,
        taskId : task.taskID,
        src: task.avatarList ?? []
      }))
      const columnData = {
        columnID: col.columnID,
        tasks: mappedTasks
      }

      switch (col.columnType) {
        case 'TO_DO':
          todo.value = columnData
          break
        case 'IN_PROGRESS':
          inProgress.value = columnData
          break
        case 'IN_REVIEW':
          inReview.value = columnData
          break
        case 'DONE':
          done.value = columnData
          break
      }

    })
  }
</script>

<template>
    <Card class="mx-4 mb-4 ">
      <CardHeader>
        <CardTitle>Hello</CardTitle>
        <CardDescription> Overview of your project</CardDescription>
      </CardHeader>
      <div class="grid h-5/6 mx-4  gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Column :column-id="todo.columnID" :title="'TO DO'"  :data-array="todo.tasks" class="border-t-4 border-purple-300"/>
        <Column :column-id ="inProgress.columnID"  :title="'IN PROGRESS'" :data-array="inProgress.tasks" class="border-t-4 border-yellow-300"/>
        <Column :column-id="inReview.columnID" :title="'IN REVIEW'" :data-array="inReview.tasks" class="border-t-4 border-blue-300"/>
        <Column :column-id="done.columnID" :title="'DONE'"  :data-array="done.tasks" class="border-t-4 border-green-300"/>
      </div>



    </Card>
</template>

