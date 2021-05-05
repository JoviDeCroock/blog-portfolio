import { useLang, useTitle, useMeta } from 'hooked-head/preact';

const SEO = () => {
  useLang('en');

  useTitle('Portfolio - Jovi De Croock');

  useMeta({ name: 'author', content: 'Jovi De Croock'});
  useMeta({ name: 'description', content: `This is my portfolio, here you can read about my career up to now and my skills.` });

  // @ts-ignore
  useMeta({ name: 'twitter:card', content: 'summary' });
  // @ts-ignore
  useMeta({ name: 'twitter:creator', content: 'Jovi De Croock' });
  // @ts-ignore
  useMeta({ name: 'twitter:title', content: 'Portfolio' });
  // @ts-ignore
  useMeta({ name: 'twitter:description', content: `This is my portfolio, here you can read about my career up to now and my skills.` });

  useMeta({ property: 'og:title', content: 'Portfolio' });
  useMeta({ property: 'og:type', content: 'website' });
  useMeta({ property: 'og:description', content: `This is my portfolio, here you can read about my career up to now and my skills.` });
  return null;
}

export default SEO;
