process.env.NODE_ENV = "test";
process.env.JWT_SECRET = Buffer.alloc(32, 1).toString("base64");
