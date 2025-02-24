# fv-website

## Usage

1. Install [Gatsby](https://www.gatsbyjs.com/):

```
npm install -g gatsby-cli
```

2. Install dependencies and start the app:

```
yarn install
yarn dev
```

Under the hood `yarn dev` invokes `bash ./sync.sh` and `gatsby develop`. The former downloads the
latest version of the Google calendar as a local CSV; the latter starts the React app.
