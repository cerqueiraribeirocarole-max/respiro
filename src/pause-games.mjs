export const mosaicTargets=[0,1,2,3,2,3,0,1,0];
export const mosaicStart=[1,3,0,2,3,1,2,0,3];
export function turnTile(tiles,index){return tiles.map((v,i)=>i===index?(v+1)%4:v);}
export function mosaicDone(tiles){return tiles.length===9&&tiles.every((v,i)=>v===mosaicTargets[i]);}
export function sequenceFor(round){return [0,2,1,3,1,0,3,2].slice(0,Math.min(8,round+2));}
export function sequenceStep(sequence,position,tile){return tile!==sequence[position]?{position:0,complete:false,match:false}:{position:position+1,complete:position+1===sequence.length,match:true};}
