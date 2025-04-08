<script setup lang="ts">
  import Column from "~/components/CustomizedComps/KanBanComps/Column.vue";
  const todo = ref([
    { title: 'Thiết kế giao diện', date: '2025/04/01', comments: 3, tag : 'High' ,
      src: ['https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2' ]
    },
    { title: 'Họp khách hàng', date: '2025/02/02', comments: 1 , tag: 'Medium',
      src :[ 'https://i.pravatar.cc/150?img=1' ,
        'https://i.pravatar.cc/150?img=2' ,
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4']},

    { title: 'Mua đồ ăn', date: '2025/06/02', comments: 5 , tag :'Low'},
    { title: 'Xây nhà', date: '2025/09/02', comments: 8 ,tag : 'Medium' },
  ]);

  const inProgress = ref([
    { title: 'Kiểm tra tính năng đăng nhập', date: '2025/03/31', comments: 5,tag : 'Medium' , src: ['https://i.pravatar.cc/150?img=1',  'https://i.pravatar.cc/150?img=3' ] },
    { title: 'Tối ưu hóa database', date: '2025-04-01', comments: 2 , tag : 'Medium' , src: ['https://i.pravatar.cc/150?img=1' ] },
  ]);

  const inReview = ref([
    { title: 'Xem lại mã nguồn', date: '2025-03-30', comments: 4 },
  ]);

  const done = ref([
    { title: 'Triển khai lên server', date: '2025-03-29', comments: 0 },
    { title: 'Viết tài liệu', date: '2025-03-28', comments: 2 },
  ]);


</script>

<template>
    <Card class="mx-4 mb-4 ">
      <CardHeader>
        <CardTitle>Hello</CardTitle>
        <CardDescription> Overview of your project</CardDescription>
      </CardHeader>
      <div class="grid h-5/6 mx-4  gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Column :title="'TO DO'"  :data-array="todo" class="border-t-4 border-purple-300"/>
        <Column :title="'IN PROGRESS'" :data-array="inProgress" class="border-t-4 border-yellow-300"/>
        <Column :title="'IN REVIEW'" :data-array="inReview" class="border-t-4 border-blue-300"/>
        <Column :title="'DONE'"  :data-array="done" class="border-t-4 border-green-300"/>
      </div>



    </Card>
</template>

