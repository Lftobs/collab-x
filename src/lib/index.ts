import { Hono } from 'hono';
import { webhookEndpoint } from './server/wh';
import { cors } from 'hono/cors';
import { hc } from 'hono/client';
import { posts } from './server/posts/index';
import { serve } from '@hono/node-server';
 
 

 
const app = new Hono({ strict: false})
  .basePath('/api')
  .use("/api/*", cors());
  
app.get("/api/hi", (c) => c.json({ message: "server is healthy" }))

const routes = app
  .route("/posts", posts);

// serve({
//   fetch: app.fetch,
//   port: 8000,
// })

export default app;
export type AppType = typeof routes;

// export const client = hc("http://localhost:8000");
// export type ClientType = typeof client;