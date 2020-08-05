import React from "react"
import { motion } from "framer-motion"

const ulVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const liVariants = {
  hidden: { opacity: 0, y: -5 },
  show: { opacity: 1, y: 0 },
}

export const List = props => {
  if (props.ordered) {
    return (
      <motion.ol
        {...props}
        variants={{ ...ulVariants, ...props.variants }}
        initial="hidden"
        animate="show"
      >
        {props.children}
      </motion.ol>
    )
  } else {
    return (
      <motion.ul
        {...props}
        variants={{ ...ulVariants, ...props.variants }}
        initial="hidden"
        animate="show"
      >
        {props.children}
      </motion.ul>
    )
  }
}

export const ListItem = props => {
  return (
    <motion.li {...props} variants={{ ...liVariants, ...props.variants }}>
      {props.children}
    </motion.li>
  )
}
