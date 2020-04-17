import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { useLang, useTitleTemplate, useTitle, useMeta } from 'hooked-head';

const SEO = ({ description, lang, meta, keywords, title }) => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const metaDescription = description || data.site.siteMetadata.description;
      useLang(lang);

      useTitleTemplate(data.site.siteMetadata.title);
      useTitle(title);

      useMeta({ name: 'author', content: data.site.siteMetadata.author });
      useMeta({ name: 'description', content: metaDescription });

      useMeta({ name: 'twitter:card', content: 'summary' });
      useMeta({ name: 'twitter:creator', content: data.site.siteMetadata.author });
      useMeta({ name: 'twitter:title', content: title });
      useMeta({ name: 'twitter:description', content: metaDescription });

      useMeta({ property: 'og:title', content: title });
      useMeta({ property: 'og:type', content: 'website' });
      useMeta({ property: 'og:description', content: metaDescription });

      return null;
    }}
  />
);

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
