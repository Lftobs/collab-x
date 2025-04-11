import type { APIRoute } from "astro";
import app from "../../lib";


// export const ALL: APIRoute = async (context) => {
// context.rewrite('http://localhost:8787');
//   // const res = await client.api.posts.$fetch({ method: 'get' });
//   // console.log(res)
//   // return new Response(res.body, { status: res.status, headers: res.headers });
//   return new Response(JSON.stringify({hi: 'Hello'}), { status: 200, headers: {'Content-Type': 'application/json'} });
// };
export const ALL: APIRoute = (context) => app.fetch(context.request)
export type App = typeof app;