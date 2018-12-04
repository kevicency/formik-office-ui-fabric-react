import React from 'react'

export const TestComponent = ({ onClick }: { onClick?: any }) => (
  <div>
    test
    <button onClick={onClick}>+</button>
  </div>
)
