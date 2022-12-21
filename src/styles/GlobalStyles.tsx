import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle<{ language: string }>`
  ${normalize}

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-family: ${({ language, theme }) =>
      theme.typography.fontFamily[language]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  body {
    margin: 0 auto;
    padding: 0;
    font-family: ${({ language, theme }) =>
      theme.typography.fontFamily[language]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.body.S};
    font-style: ${({ theme }) => theme.typography.fontStyle};
    font-display: ${({ theme }) => theme.typography.fontDisplay};
    line-height: ${({ theme }) => theme.typography.lineHeight.XS};
    color: ${({ theme }) => theme.text.light.primary};
    background-color: ${({ theme }) => theme.background.dark.primary};
    font-stretch: normal;
    user-select: none;
    overflow: hidden;
    vertical-align: baseline;
    height: 100vh;

    div#__next {
      height: 100%;
    }

    /* remove iOS touch tap highlight */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -webkit-touch-callout: none;

    button {
      all: unset;
    }
    input {
      all: unset;
    }

    a,
    a:hover {
      text-decoration: none;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    }

    .react-tooltip-container{
      border-radius: 8px;
      box-shadow: none;
      outline: none;
      border: none;
      padding: 12px 16px;
    }
  }
`;
