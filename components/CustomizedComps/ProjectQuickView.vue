<script setup lang="ts">
  const data =[
    {
      "name": "Sofia Davis",
      "email": "m@example.com",
      "role": "Owner"
    },
    {
      "name": "Jackson Lee",
      "email": "p@example.com",
      "role": "Member"
    },
    {
      "name": "Isabella Nguyen",
      "email": "i@example.com",
      "role": "Member"
    }
  ]
</script>

<template>
    <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>Seeing who are you accompaning with</CardDescription>

      </CardHeader>
      <CardContent class="h-28 ">
        <ScrollArea class="h-full w-full px-3">
            <div v-for="item in data" class="mb-2">
                <div class="flex items-center mb-2">
                    <Avatar :shape="'circle'" class="  h-12 w-12">
                        <AvatarFallback>Test</AvatarFallback>
                    </Avatar>
                    <div class="ml-4">
                      <p>{{item.name}}</p>
                      <span class="text-sm text-muted-foreground"> {{item.email}}</span>
                    </div>
                    <Badge class="p-2 ml-auto">{{item.role}}</Badge>
                </div>
                <Separator/>
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
</template>
