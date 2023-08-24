"use client"

import { useRouter } from 'next/navigation'

import {Card,
  Input,
  Checkbox,
  Button,
  Typography,} from '../components/material/mui'

export default function Home() {
  const router = useRouter()
  return (
    <div className='flex justify-center mt-20'>
      <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Welcome.
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter credentials to Login.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" />
          
          <Input type="password" size="lg" label="Password" />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth onClick={()=>{router.push('/main')}}>
          Login
        </Button>
      </form>
    </Card>
    </div>
    
  )
}
