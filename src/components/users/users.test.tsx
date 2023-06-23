import { render, screen } from '@testing-library/react'
import { Users } from './users'
import { server } from '../../mocks/users/server'
import { rest } from 'msw'

describe('users', () => {
  test('render correctly', () => {
    render(<Users />)
    const textElement = screen.getByRole('heading', {
      name: 'Users',
    })
    expect(textElement).toBeInTheDocument()
  })

  test('renders a list of users', async () => {
    render(<Users />)
    const users = await screen.findAllByRole('listitem')
    expect(users).toHaveLength(3)
  })

  test('render errors', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users',
        (req, res, ctx) => {
          return res(ctx.status(500))
        }
      )
    )
    render(<Users />)
    const error = await screen.findByText('Error fetching users')
    expect(error).toBeInTheDocument()
  })
})
