<script setup lang="ts">


import {ResizableHandle, ResizablePanelGroup} from "~/components/ui/resizable";
import {SplitterPanel} from "reka-ui";
import {Textarea} from "~/components/ui/textarea";
import CommentsComponent from "~/components/CustomizedComps/CommentsComponent.vue";
import LeftHandlePanel from "~/components/CustomizedComps/KanBanComps/LeftHandlePanel.vue";

const comments =[
  {
    username : 'Van Phong',
    avatar : 'asdakdaskdadka',
    content : 'asdaskdjashdaskdhaskdashdkasdasd'
  },
  {
    username : 'Hai Lam',
    avatar : 'asdakdaskdadka',
    content : 'Khoogn coasdcasd'
  },
  {
    username : 'Dien',
    avatar : 'asdakdaskdadka',
    content : 'adsdasdasdasda'
  },

]


</script>

<template>
      <Dialog  >
          <DialogTrigger  class="w-full">
              <slot/>
          </DialogTrigger>
        <DialogContent class="!w-11/12 !max-w-none !px-6 ">
          <ResizablePanelGroup
              id="vertical-demo-group-1"
              direction="horizontal"
              class="min-h-[200px] max-w-full rounded-lg border mt-4"
          >
            <SplitterPanel :min-size="35"  :default-size="50" class="w-full ">

                <div class="px-4" >
                  <h1 class="font-bold text-lg">Thiết kế giao diện</h1>
                  <p class="font-semibold text-md mt-2">Description</p>
                  <p class="break-words">Thiết kế giao diện cho banner quảng cáo</p>
                  <p class="font-bold mt-14">Comments</p>
                  <div class="flex space-x-3">
                    <Avatar class="w-8 h-8 mt-2" >
                      <AvatarImage  src =''>
                      </AvatarImage >
                      <AvatarFallback >CN</AvatarFallback>
                    </Avatar>
                    <Textarea  class="mt-2 mb-1"></Textarea>
                  </div>
                </div>
                <ScrollArea class="h-24 mt-4">
                    <div v-for="item in comments" class="px-4 mt-2.5">
                      <CommentsComponent :avatar="item.avatar" :content="item.content" :username="item.username" />
                      <Separator class="mt-1"/>
                    </div>
                </ScrollArea>

            </SplitterPanel>
            <ResizableHandle with-handle />
            <SplitterPanel id="vertical-demo-panel-2" :default-size="50">
              <div class="px-4">
                <LeftHandlePanel/>
              </div>
            </SplitterPanel>
          </ResizablePanelGroup>
        </DialogContent>
      </Dialog>
</template>

