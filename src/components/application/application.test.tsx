import { render, screen } from '@testing-library/react'
import { Application } from './application'

describe('Application', () => {
  test('render correctly', () => {
    render(<Application />)
    //heading
    const pageHeading = screen.getByRole('heading', {
      // name: "Job application form"
      // or
      level: 1,
    })
    const sectionHeading = screen.getByRole('heading', {
      // name: "Section 1"
      level: 2,
      // or
    })
    expect(pageHeading).toBeInTheDocument()
    expect(sectionHeading).toBeInTheDocument()

    // text, paragraph
    const paragraphElement = screen.getByText('All fields are mandatory')
    const spanElementByTitle = screen.getByTitle('close')

    expect(paragraphElement).toBeInTheDocument()
    expect(spanElementByTitle).toBeInTheDocument()
    // textbox
    const textBoxElementNameIsName = screen.getByRole('textbox', {
      name: 'Name',
    })
    const textBoxElementNameIsBio = screen.getByRole('textbox', {
      name: 'Name',
    })
    const textBoxElementByLabel = screen.getByLabelText('Name')
    const textBoxElementByLabel2 = screen.getByLabelText('Name', {
      selector: 'input',
    })
    const textBoxElementByPlaceholder = screen.getByPlaceholderText('Fullname')
    const textBoxElementByValue = screen.getByDisplayValue('Vishwas')

    expect(textBoxElementNameIsName).toBeInTheDocument()
    expect(textBoxElementNameIsBio).toBeInTheDocument()
    expect(textBoxElementByLabel).toBeInTheDocument()
    expect(textBoxElementByLabel2).toBeInTheDocument()
    expect(textBoxElementByPlaceholder).toBeInTheDocument()
    expect(textBoxElementByValue).toBeInTheDocument()
    // checkbox
    const checkBoxElement = screen.getByRole('checkbox')
    const checkBoxElementByLabel = screen.getByLabelText(
      'I agree to the terms and conditions'
    )

    expect(checkBoxElement).toBeInTheDocument()
    expect(checkBoxElementByLabel).toBeInTheDocument()
    // button
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
    // select
    const comboBoxElement = screen.getByRole('combobox')
    expect(comboBoxElement).toBeInTheDocument()
    // image
    const imageElement = screen.getByAltText('a person with a laptop')
    expect(imageElement).toBeInTheDocument()

    // div
    const divElementByTestId = screen.getByTestId('custom-element')
    expect(divElementByTestId).toBeInTheDocument()
  })
})
