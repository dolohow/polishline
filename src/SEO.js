import React from "react";

import { Helmet } from "react-helmet";

function SEO(data) {
  return (
    <Helmet
      title={data.title}
      meta={[
        {
          name: "description",
          content: data.metaDesc,
        },
        {
          name: "keywords",
          content: data.metaKeywords,
        },
        {
          property: "og:title",
          content: data.opengraphTitle,
        },
        {
          property: "og:description",
          content: data.opengraphDescription,
        },
        {
          property: "og:image",
          content: data.opengraphImage?.sourceUrl,
        },
        {
          property: "fb:app_id",
          content: process.env.REACT_APP_FACEBOOK_APPID,
        },
        {
          property: "og:type",
          content: data.opengraphType,
        },
        {
          property: "og:locale",
          content: "pl_PL",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: "radzio",
        },
        {
          name: "twitter:title",
          content: data.opengraphTitle,
        },
        {
          name: "twitter:description",
          content: data.opengraphDescription,
        },
      ]}
    >
    </Helmet>
  )

}

export default SEO;
