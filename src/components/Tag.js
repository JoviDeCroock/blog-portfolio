import React from 'react'
import styled from 'styled-components'

const Tag = styled.div`
  background: ${({ color }) => color};
  border: 1px solid white;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  height: 25px;
  text-align: center;
  transition: transform 0.4s;
  width: 100px;
  :hover {
    transform: scale(1.1);
  }
`

const subjects = {
  Performance: {
    color: '#C0D3C1',
  },
  General: {
    color: '#BFB3B3',
  },
  OSS: {
    color: '#f442d4',
  },
  React: {
    color: '#61DBFB',
  },
}

export default ({ onClick, subject }) => {
  const { color } = subjects[subject] || {}
  return (
    <Tag color={color} onClick={() => onClick(subject)}>
      {subject}
    </Tag>
  )
}
