<script setup lang="ts">
import { Check } from 'lucide-vue-next';
const Undone =5
const Done =10
import { SquareCheck } from 'lucide-vue-next';
const data = [
  { name: 'Done Tasks', total: Done },
  { name: 'Undone Tasks', total: Undone},

]
const DoneIcon = Check
</script>

<template>
  <Card >
    <CardHeader>
      <CardTitle>Your Progress</CardTitle>
      <CardDescription>Tracking your contribution in each project</CardDescription>
    </CardHeader>
    <CardContent>
        <div class="flex ">
          <DonutChart
              index="name"
              :data="data"
              :type='"donut"'
              :category ="'total'"
          />
          <div class="flex ml-14 space-y-1 flex-col justify-end ">
            <div class="flex space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#13b982" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></g></svg>
              <span class="text-sm text-muted-foreground">Done Tasks</span>
            </div>
            <div class="flex space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#000" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></g></svg>
              <span class="text-sm text-muted-foreground">Undone Tasks</span>
            </div>
          </div>
        </div>




    </CardContent>

  </Card>

</template>
