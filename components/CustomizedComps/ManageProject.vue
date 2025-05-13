<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { ref, onMounted } from 'vue'
import { Trash2, Plus } from 'lucide-vue-next'


interface Member {
  id: number
  name: string
  role: string
  email: string
}

const members = ref<Member[]>([])
const projectID = useProjectId()

function removeMember(id: number) {
  members.value = members.value.filter(m => m.id !== id)
}
const addingEmail = ref('')
const addingRole = ref('')
async function fetchMembers() {
  try {
    const projectId = projectID.projectId
    const res = await $fetch(`http://localhost:4000/projectMember/${projectId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })

    members.value = res.data.map((m: any, index: number) => ({
      id: index + 1,
      name: m.userName,
      email: m.email,
      role: m.role
    }))
  } catch (err) {
    console.error('Lỗi khi load danh sách thành viên:', err)
  }
}

async function addMember() {
  try {
    const projectId = projectID.projectId


    const res = await $fetch('http://localhost:4000/addMember', {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('accessToken') ,
        'Content-Type': 'application/json'
      },
      body: {
        projectID: projectId,
        email: addingEmail.value,
        role: addingRole.value
      }
    })



  } catch (err) {
    console.error('Lỗi khi thêm thành viên:', err)
  }
}

onMounted(fetchMembers)
watch(() => projectID.projectId, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    await fetchMembers()
  }
}, { immediate: true })
</script>


<template>
  <div class="p-6 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Project Management</h2>
      <Dialog>
        <DialogTrigger>
          <Button @click="addMember">
            <Plus class="mr-2 w-4 h-4" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Member</DialogTitle>
            <DialogDescription>Adding new to thí project</DialogDescription>
          </DialogHeader>
          <Label>Email</Label>
          <Input v-model="addingEmail"></Input>
          <Select v-model="addingRole">
            <SelectTrigger >
              <SelectValue placeholder="Choose Role"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>

                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="LEADER">Leader</SelectItem>
              </SelectGroup>
            </SelectContent>

          </Select>
          <DialogFooter>
          <Button @click="addMember">Add</Button>
        </DialogFooter>
        </DialogContent>

      </Dialog>

    </div>

    <Card>
      <CardContent class="p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead class="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="member in members" :key="member.id">
              <TableCell>{{ member.name }}</TableCell>
              <TableCell>{{ member.email }}</TableCell>
              <TableCell>{{ member.role }}</TableCell>
              <TableCell class="text-right">
                <Button variant="destructive" size="icon" @click="removeMember(member.id)">
                  <Trash2 class="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
