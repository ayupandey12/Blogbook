import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Blogpostschema,Blogupdateschema } from '@ayushdevinfer1/medium-common'


export const Blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId:any 
  }
}>()

// Middleware - JWT Authentication
Blogrouter.use('/*', async (c, next) => {
  const header =c.req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    c.status(403);
    return c.json({ error: "No token provided" });
  }

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
      return;
    }
  } catch (e) {
    console.log("JWT verification error:", e);
  }

  c.status(403);
  return c.json({ error: "Unauthorized" });
});


//  Create a new blog
Blogrouter.post('/', async (c) => {
    const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  const body = await c.req.json();
   const decode =Blogpostschema.safeParse(body)
      if(!decode.success)
      {
          c.status(403);
        return c.json({message:"invalid data schema"});
      }
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    });
    return c.json({ id: blog.id, message: "Blog created successfully " });
  } catch (error) {
    console.error(error);
    c.status(403);
    return c.json({ error: "Error creating blog" });
  }
});

//  Update an existing blog
Blogrouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const userId = c.get("userId");
  const id = c.req.param("id");
  const body = await c.req.json();
  const decode =Blogupdateschema.safeParse(body)
      if(!decode.success)
      {
          c.status(403);
        return c.json({message:"invalid data schema"});
      }

  try {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }

    //  Check if the logged in user is the author
    if (existing.authorId !== userId) {
      c.status(403);
      return c.json({ error: "You are not authorized to update this blog" });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        content: body.content ?? existing.content
      }
    });

    return c.json({ message: "Blog updated ", blog: updated });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ error: "Error updating blog" });
  }
});

 //  Get all blogs (bulk fetch)
Blogrouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany({
      select:{
        title:true,
        content:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json(blogs);
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ error: "Error fetching blogs" });
  }
});

//  Get a single blog by ID
Blogrouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog = await prisma.post.findUnique({
      where: { id },
      select:{
        title:true,
        content:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    if (!blog) {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }
    return c.json(blog);
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ error: "Error fetching blog" });
  }
});



//  Delete a blog
Blogrouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const userId = c.get("userId");
  const id = c.req.param("id");

  try {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }

    //  Authorize delete
    if (existing.authorId !== userId) {
      c.status(403);
      return c.json({ error: "You are not authorized to delete this blog" });
    }

    await prisma.post.delete({ where: { id } });
    return c.json({ message: "Blog deleted successfully " });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ error: "Error deleting blog" });
  }
});

export default Blogrouter;
