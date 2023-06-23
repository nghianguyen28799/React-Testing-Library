import { MuiMode } from './mode'
import { AppProviders } from '../providers/AppProviders'
import { render, screen } from '../../test-utils'

describe('test mode', () => {
  test('renders text dark mode', () => {
    render(<MuiMode />)
    const headingElement = screen.getByRole('heading')
    expect(headingElement).toHaveTextContent('dark mode')
  })

  test('renders text in white color for dark mode', () => {
    render(<MuiMode />)
    const headingElement = screen.getByRole('heading')
    expect(headingElement).toHaveStyle({ color: "'#fff'" })
  })
})
