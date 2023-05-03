import React from 'react'
import SvgIconsOutlined from './SvgIconsOutlined'

const Close = (props) => {
  return (
    <SvgIconsOutlined {...props}>
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </SvgIconsOutlined>
  )
}

export default Close