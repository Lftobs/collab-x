import { defineDb } from 'astro:db';
import Blogs from './blog';

export default defineDb({
  tables: {Blogs},
})