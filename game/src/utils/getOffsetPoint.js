import radians from './radians'

// Angle is in degrees.
export default function getOffsetPoint (x, y, angle, distance) {
    const newX = x + Math.cos(radians(angle)) * distance
    const newY = y + Math.sin(radians(angle)) * distance
    return { x: newX, y: newY }
}
