Polishline
==========

SEO friendly React blog app with Wordpress backend glued by GraphQL.

Basically all the parts that create https://polishline.pl website.


## Installation

### Backend

You need to have a working Wordpress installation with following
plugins:

 * WP GraphQL
 * WPGraphql SEO
 * Yoast SEO

### Frontend

It is basically `create-react-app` with some additions, so all the usual
commands work.

`npm install`

To build for production use:
`npm run-script build`

To develop:
`npm start:dev`

To run in production in SSR powered express server:
`npm start`


## TODO

I will be adding new features here, but it is mostly complete, however some
more documentation regarding setup will be added along with some tests cause
now there is none :(
