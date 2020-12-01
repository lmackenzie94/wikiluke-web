import styled, { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

  :root {
    --theme: ${props => props.themeColour};
    --green: #32a852;
    --gray: #c2c2c2;
    --grey: var(--gray);
    --lightGray: #f2f2f2;
    --lightGrey: var(--lightGray);
    --headingFont: "Courier", Courier, monospace;
    --bodyFont: "Arial", sans-serif;
  }
  html {
    font-size: 125%; // 20px
  }
  body {
    font-size: .8rem; // 16px
    font-family: var(--bodyFont);
    line-height: 1.35;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: var(--headingFont);
    font-weight: bold;
    line-height: 1.25;
  }

  a {
    color: var(--theme);
  }

  .customScrollbar::-webkit-scrollbar {
  width: 0.3em;
}

.customScrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
}

.customScrollbar::-webkit-scrollbar-thumb {
  background-color: var(--theme);
}

a.removeVisitedStyle:visited {
  color: rgb(0, 0, 238);
}

table {
  width: 100%;
  table-layout: fixed;
}
 
th.word {
  width: 180px;
}

@media only screen and (max-width: 480px) {
   body {
    font-size: 0.75rem;
  }
  th.word {
    width: 150px;
  }
}
`

export const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  @media only screen and (max-width: 480px) {
    padding: 0 1rem;
  }
`

export default GlobalStyles
