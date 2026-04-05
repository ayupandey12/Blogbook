import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Signinschema,Signupschema } from '@ayushdevinfer1/medium-common'
export const Userrouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
       JWT_SECRET:string
    }
}>();
Userrouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	const body = await c.req.json();
    const decode =Signupschema.safeParse(body)
    if(!decode.success)
    {
        c.status(403);
      return c.json({message:decode.error.message.split('\n')[9].split('"')[3]});
    }
	const u=await prisma.user.findFirst({
		where:{
			email:body.email
		}
	})
	if(u) 
	  {
        c.status(403);
      return c.json({message:"Email is already used!"});
    }
	try {
		const user = await prisma.user.create({
			data: { name:body.name??null,
				email: body.email,
				password: body.password
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ token });
	} catch (e) {
  c.status(403)
  return c.json({ message: 'Something wrong , try again!' })
}
})
Userrouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    	const body = await c.req.json();
        const decode =Signinschema.safeParse(body)
    if(!decode.success)
    {
        c.status(403);
      return c.json({message:"invalid credential!"});
    }
	try {
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password:body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ message: "user not found" });
	}

	const token = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ token });
	} catch (error) {
		c.status(411);
		c.json({message:"invalid"});
	}
})
