import React, { useContext, useState, useMemo } from "react"

const themeColourContext = React.createContext()

export function useThemeColour() {
  const context = useContext(themeColourContext)
  // if context doesn't exist, it means we tried to use this function outside a Provider
  if (!context) {
    throw new Error("useThemeColour must be used within a ThemeColourProvider")
  }
  return context
}
export function ThemeColourProvider(props) {
  const [themeColour, setThemeColour] = useState(props.defaultColour)
  // useMemo ensures the provider value will only update when colour updates
  // no need to test this - React tests useMemo for us!
  const value = useMemo(() => [themeColour, setThemeColour], [themeColour])

  return (
    <themeColourContext.Provider value={value} {...props}>
      {props.children}
    </themeColourContext.Provider>
  )
}

// // do this for easier mocking so we can replace properties on the default export
// export default {
//   ThemeColourProvider,
//   useThemeColour,
// }
