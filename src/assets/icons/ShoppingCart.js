import React from 'react'
import SvgIconsOutlined from './SvgIconsOutlined'

const ShoppingCart = (props) => {
  return (
    <SvgIconsOutlined {...props}  >
      <i className={`bi bi-cart ${props.className}`} />
    </SvgIconsOutlined>
  )
}

export default ShoppingCart