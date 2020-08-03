import React, { useLayoutEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "normalize.css"
import GlobalStyles, { Wrapper } from "./styles/GlobalStyles"
import { useThemeColour } from "../contexts/themeColourContext"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [themeColour, setThemeColour] = useThemeColour()

  useLayoutEffect(() => {
    const color = localStorage.getItem("themeColour") || "#008b02"
    setThemeColour(color)
  }, [])

  return (
    <>
      <GlobalStyles themeColour={themeColour} />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Wrapper>
        <main>{children}</main>
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
