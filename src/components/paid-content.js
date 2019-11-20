import React from 'react'

export const Premium = (props) => {

  const showPaywall =
    typeof window !== "undefined" &&
    (!window.localStorage.getItem("unlock_handbook") ||
      !window.localStorage.getItem("sale_id"));

  console.info(props.children);

  return (props.children);

}
