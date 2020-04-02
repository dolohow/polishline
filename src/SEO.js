import React from "react";

import Helmet from "react-helmet";

function SEO({ pageTitle, title, description }) {
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
                    property: "og:type",
                    content: "website",
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