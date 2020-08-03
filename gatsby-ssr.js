import React from "react"
import { ThemeColourProvider } from "./src/contexts/themeColourContext"

export const wrapRootElement = ({ element }) => {
  const defaultColour = localStorage
    ? localStorage.getItem("themeColour") || "#008b02"
    : "#008b02"

  return (
    <ThemeColourProvider defaultColour={defaultColour}>
      {element}
    </ThemeColourProvider>
  )
}
