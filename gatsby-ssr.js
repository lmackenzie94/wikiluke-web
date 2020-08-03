import React from "react"
import { ThemeColourProvider } from "./src/contexts/themeColourContext"

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeColourProvider defaultColour="#008b02">{element}</ThemeColourProvider>
  )
}
