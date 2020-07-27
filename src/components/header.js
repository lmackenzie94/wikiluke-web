import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Wrapper } from "./styles/globalStyles"

const HeaderStyles = styled.header`
  background: var(--lightGray);
  margin-bottom: 1.45rem;
  border-bottom: 1px solid #dedede;
  h1 {
    margin: 0;
    padding: 1rem 0;
    font-size: 1rem;
    a {
      text-decoration: none;
      color: black;
    }
  }
`

const Header = ({ siteTitle }) => {
  return (
    <HeaderStyles>
      <Wrapper>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </Wrapper>
    </HeaderStyles>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `wikiluke`,
}

export default Header
