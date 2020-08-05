import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import styled from "styled-components"
import { motion as M } from "framer-motion"

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
        font-weight: bold;
        font-family: var(--headingFont);
      }
    }
  }
`

const ulVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
}

const liVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
}

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <IndexStyles>
        <M.h2
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Welcome,
        </M.h2>
        <M.p
          initial={{ x: -25, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          to my brain dump.
        </M.p>
      </IndexStyles>
      <NavStyles>
        <M.ul variants={ulVariants} initial="hidden" animate="show">
          {navItems.map(item => (
            <M.li key={item} variants={liVariants}>
              <Link to={`/${item.toLowerCase().replace(" ", "-")}`}>
                {item}
              </Link>
            </M.li>
          ))}
        </M.ul>
      </NavStyles>
    </Layout>
  )
}

export default IndexPage
