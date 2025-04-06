<script setup lang="ts">

</script>

<template>
      <div class="mt-2">
        <div class="max-w-fit">
          <Select  >
            <SelectTrigger class="bg-red-400" >
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent class="w-16">
              <SelectGroup>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="border px-2 mt-2 rounded-md">
            <span class="font-semibold">Detail</span>
            <div class="mt-6">
              <span>Assignee</span>
            </div>
        </div>
      </div>
</template>

