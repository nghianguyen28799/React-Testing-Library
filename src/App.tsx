import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Skills } from './components/skills/Skills'
import { Counter } from './components/counter/counter'
import { AppProviders } from './components/providers/AppProviders'
import { MuiMode } from './components/mode/mode'
import SignIn from './components/react-hook-form/SignIn'
import { Container } from '@mui/material'

function App() {
  const skills = ['HTML', 'CSS', 'Javascript']
  const login = async (email: string, password: string, remember: boolean) => {
    return { email, password, remember }
  }
  return (
    <AppProviders>
      <Container sx={{ p: 2 }}>
        {/* <Skills skills={skills} /> */}
        {/* <Counter /> */}
        {/* <MuiMode /> */}
        <SignIn login={login} />
      </Container>
    </AppProviders>
  )
}

export default App
