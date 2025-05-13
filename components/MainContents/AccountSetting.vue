<script setup lang="ts">
import { ref, onMounted } from 'vue'

const userId = 'your-user-id' // Có thể lấy từ token/session
const user = ref({
  id: '',
  email: '',
  userName: '',
  fullName: '',
  password: '',
  avatarUrl: ''
})
const projects = ref<Array<{ id: string; name: string; role: string }>>([])

const selectedFile = ref<File | null>(null)
const previewUrl = ref('')


const fetchUserData = async () => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    console.error('No access token found')
    return
  }

  const res = await $fetch('http://localhost:4000/user', {
    headers: {
      Authorization: accessToken
    }
  })

  user.value = res.data
  previewUrl.value = res.data.avatarUrl
}


const fetchUserProjects = async () => {
  const res = await $fetch(`/api/user/${userId}/projects`)
  projects.value = res
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const handleSubmit = async () => {
  const form = new FormData()
  const info = {
    userName: user.value.userName,
    fullName: user.value.fullName,
    password: user.value.password
  }
  form.append('info', new Blob([JSON.stringify(info)], { type: 'application/json' }))

// Append file nếu có
  if (selectedFile.value) {
    form.append('file', selectedFile.value)
  }

  const accessToken = localStorage.getItem('accessToken')

  const updated = await $fetch('http://localhost:4000/userModify', {
    method: 'PUT',
    body: form,
    headers: {
      Authorization: accessToken
    }
  })

  user.value = updated
  previewUrl.value = updated.avatarUrl
}

onMounted(() => {

  fetchUserData()
  fetchUserProjects()
})
</script>

<template>
  <div class="grid grid-cols-2 px-4 h-full gap-4">
    <!-- LEFT CARD -->
    <Card class="h-5/6">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Changing information as you may need</CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="flex mb-5">
          <Avatar class="h-24 w-24">
            <AvatarImage :src="previewUrl" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input type="file" class="cursor-pointer ml-5 w-52 mt-auto" @change="handleFileChange" />
        </div>

        <div>
          <p class="font-semibold">Account ID</p>
          <p class="text-sm text-muted-foreground">{{ user.id }}</p>
        </div>

        <div>
          <p class="font-semibold">Email</p>
          <p class="text-sm text-muted-foreground">{{ user.email }}</p>
        </div>

        <div class="grid grid-cols-2 gap-x-5">
          <div>
            <Label class="font-semibold text-md">Username</Label>
            <Input v-model="user.userName" />
          </div>
          <div>
            <Label class="font-semibold text-md">Password</Label>
            <Input type="password" v-model="user.password" />
          </div>
        </div>

        <div>
          <Label class="font-semibold text-md">Full Name</Label>
          <Input v-model="user.fullName" />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="ml-auto" @click="handleSubmit">Submit</Button>
      </CardFooter>
    </Card>

    <!-- RIGHT CARD -->
    <Card class="h-5/6">
      <CardHeader>
        <CardTitle>User Projects</CardTitle>
        <CardDescription>This user is assigned to the following projects</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project ID</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-for="(project, index) in projects" :key="index">
              <TableCell>{{ project.id }}</TableCell>
              <TableCell>{{ project.name }}</TableCell>
              <TableCell>
                <Badge variant="secondary">{{ project.role }}</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
