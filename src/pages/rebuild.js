import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GrRefresh } from "react-icons/gr"

const RebuildPage = () => {
  const [building, setBuilding] = useState(false)

  const handleRebuild = () => {
    fetch("https://api.netlify.com/build_hooks/5ed0087cfbe7dfef8dea49c1", {
      method: "POST",
    })
      .then(res => {
        setBuilding(true)
      })
      .catch(err => {
        throw new Error(`Build error: ${err}`)
      })
  }
  return (
    <Layout>
      <SEO title="Rebuild Site" />
      <h1
        style={{
          fontSize: `1.5rem`,
          marginBottom: 20,
          marginTop: `100px`,
          color: `#32a852`,
        }}
      >
        {building ? `Building . . .` : `Click to Rebuild`}
      </h1>
      <button
        onClick={handleRebuild}
        aria-label="rebuild site"
        style={{
          fontSize: `1.5rem`,
          border: `none`,
          outline: `none`,
          background: `none`,
          cursor: `pointer`,
        }}
      >
        <GrRefresh style={{ fontSize: 50 }} />
      </button>
    </Layout>
  )
}

export default RebuildPage
