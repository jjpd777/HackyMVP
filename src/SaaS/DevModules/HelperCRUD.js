
export const keyMaper = (x)=>{
    const k = Object.keys(x);
    return k.map((t)=> x[t]);
}