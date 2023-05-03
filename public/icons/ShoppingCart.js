import React from 'react'
import SvgIconsOutlined from './SvgIconsOutlined'

const ShoppingCart = (props) => {
  return (
    <SvgIconsOutlined {...props}  >
      <i class={`bi bi-cart ${props.class}`} />
    </SvgIconsOutlined>
  )
}

export default ShoppingCart