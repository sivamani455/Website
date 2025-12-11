
import { put } from "./libblob.js";

export const config={runtime:"nodejs"};

export default async function handler(req,res){
  const form=await req.formData();
  const file=form.get("file");
  const buff=Buffer.from(await file.arrayBuffer());
  const mime=file.type;

  const folder=mime.startsWith("image/")?"photos":
               mime.startsWith("video/")?"videos":"docs";

  const {url}=await put(`${folder}/${Date.now()}-${file.name}`,buff,{contentType:mime});
  res.json({url});
}
