import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { GrRefresh } from "react-icons/gr"

const Header = ({ siteTitle }) => {
  const handleRebuild = () => {
    fetch("https://api.netlify.com/build_hooks/5ed0087cfbe7dfef8dea49c1", {
      method: "POST",
    })
      .then(res => {
        console.log("REBUILDING...")
      })
      .catch(err => {
        throw new Error(`Build error: ${err}`)
      })
  }
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
          display: `flex`,
          justifyContent: `space-between`,
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
        <button
          onClick={handleRebuild}
          aria-label="rebuild site"
          style={{
            fontSize: `1.5rem`,
            border: `none`,
            outline: `none`,
            background: `none`,
          }}
        >
          <GrRefresh />
        </button>
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
