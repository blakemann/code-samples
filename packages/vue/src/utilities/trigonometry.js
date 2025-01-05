export function getAngle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

export function getPointAlongAngle(x, y, angle, distance) {
  return {
    x: Math.cos(angle * Math.PI / 180) * distance + x,
    y: Math.sin(angle * Math.PI / 180) * distance + y,
  };
}
