import { act, fireEvent, render, screen } from '@testing-library/react'
import SignIn from './SignIn'

const mockLogin = jest.fn((email: string, password: string) => {
  return Promise.resolve({ email, password })
})

describe('Sign In Testing', () => {
  test('should display 2 elements are email and password', () => {
    const emailElement = screen.getByRole('textbox', {
        name: /email/i
      })

    const passwordElement = screen.getByRole('textbox', {
        name: /password/i
    })
    expect(emailElement).toBeInTheDocument()
    expect(passwordElement).toBeInTheDocument()
  })

  test('should display required error when value is invalid', async () => {
    render(<SignIn login={mockLogin} />)

    const submitButton = screen.getByRole('button', {
      name: 'SUBMIT',
    })
    fireEvent.click(submitButton)
    const getAlertByRole = await screen.findAllByText('required')
    expect(getAlertByRole).toHaveLength(2)
  })

//   test('should display matching error when email is invalid', () => {
//     render(<SignIn login={mockLogin} />)

//     const emailElement = screen.getByRole('input', {
//       name: /email/i,
//     })

//     const passwordElement = screen.getByRole('input', {
//       name: /password/i,
//     })

//     expect()
//   })
})
