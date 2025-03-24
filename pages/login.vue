<script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'
  import {useForm} from "vee-validate";

  const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password :z.string().min(1)
  }))
  const router = useRouter()
  const { handleSubmit, defineField, errors } = useForm({
    validationSchema: formSchema,
  })
  const handleLogin = async () => {
    const { data, error, status } = await useFetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    console.log(status.value);

    if (status.value === 'success') {
      router.push('/main');
    } else {
      console.error('Login failed:', error.value);
    }
  };




  const [email] = defineField('email')
  const [password] = defineField('password')
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen ">
    <img class="h-24 mb-2 z-10" src="/assets/img/image_2025-03-19_105508347-removebg-preview.png " alt="Icon" >
    <Tabs default-value="login" class="w-96 z-10 "  >
      <TabsList class="grid w-full grid-cols-2 shadow-lg" >
        <TabsTrigger value="login">
          Login
        </TabsTrigger>
        <TabsTrigger value="recovery">
          Forgot Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" >
        <Card class="mt-2">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please login in to continue to Platform
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <FormField name="email" >
                <FormItem >
                  <FormLabel>Email</FormLabel>
                  <Input v-model="email" type="email" />
                  <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
                </FormItem>
              </FormField>
              <FormField name="password" >
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input v-model="password" type="password" />
                  <p v-if="errors.password" class="text-red-500 text-sm">Required</p>
                </FormItem>
              </FormField>
            </div>
          </CardContent>
          <CardFooter>
                <Button type="submit" @click="handleLogin" class="w-full">Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="recovery">
        <Card class="mt-2">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your Email to retrieve your account
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
              <FormField name="email" >
                <FormItem >
                  <FormLabel>Email</FormLabel>
                  <Input v-model="email" type="email" />
                  <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
                </FormItem>
              </FormField>
          </CardContent>
          <CardFooter>
            <Button type="submit" class="w-full">Retrieve Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  <ParticlesBg class="w-screen h-screen absolute inset-0"/>


</template>

