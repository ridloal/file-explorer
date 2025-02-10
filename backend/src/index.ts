import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

const app = new Elysia()
  .use(cors())
  .get('/', () => 'Hello Explorer!')
  .listen(3000);

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`);