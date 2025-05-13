<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { ref, computed } from 'vue'



const { data: response, refresh } = await useFetch('http://localhost:4000/account')
const users = computed(() => response.value?.data || [])

const newEmail = ref('')
const newUsername = ref('')
const newRole = ref('STAFF')
const newPassword = ref('')

const emailToDelete = ref<string | null>(null)

const handleAddAccount = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      console.error('Chưa đăng nhập hoặc token không tồn tại')
      return
    }

    const payload = {
      email: newEmail.value,
      userName: newUsername.value,
      password: newPassword.value,
      role: newRole.value,
    }

    const response = await $fetch('http://localhost:4000/createNewAccount', {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: accessToken
      }
    })

    if (response.status === 200) {
      console.log('Tạo tài khoản thành công:', response.data)
      await refresh()
    } else {
      console.error('Tạo tài khoản thất bại:', response.message)
    }

    newEmail.value = ''
    newUsername.value = ''
    newPassword.value = ''
    newRole.value = 'STAFF'
  } catch (error) {
    console.error('Lỗi khi gọi API tạo tài khoản:', error)
  }
}


const handleConfirmDelete = async () => {
  if (!emailToDelete.value) return

  try {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      console.error('Chưa đăng nhập hoặc token không tồn tại')
      return
    }

    const response = await $fetch('http://localhost:4000/account', {
      method: 'DELETE',
      body: { email: emailToDelete.value },
      headers: {
        Authorization: accessToken
      }
    })

    if (response.status === 200) {
      console.log('Xóa tài khoản thành công:', response.data)
      await refresh()
    } else {
      console.error('Xóa tài khoản thất bại:', response.message)
    }
  } catch (error) {
    console.error('Lỗi khi gọi API xóa tài khoản:', error)
  } finally {
    emailToDelete.value = null
  }
}

</script>
<template>
  <div class="px-9">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Account Management</h2>

      <Dialog>
        <DialogTrigger as-child>
          <Button>Add Account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
          </DialogHeader>
          <div class="space-y-2 py-2">
            <input v-model="newEmail" placeholder="Email" class="w-full border p-2 rounded" />
            <input v-model="newUsername" placeholder="Username" class="w-full border p-2 rounded" />
            <input v-model="newPassword" type="password" placeholder="Password" class="w-full border p-2 rounded" />
            <select v-model="newRole" class="w-full border p-2 rounded">
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="PROJECT_OWNER">PROJECT_OWNER</option>
              <option value="HEAD_OF_MARKETING">HEAD_OF_MARKETING</option>
            </select>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose as-child>
              <Button @click="handleAddAccount">Add</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
            v-for="user in users"
            :key="user.email"
            class="group hover:bg-gray-100 transition-all"
        >
          <TableCell class="font-medium">{{ user.email }}</TableCell>
          <TableCell>{{ user.userName }}</TableCell>
          <TableCell>{{ user.role }}</TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger as-child>
                <Button
                    variant="destructive"
                    size="sm"
                    class="opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="emailToDelete = user.email"
                >
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete <strong>{{ emailToDelete }}</strong>?</p>
                <DialogFooter>
                  <DialogClose as-child>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose as-child>
                    <Button variant="destructive" @click="handleConfirmDelete">Delete</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
