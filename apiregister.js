
import kv from "./libkv.js";
import bcrypt from "bcryptjs";

export const config={runtime:"nodejs"};

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).end();
  const {username,password}=Object.fromEntries(await req.formData());
  const hash=await bcrypt.hash(password,10);
  await kv.set("user:"+username,hash);
  res.send("Account created");
}
