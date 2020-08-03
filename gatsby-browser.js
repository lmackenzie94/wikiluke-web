/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { ThemeColourProvider } from "./src/contexts/themeColourContext"

// You can delete this file if you're not using it

export const wrapRootElement = ({ element }) => {
  const defaultColour = localStorage.getItem("themeColour") || "#008b02"
  return (
    <ThemeColourProvider defaultColour={defaultColour}>
      {element}
    </ThemeColourProvider>
  )
}
