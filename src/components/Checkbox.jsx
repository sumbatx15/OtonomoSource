import React from 'react'
import Toggle from 'react-toggle';
import './Checkbox.scss'

function Checkbox({ type, children, ...props }) {
  return (
    <label className="checkbox-label">
      <Toggle  {...props} icons={false}/> 
      <span className="label">{children}</span>
    </label>
  )
}

export default Checkbox
