import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Nav = styled.nav`
  display: flex;
  flex: 1;
`;

const ListItem = styled.li`
  color: #4286F4;
  list-style-type: none;
  margin-right: 12px;
`;

const Header = ({ title, menuLinks }) => (
  <Nav>
    {menuLinks.map(link =>
      <ListItem key={link.name}>
        <Link to={link.link}>{link.name}</Link>
      </ListItem>
    )}
  </Nav>
)

export default Header;
