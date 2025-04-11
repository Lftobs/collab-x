// import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/api/webhooks'])

// export const onRequest = clerkMiddleware((auth, context) => {
//   const { redirectToSignIn, userId } = auth()

//   if (!isPublicRoute(context.request) && !userId) {
//     return redirectToSignIn()
//   }
// })