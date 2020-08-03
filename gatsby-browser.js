import React from "react"
import { ThemeColourProvider } from "./src/contexts/themeColourContext"

export const wrapRootElement = ({ element }) => {
  return <ThemeColourProvider>{element}</ThemeColourProvider>
}
