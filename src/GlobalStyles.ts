import { createGlobalStyle } from 'styled-components'

export const colors = {
  text: '#444',
  bg: 'hsla(60, 50%, 50%)',
}

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-weight: 400;
  }

  h2 {
    font-size: 1.00rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin: 0 0 1rem;
  }

  * {
    font-family: 'Roboto;'
    line-height: 1.4;
    box-sizing: border-box;
    letter-spacing: 0.25px;
    color: ${colors.text};
  }
  `
