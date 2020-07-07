import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const navItems = [
  // `Beliefs`,
  `Advice`,
  `Words`,
  `Quotes`,
  // `Funnies`,
  `Learnings`,
]

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <h2 style={{ fontSize: `4rem`, marginBottom: 0, marginTop: `100px` }}>
        Welcome,
      </h2>
      <p
        style={{
          marginLeft: `5px`,
          fontSize: `1.25rem`,
          fontFamily: `Courier`,
        }}
      >
        to my brain dump.
      </p>
      <nav style={{ marginTop: `50px` }}>
        <ul style={{ margin: 0, listStyle: `none` }}>
          {navItems.map(item => (
            <li
              key={item}
              style={{ display: `inline-block`, margin: `0 25px 20px 5px` }}
            >
              <Link
                to={`/${item.toLowerCase()}`}
                style={{
                  color: `#32a852`,
                  fontWeight: `bold`,
                  fontFamily: `Courier`,
                }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Layout>
  )
}

export default IndexPage
