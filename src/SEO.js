import React from "react";

import { Helmet } from "react-helmet";

function SEO({ pageTitle, title, description, image }) {
    return (
        <Helmet
            title={pageTitle}
            meta={[
                {
                    name: "description",
                    content: description
                },
                {
                    property: "og:title",
                    content: title,
                },
                {
                    property: "og:description",
                    content: description,
                },
                {
                    property: "og:image",
                    content: image,
                },
                {
                    property: "fb:app_id",
                    content: process.env.REACT_APP_FACEBOOK_APPID,
                },
                {
                    property: "og:type",
                    content: "website",
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
                    content: title,
                },
                {
                    name: "twitter:description",
                    content: description,
                },
            ]}
        >
        </Helmet>
    )

}

export default SEO;
