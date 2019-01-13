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
  transition: transform .4s;
  width: 75px;
  :hover {
    transform: scale(1.1);
  }
`;

const subjects = {
  General: {
    color: '#EBEBEA',
  },
  React: {
    color: '#61DBFB',
  }
}

export default ({ onClick, subject }) => {
  console.log(subject, subjects[subject]);
  const { color } = (subjects[subject] || {})
  return (
    <Tag color={color} onClick={() => onClick(subject)}>
      {subject}
    </Tag>
  )
}
