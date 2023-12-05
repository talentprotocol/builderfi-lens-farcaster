# BuilderFI - Fetch Social Posts

## How does it work

The goal of this function is to fetch BuilderFI related posts on Lens and Farcaster authored by BuilderFI users so that we can reward them accordingly.

This function does one simple thing: given a date, it fetches and stores in our database all the posts including the "builderfi" keyword.

For each post we store the:
- content_id (either lens or farcaster unique identifier)
- builderfi_user_id (id of the user on builderfi who published it)
- username (either lens handle or farcaster username)
- published_at (publish date for that post)
- source (farcaster or lens)

### Headers
`x-secret: string` - the lambda function is deployed with a SECRET environment variable, and in order to authenticate requests you need to include the right secret in the headers.

### Body
The lambda function accepts an optional body parameter that specifies the date after which to look for posts.

The "after" parameter has to be a valid timestamp.
`````
{
   "after": "1697068800000"
}
`````

If you don't pass any "after" parameter in the body, the function will default to fetch posts published in the last 7 days.

## How to deploy
This codebase is currently deployed and hosted on AWS Lambda through Serverless Framework.

The first step to take is to install the libraries with `yarn install`.

Then if you want to deploy the new code on development:
- `cp .env.template .env.development` and populate it with the right development variables
- `yarn deploy-dev`

For production:
- `cp .env.template .env.production` and populate it with the right production variables
- `yarn deploy-prod`