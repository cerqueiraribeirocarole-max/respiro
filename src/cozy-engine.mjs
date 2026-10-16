export const candyColors=['#ef67ac','#50cdd1','#a58afa','#ffc64c'];
export function waterLevel(stage=0){const n=2+Math.floor((stage%6)/2);const filled=Array.from({length:n},(_,i)=>Array.from({length:4},(_,j)=>(i+j)%n));if(stage%2)filled.reverse();return [...filled,[],[]];}
export function pour(bottles,from,to){if(from===to||!bottles[from]?.length||!bottles[to]||bottles[to].length>=4)return null;const src=bottles[from],dst=bottles[to],color=src.at(-1);if(dst.length&&dst.at(-1)!==color)return null;let count=0;for(let i=src.length-1;i>=0&&src[i]===color;i--)count++;count=Math.min(count,4-dst.length);const next=bottles.map(b=>[...b]);next[from].splice(-count);next[to].push(...Array(count).fill(color));return next;}
export function waterDone(b){return b.length>0&&b.every(v=>v.length===0||(v.length===4&&v.every(c=>c===v[0])));}
export function bottleCode(stage=0){const rows=[[2,0,3,1],[1,3,0,2],[3,2,1,0],[0,2,3,1],[2,3,1,0],[1,0,2,3]];return [...rows[stage%rows.length]];}
export function codeFeedback(guess,code){return guess.map((v,i)=>v===code[i]);}
export function ringStart(stage=0){return Array.from({length:3+stage%6},(_,r)=>Array.from({length:4},(_,c)=>(c+[1,3,2,1,2,3,1,2][(r+stage)%8])%4));}
export function rotateRing(rings,index,direction=1){return rings.map((r,i)=>i===index?(direction>0?[r.at(-1),...r.slice(0,-1)]:[...r.slice(1),r[0]]):[...r]);}
export function ringsDone(rings){return rings.length>0&&rings.every(r=>r.every((v,i)=>v===rings[0][i]));}
/** @returns {{version:number,name:string,days:string[],care:Record<string,string[]>,total:number}} */
export function blankPet(){return {version:1,name:'Nuvem',days:[],care:{},total:0};}
/** @returns {{version:number,name:string,days:string[],care:Record<string,string[]>,total:number}} */
export function validPet(v){if(!v||v.version!==1)return blankPet();const days=Array.isArray(v.days)?[...new Set(v.days.filter(d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)))].sort():[];/** @type {Record<string,string[]>} */ const care={};if(v.care&&typeof v.care==='object')for(const [d,actions]of Object.entries(v.care))if(days.includes(d)&&Array.isArray(actions))care[d]=[...new Set(actions.filter(a=>['feed','pet','play'].includes(a)))];return {version:1,name:typeof v.name==='string'&&v.name.trim()?v.name.trim().slice(0,20):'Nuvem',days,care,total:Object.values(care).reduce((n,a)=>n+a.length,0)};}
export function careFor(pet,action,day){const p=validPet(pet);if(!['feed','pet','play'].includes(action))return {pet:p,earned:false};const today=p.care[day]||[];if(today.includes(action))return {pet:p,earned:false};return {pet:{...p,days:[...new Set([...p.days,day])].sort(),care:{...p.care,[day]:[...today,action]},total:p.total+1},earned:true};}
export function petGrowth(pet){const days=pet.days.length;const thresholds=[0,3,7,14];const stage=days>=14?3:days>=7?2:days>=3?1:0;return {stage,label:['Filhotinho','Pequeno explorador','Companheiro','Gatinho crescido'][stage],next:thresholds[stage+1]??null,days};}
