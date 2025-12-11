
import kv from "./libkv.js";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

export const config={runtime:"nodejs"};

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).end();
  const {username,password}=Object.fromEntries(await req.formData());
  const saved=await kv.get("user:"+username);
  if(!saved) return res.status(401).send("Invalid");
  const ok=await bcrypt.compare(password,saved);
  if(!ok) return res.status(401).send("Invalid");
  res.setHeader("Set-Cookie", serialize("session",username,{path:"/"}));
  res.redirect("/home.html");
}
