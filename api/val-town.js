const isMock = false
function p(t){return Object.entries(t).filter(([,a])=>!!a).map(([a,e])=>`${a}=${e}`).join("&")}function d(t){return Object.fromEntries(Array.from(t.searchParams.entries()).filter(([,a])=>!!a))}function u(t){let a=t.toString();if(a.length<5)return a;if(a.length<9){let i=a.slice(0,-3),r=i.length,l=i[r-1]==="0"?"":`.${i[r-1]}`;return`${i.slice(0,r-1)}${l}\u4E07`}let e=a.slice(0,-7),n=e.length,s=e[n-1]==="0"?"":`.${e[n-1]}`;return`${e.slice(0,n-1)}${s}\u4EBF`}function o(t){return Response.json(t,{status:t.code})}async function g(t,a){let{collectionType:e="0",uid:n,pageNumber:s="1",pageSize:i="10"}=t,r=n??a?.BILIBILI;if(!r)return o({code:400,message:"uid is required",data:{}});let l=p({type:1,follow_status:e,pn:s,ps:i,vmid:r}),m=await fetch(`https://api.bilibili.com/x/space/bangumi/follow/list?${l}`),c=await m.json();return m.ok?o({code:200,message:"ok",data:f(c.data)}):o({code:502,message:c.message,data:{}})}function f(t){return{list:t?.list?.map(e=>{let n=[{label:e?.new_ep?.index_show},{label:"\u8BC4\u5206",value:e?.rating?.score},{label:"\u64AD\u653E\u91CF",value:e?.stat?.view&&u(e.stat.view)},{label:"\u8FFD\u756A\u6570",value:e?.stat?.follow&&u(e.stat.follow)},{label:"\u6295\u5E01\u6570",value:e?.stat?.coin&&u(e.stat.coin)},{label:"\u5F39\u5E55\u6570",value:e?.stat?.danmaku&&u(e.stat.danmaku)}];return{nameCN:e.title,summary:e.summary,cover:e.cover,url:e.url,labels:n.filter(s=>s.label)}})??[],pageNumber:t.pn,pageSize:t.ps,total:t.total,totalPages:Math.ceil(t.total/t.ps)}}var y={1:"2",2:"4",3:"1"},v={0:null,1:"1",2:"3",3:"2"};async function h(t,a){let{subjectType:e="1",uid:n,collectionType:s="0",pageNumber:i=1,pageSize:r=10}=t,l=n??a?.BGM;if(!l)return o({code:400,message:"uid is required",data:{}});let m=p({subject_type:y[e],type:v[s],limit:r,offset:(Number(i)-1)*Number(r)}),c=await fetch(`https://api.bgm.tv/v0/users/${l}/collections?${m}`,{headers:{"User-Agent":"yixiaojiu/bilibili-bangumi-component (https://github.com/yixiaojiu/bilibili-bangumi-component)"}}),b=await c.json();return c.ok?o({code:200,message:"ok",data:j(b,{pageNumber:i,pageSize:r})}):o({code:502,message:b.description,data:{}})}function j(t,a){return{list:t?.data?.map(n=>{let s=n?.subject,i=[{label:s?.eps&&`${s.eps}\u8BDD`},{label:"\u8BC4\u5206",value:s?.score},{label:"\u6392\u540D",value:s?.rank},{label:"\u65F6\u95F4",value:s?.date}];return{name:s?.name,nameCN:s?.name_cn,summary:s?.short_summary,cover:s?.images?.large,url:s?.id?`https://bgm.tv/subject/${s?.id}`:"https://bgm.tv/",labels:i.filter(r=>"value"in r?r.value:r.label)}})??[],...a,total:t.total,totalPages:Math.ceil(t.total/a.pageSize)}}async function k(t){let a=new URL(t.url),e=d(a),n={};try{n=env}catch{}return a.pathname.endsWith("bilibili")?await g(e,n??void 0):a.pathname.endsWith("bgm")?await h(e,n??void 0):Response.json({code:404,message:"not found",data:{}},{status:404})}export{k as default};
