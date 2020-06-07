import React from 'react';

const Html = ({ content, helmet, assets, state }) => {
  return (
    <html lang="pl">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {assets.css &&
          assets.css.map((c, idx) => (
            <link key={idx} href={c} rel="stylesheet" />
          ))}
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c',
            )};`,
          }}
        />
        {assets.js &&
          assets.js.map((j, idx) => (
            <script key={idx} type="application/javascript" src={j} />
          ))}
      </body>
    </html>
  );
};

export default Html;
