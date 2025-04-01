<script setup lang="ts">

import {Calendar, MessageSquare} from "lucide-vue-next";
import AvatarGroup from "~/components/CustomizedComps/AvatarGroup.vue";


const data = defineProps<{
    title: string;
    date: string;
    comments : number;
    avatarList: { src: string }[],
    level :string
}>()

</script>

<template>
  <Card class="flex-1 cursor-pointer hover:bg-muted/50 mb-1.5" >
    <CardHeader >
      <CardTitle class="flex">
        <span class="text-md font-semibold w-3/4 break-words">{{ data.title }}</span>
        <div class="ml-auto h-6 ">
          <Badge v-if="level==='High'" class="p-1 bg-pink-700 hover:bg-pink-700">
          {{data.level}}
          </Badge>
          <Badge v-if="level==='Medium'" class="p-1 bg-blue-500 hover:bg-blue-500">
            {{data.level}}
          </Badge>
          <Badge v-if="level==='Low'" class="p-1 bg-slate-500 hover:bg-slate-500">
            {{data.level}}
          </Badge>
        </div>

      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex  ">
        <div class="flex border rounded-md border-dashed items-center space-x-1 p-1.5 border-green-600 w-1/2">
          <Calendar class="h-4"/>
          <span class="text-sm text-slate-700" >{{ data.date }}</span>
        </div>
        <AvatarGroup :avatars="data.avatarList"  :max-visible="1" :size="'sm'" class=" ml-auto w-1/4" />
      </div>
    </CardContent>
    <div>
      <Separator />
      <div class="flex px-2 pt-2 items-center mb-2">
        <MessageSquare color="#696969" class="w-4 h-4 mr-1 "/>
        <span class="text-muted-foreground">{{data.comments}}</span>
      </div>
    </div>
  </Card>
</template>

