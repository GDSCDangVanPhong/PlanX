<script setup lang="ts">

import LevelSelector from "~/components/CustomizedComps/Selector/LevelSelector.vue";
</script>

<template>
      <Dialog>
        <DialogTrigger class="w-full">
              <slot />
        </DialogTrigger>
        <DialogContent class="w-full ">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Adding new task to column</DialogDescription>
          </DialogHeader>
            <form>
              <FormField v-slot="{ componentField }" name="Title" >
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter title" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
                <FormItem class="mt-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter description" />
                </FormControl>
                <FormMessage/>
              </FormItem>
                <div class="mt-3 flex gap-5">
                    <div class="w-2/3 space-y-2">
                      <FormLabel >Level</FormLabel>
                      <LevelSelector/>
                    </div>
                  <div class="w-2/3 space-y-2 ml-auto">
                    <FormLabel >Deadline</FormLabel>
                    <LevelSelector/>
                  </div>
                </div>
              </FormField>
            </form>
          <DialogFooter>
            <Button class="w-full mt-2">Submit</Button>
        </DialogFooter>
        </DialogContent>

      </Dialog>
</template>

