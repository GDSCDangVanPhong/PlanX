<script setup lang="ts">
    // const props = defineProps<{
    //   title : string,
    //   // tasks : []
    // }>()
    import { Calendar,SquarePlus,MessageSquare } from 'lucide-vue-next';


    import AvatarGroup from "~/components/CustomizedComps/AvatarGroup.vue";
    import draggable from 'vuedraggable';
    const avatarList = [
      { src: 'https://i.pravatar.cc/150?img=1' },
      { src: 'https://i.pravatar.cc/150?img=2' },
      { src: 'https://i.pravatar.cc/150?img=3' },
      { src: 'https://i.pravatar.cc/150?img=4' },
      { src: 'https://i.pravatar.cc/150?img=5' },
    ];
</script>

<template>
  <div class="rounded-xl bg-muted/100 h-full px-2 pt-2 ">
      <Button :variant="'outline'"  class="mb-2 w-full">
        <SquarePlus class="w-4 h-4 mt-0.5" />
        New Task
      </Button>

      <Card class="flex-1 cursor-pointer hover:bg-muted/50 mb-1.5" d>
        <CardHeader >
          <CardTitle class="flex">
            <span class="text-md font-semibold w-3/4 break-words">Planning a dinner at the center of city</span>
            <Badge class="ml-auto h-6 bg-pink-700 hover:bg-pink-700">
              High
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex  ">
            <div class="flex border rounded-md border-dashed items-center space-x-1 p-1.5 border-green-600 w-1/2">
              <Calendar class="h-4"/>
              <span class="text-sm text-slate-700" >29/03/2025</span>
            </div>
            <AvatarGroup :avatars="avatarList"  :max-visible="1" :size="'sm'" class=" ml-auto w-1/4" />
          </div>
        </CardContent>
        <div>
          <Separator />
          <div class="flex px-2 pt-2 items-center mb-2">
            <MessageSquare color="#696969" class="w-4 h-4 mr-1 "/>
            <span class="text-muted-foreground">2</span>
          </div>
        </div>
      </Card>


    <Card class="flex-1 cursor-pointer hover:bg-muted/50" draggable="true">
      <CardHeader >
        <CardTitle class="flex">
          <span class="text-md font-semibold w-3/4 break-words">Go Shopping</span>
          <Badge class="ml-auto h-6 bg-blue-600 hover:bg-blue-600">
            Medium
          </Badge>
        </CardTitle>

      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  </div>
</template>

