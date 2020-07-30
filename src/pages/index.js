import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import styled from "styled-components"

const navItems = [
  // `Beliefs`,
  `Advice`,
  `Words`,
  `Quotes`,
  // `Funnies`,
  `Learnings`,
  `Book Notes`,
  `Highlights`,
]

const IndexStyles = styled.div`
  h2 {
    font-size: 3rem;
    margin: 100px 0 0 0;
  }
  p {
    margin: 0 0 0 5px;
    font-size: 1rem;
    font-family: var(--headingFont);
  }
`

const NavStyles = styled.nav`
  margin-top: 50px;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: inline-block;
      margin: 0 25px 20px 5px;
      a {
        color: var(--green);
        font-weight: bold;
        font-family: var(--headingFont);
      }
    }
  }
`

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <IndexStyles>
        <h2>Welcome,</h2>
        <p>to my brain dump.</p>
      </IndexStyles>
      <NavStyles>
        <ul>
          {navItems.map(item => (
            <li key={item}>
              <Link to={`/${item.toLowerCase().replace(" ", "-")}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </NavStyles>
    </Layout>
  )
}

export default IndexPage
