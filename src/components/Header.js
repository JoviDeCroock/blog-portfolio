import React from 'react'
import { Link } from 'gatsby'

const Header = ({ title, menuLinks }) => (
  <nav style={{ display: 'flex', flex: 1 }}>
    {
      menuLinks.map(link =>
        <li key={link.name} style={{ 'listStyleType': 'none', 'marginRight': 12 }}>
          <Link to={link.link}>{link.name}</Link>
        </li>)
    }
  </nav>
)

export default Header;
