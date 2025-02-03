export type Coord = {
  x: number,
  y: number,
}

export function getAngle(cx:number, cy:number, ex:number, ey:number):number {
  const dy = ey - cy;
  const dx = ex - cx;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

export function getPointAlongAngle(x:number, y:number, angle:number, distance:number):Coord {
  return {
    x: Math.cos(angle * Math.PI / 180) * distance + x,
    y: Math.sin(angle * Math.PI / 180) * distance + y,
  };
}
