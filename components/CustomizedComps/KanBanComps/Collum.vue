<script setup lang="ts">
    // const props = defineProps<{
    //   title : string,
    //   // tasks : []
    // }>()
    import { Calendar,SquarePlus,MessageSquare } from 'lucide-vue-next';


    const todo = ref([
      { title: 'Thiết kế giao diện', date: '2025/04/01', comments: 3, tag : 'High' },
      { title: 'Họp khách hàng', date: '2025/02/02', comments: 1 , tag: 'Medium' },
      { title: 'Mua đồ ăn', date: '2025/06/02', comments: 5 , tag :'Low'},
      { title: 'Xây nhà', date: '2025/09/02', comments: 8 ,tag : 'Medium' },
    ]);

    const inProgress = ref([
      { title: 'Kiểm tra tính năng đăng nhập', date: '2025-03-31', comments: 5 },
      { title: 'Tối ưu hóa database', date: '2025-04-01', comments: 2 },
    ]);

    const inReview = ref([
      { title: 'Xem lại mã nguồn', date: '2025-03-30', comments: 4 },
    ]);

    const done = ref([
      { title: 'Triển khai lên server', date: '2025-03-29', comments: 0 },
      { title: 'Viết tài liệu', date: '2025-03-28', comments: 2 },
    ]);

    import AvatarGroup from "~/components/CustomizedComps/AvatarGroup.vue";
    import draggable from 'vuedraggable';
    import TaskCard from "~/components/CustomizedComps/KanBanComps/TaskCard.vue";
    import CreateTaskDialog from "~/components/CustomizedComps/KanBanComps/CreateTaskDialog.vue";
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
    <div class="px-3.5">
      <CreateTaskDialog class="w-full">
        <Button :variant="'outline'"  class="mb-2 w-full">
          <SquarePlus class="w-4 h-4 mt-0.5 " />
          New Task
        </Button>
      </CreateTaskDialog>
    </div>

    <ScrollArea class="h-96 mt-1 items-center ">
      <draggable v-model="todo" group="tasks" tag="div" class="px-3.5">
        <template #item="{ element }">
          <TaskCard
              :level =element.tag
              :title="element.title"
              :date="element.date"
              :comments="element.comments"
              :avatarList="avatarList"
          />
        </template>
      </draggable>
    </ScrollArea>





  </div>
</template>

