import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import "./beliefs.css"

export const query = graphql`
  {
    beliefs: allGoogleSheetBeliefsRow {
      edges {
        node {
          belief
          point1
          point2
          point3
          point4
          point5
          point6
          point7
        }
      }
    }
    facts: allGoogleSheetFactsRow {
      edges {
        node {
          belief
          fact1
        }
      }
    }
  }
`

const formatBeliefsAndFacts = (beliefs, facts) => {
  const allFacts = facts
    .map(({ node: node }) => {
      const points = Object.keys(node)
        .filter(point => point.includes("fact"))
        .map(point => node[point])
        .filter(point => point)

      return {
        belief: node.belief,
        points,
      }
    })
    .filter(fact => fact.points.length)

  const allBeliefs = beliefs
    .map(({ node: node }) => {
      const points = Object.keys(node)
        .filter(point => point.includes("point"))
        .map(point => node[point])
        .filter(point => point)

      return {
        belief: node.belief,
        points,
        facts: [],
      }
    })
    .filter(belief => belief.points.length)

  for (let i = 0; i < allFacts.length; i++) {
    const belief = allFacts[i].belief
    const facts = allFacts[i].points
    const nonEmptyBelief = allBeliefs.find(b => b.belief === belief)
    nonEmptyBelief && (nonEmptyBelief.facts = facts)
  }

  return allBeliefs
}

const BeliefsPage = ({ data }) => {
  const [beliefs, setBeliefs] = useState([])

  useEffect(() => {
    const formattedBeliefs = formatBeliefsAndFacts(
      data.beliefs.edges,
      data.facts.edges
    )

    setBeliefs(formattedBeliefs)
  }, [])

  return (
    <Layout>
      <SEO title="Beliefs" />
      <section
        className="beliefsContainer"
        style={{ display: `flex`, height: `85vh` }}
      >
        <div
          className="customScrollbar"
          style={{
            overflowY: `scroll`,
            paddingRight: `30px`,
            paddingTop: `15px`,
          }}
        >
          {beliefs.map(belief => (
            <div
              key={belief.belief}
              id={belief.belief}
              style={{ marginBottom: `50px` }}
            >
              <h2 style={{ marginBottom: `10px` }}>{belief.belief}</h2>
              <ul>
                {belief.points.map((point, idx) => (
                  <li key={`${belief}-${idx}`}>{point}</li>
                ))}
              </ul>
              {belief.facts.length > 0 && (
                <div
                  style={{
                    borderLeft: `5px solid #32a852`,
                    padding: 20,
                    background: `#f2f2f2`,
                  }}
                >
                  <h3
                    style={{
                      fontSize: `1.2rem`,
                      textTransform: `uppercase`,
                      margin: 0,
                    }}
                  >
                    Facts
                  </h3>
                  <ul style={{ marginBottom: 0 }}>
                    {belief.facts.map((fact, idx) => (
                      <li
                        key={`${belief}-${idx}`}
                        style={{ marginTop: 15, marginBottom: 0 }}
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <aside
          className="customScrollbar topicsPanel"
          style={{
            overflowY: `scroll`,
            padding: `20px`,
            borderLeft: `1px solid`,
            borderColor: `#f2f2f2`,
            background: `#f2f2f2`,
            minWidth: 225,
          }}
        >
          <ul style={{ listStyle: `none`, margin: 0 }}>
            {beliefs.map(belief => (
              <li key={`${belief.belief}-link`}>
                <a href={`#${belief.belief}`} className="removeVisitedStyle">
                  {belief.belief}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </Layout>
  )
}

export default BeliefsPage
