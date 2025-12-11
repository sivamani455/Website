
import blob from "./libblob.js";

export const config={runtime:"nodejs"};

export default async function handler(req,res){
  const list=await blob.list();
  const photos=[],videos=[],docs=[];
  list.blobs.forEach(b=>{
    if(b.pathname.startsWith("photos/")) photos.push(b);
    else if(b.pathname.startsWith("videos/")) videos.push(b);
    else docs.push(b);
  });
  res.json({photos,videos,docs});
}
