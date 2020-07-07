import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const Header = ({ siteTitle }) => {
  return (
    <header
      style={{
        background: `#f2f2f2`,
        marginBottom: `1.45rem`,
        borderBottom: `1px solid #dedede`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1100,
          padding: `1.45rem 1.0875rem`,
          alignItems: `center`,
        }}
      >
        <h1 style={{ margin: 0, fontSize: `1rem` }}>
          <Link
            to="/"
            style={{
              textDecoration: `none`,
              color: `black`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
