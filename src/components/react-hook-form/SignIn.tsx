import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
  remember: boolean
}

type LoginProps = {
  login: (
    email: string,
    password: string,
    remember: boolean
  ) => Promise<{ email: string; password: string; remember: boolean }>
}

const SignIn = ({ login }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await login(data.email, data.password, data.remember)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <TextField
          id="email"
          label="Email"
          {...register('email', {
            required: 'required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          type="email"
          helperText={errors.email && errors.email.message}
          error={!!errors.email}
        />

        <TextField
          id="password"
          label="Password"
          {...register('password', {
            required: 'required',
            minLength: {
              value: 5,
              message: 'min length is 5',
            },
          })}
          type="password"
          helperText={errors.password && errors.password.message}
          error={!!errors.password}
        />
        <FormControlLabel
          control={<Checkbox {...register('remember')} />}
          label="Remember password"
        />
        <Button type="submit" variant="contained">
          SUBMIT
        </Button>
      </Box>
    </form>
  )
}

export default SignIn
