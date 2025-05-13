<script setup lang="ts">
import { useProjectId } from '~/stores/useProjectId'
import Column from "~/components/CustomizedComps/KanBanComps/Column.vue";

const todo = ref({ columnID: '', tasks: [] })
const inProgress = ref({ columnID: '', tasks: [] })
const inReview = ref({ columnID: '', tasks: [] })
const done = ref({ columnID: '', tasks: [] })

const projectID = useProjectId()



const fetchBoard = async (pid: string) => {
  console.log("Fetching board for project:", pid)
  const { data } = await useFetch(`http://localhost:4000/project/${pid}`)
  if (data.value) {
    const columns = data.value.data
    columns.forEach((col: any) => {
      const columnData = {
        columnID: col.columnID,
        tasks: col.tasks.map(task => ({
          title: task.title,
          tag: task.level,
          date: task.deadline,
          taskId: task.taskID,
          src: task.avatarList ?? []
        }))
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
}
watch(() => projectID.projectId, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    await fetchBoard(newVal)
  }
}, { immediate: true })
const handleTaskUpdate = async ({ task, fromColumnId, toColumnId }) => {
  if (fromColumnId === toColumnId) return;

  try {
    // Update backend
    await $fetch('http://localhost:4000/movingTask', {
      method: 'POST',
      body: {
        fromColumnId,
        toColumnId,
        taskID: task.taskId,
      },
    });

    // Update frontend state
    const columns = { todo, inProgress, inReview, done };
    let fromColumn = null;
    let toColumn = null;

    // Find source and target columns
    for (const [key, column] of Object.entries(columns)) {
      if (column.value.columnID === fromColumnId) fromColumn = column.value;
      if (column.value.columnID === toColumnId) toColumn = column.value;
    }

    if (fromColumn && toColumn) {
      // Remove task from source column
      fromColumn.tasks = fromColumn.tasks.filter((t: Task) => t.taskId !== task.taskId);
      // Add task to target column
      toColumn.tasks = [{ ...task }, ...toColumn.tasks];
    }
  } catch (error) {
    console.error('Failed to move task:', error);
    // Optionally, refetch board to revert to backend state
    await fetchBoard(projectID.projectId);
  }



}
</script>


<template>
    <Card class="mx-4 mb-4 ">
      <CardHeader>
        <CardTitle>Hello</CardTitle>
        <CardDescription> Overview of your project</CardDescription>
      </CardHeader>
      <div class="grid h-5/6 mx-4  gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Column :column-id="todo.columnID" :title="'TO DO'"  :data-array="todo.tasks" class="border-t-4 border-purple-300" @update-tasks="handleTaskUpdate"/>
        <Column :column-id ="inProgress.columnID"  :title="'IN PROGRESS'" :data-array="inProgress.tasks" class="border-t-4 border-yellow-300" @update-tasks="handleTaskUpdate"/>
        <Column :column-id="inReview.columnID" :title="'IN REVIEW'" :data-array="inReview.tasks" class="border-t-4 border-blue-300" @update-tasks="handleTaskUpdate"/>
        <Column :column-id="done.columnID" :title="'DONE'"  :data-array="done.tasks" class="border-t-4 border-green-300" @update-tasks="handleTaskUpdate"/>
      </div>

    </Card>
</template>

