import React from 'react'
import { GreetProps } from './greet.types'

export const Greet = ({ name }: GreetProps) => {
  return (
    // <div>Hello {name ? name : "Guest"}</div> // branch 50%
    <div>Hello {name}</div> // branch 50%
  )
}
