import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: #4286F4;
  margin-left: 6px;
  margin-right: 6px;
`;

const Footer = () => (
  <footer>
    <Link target="blank" href="https://www.twitter.com/jovidec">Twitter</Link>
    {' '}-{' '}
    <Link target="blank" href="https://www.github.com/jovidecroock">Github</Link>
    {' '}-{' '}
    <Link href="mailto:decroockjovi@gmail.com">Contact</Link>
  </footer>
);

export default Footer;
