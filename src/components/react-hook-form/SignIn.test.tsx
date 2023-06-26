import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SignIn from './SignIn'

const mockLogin = jest.fn((email: string, password: string) => {
  return Promise.resolve({ email, password })
})

describe('Sign In Testing', () => {
  test('should display 2 elements are email and password', () => {
    render(<SignIn login={mockLogin} />)
    const emailElement = screen.getByRole('textbox', {
      name: /email/i,
    })

    const passwordElement = screen.getByLabelText(/password/i)
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

  test('should display matching error when email is invalid', async () => {
    render(<SignIn login={mockLogin} />)

    const emailElement = screen.getByRole('textbox', {
      name: /email/i,
    })

    const passwordElement = screen.getByLabelText(/password/i)

    fireEvent.input(emailElement, {
      target: {
        value: 'test',
      },
    })

    fireEvent.input(passwordElement, {
      target: {
        value: 'password',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: 'SUBMIT',
      })
    )
    const textMessageEmail = await screen.findByText(
      'Entered value does not match email format'
    )
    expect(textMessageEmail).toBeInTheDocument()
    expect(mockLogin).not.toBeCalled()
    expect(emailElement).toHaveValue('test')
    expect(passwordElement).toHaveValue('password')
  })

  test('should display min length error when password is invalid', async () => {
    render(<SignIn login={mockLogin} />)

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
      {
        target: {
          value: 'test@gmail.com',
        },
      }
    )

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: '1234',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: 'SUBMIT',
      })
    )
    expect(await screen.findByText('min length is 5')).toBeInTheDocument()
    expect(mockLogin).not.toBeCalled()
    expect(
      screen.getByRole('textbox', {
        name: /email/i,
      })
    ).toHaveValue('test@gmail.com')
    expect(screen.getByLabelText(/password/i)).toHaveValue('1234')
  })

  it('should not display error when value is valid', async () => {
    render(<SignIn login={mockLogin} />)

    fireEvent.input(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
      {
        target: {
          value: 'test@gmail.com',
        },
      }
    )

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'password',
      },
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: 'SUBMIT',
      })
    )

    await waitFor(() =>
      expect(screen.queryByText(/required/i)).not.toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.queryByText(/min length is 5/i)).not.toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.queryByText(/not match email/i)).not.toBeInTheDocument()
    )
    await waitFor(() => expect(mockLogin).toBeCalledWith("test@gmail.com", "password"))
    await waitFor(() =>
      expect(
        screen.getByRole('textbox', {
          name: /email/i,
        })
      ).toHaveValue('')
    )
    expect(screen.getByLabelText(/password/i)).toHaveValue('')
  })
})
