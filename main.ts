const f=require('node:fs');
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const A="$5e(*./3########-------)---)---#---#############DHHD$###########),##############((%(";
const B=[(a,b)=>a+b|0,(a,b)=>a-b|0,Math.imul,(a,b)=>a==-2147483648&&b==-1?a:(a/b)|0,(a,b)=>b==-1?0:a%b|0,(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,(a,b)=>(a>>>0)%(b>>>0)|0,a=>-a|0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,a=>~a,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>(a>>>(b&31))|0,0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
for(let k=1;k<41;k++){
 const d='i'+('00'+k).slice(-3);
 const p=f.readFileSync(I+'/'+d+'/program.bin'),q=f.readFileSync(I+'/'+d+'/input.bin');
 const D=new Int32Array(256),C=D.slice(0,64),M=D.slice(),u=new Uint8Array(65536);
 let s=0,c=0,l=0,j=0,g=0,t=0,e=0,b;
 for(;;){
  if(t==1e6){e=10;break}
  if(g>>>0>=p.length){e=9;break}
  let o=p[g],v=A.charCodeAt(o)-35;
  if(!v){e=5;break}
  let m=v-1>>4,po=v-1>>2&3,h=v-1&3;
  if(g+m>=p.length){e=9;break}
  t++;
  let n=g+1+m;
  if(s<po){e=2;break}
  if(s-po+h>256){e=3;break}
  g=n;
  if(o==0){e=0;break}
  else if(o==1)D[s++]=p[n-1]<<24>>24;
  else if(o==2)D[s++]=p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;
  else if(o==3)s--;
  else if(o==4)D[s]=D[s-1],s++;
  else if(o==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];
  else if(o==6)D[s]=D[s-2],s++;
  else if(o==7)[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
  else if(o<35){
   let b=D[s-1],a=D[s-2];
   if(!b&&o>18&&o<23){e=4;break}
   if(po<2)D[s-1]=B[o-16](b);
   else D[s-2]=B[o-16](a,b),s--;
  }
  else if(o>47&&o<51){
   let r=(p[n-2]|p[n-1]<<8)<<16>>16,w=o==48?1:(D[--s]==0)==(o<50);
   if(w)g=n+r;
  }
  else if(o==51){
   if(c==64){e=7;break}
   C[c++]=n;g=p[n-2]|p[n-1]<<8;
  }
  else if(o==52){
   if(!c){e=8;break}
   g=C[--c];
  }
  else if(o==64){
   let a=D[s-1];
   if(a<0|a>255){e=6;break}
   D[s-1]=M[a];
  }
  else if(o==65){
   let a=D[s-1],v=D[s-2];
   if(a<0|a>255){e=6;break}
   s-=2;M[a]=v;
  }
  else if(o==80){
   if(l+(b=D[s-1]+'').length>65536){e=11;break}
   s--;u.set(Buffer.from(b),l);l+=b.length;
  }
  else if(o==81){
   if(l+1>65536){e=11;break}
   u[l++]=D[--s]&255;
  }
  else if(o==82)D[s++]=j<q.length?q[j++]:-1;
  else if(o==83){e=D[--s]&255;break}
 }
 f.mkdirSync(O+'/'+d,{recursive:!0});
 f.writeFileSync(O+'/'+d+'/stdout.bin',u.slice(0,l));
 f.writeFileSync(O+'/'+d+'/exit.txt',e+'');
}
