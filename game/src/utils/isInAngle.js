// Check if angle is in interval from (midAngle - angleInterval) to (midAngle + angleInterval).
export default function isInAngle (angle, midAngle, angleInterval) {
    let deflection = midAngle - angle
    if (deflection > 180) deflection -= 360
    if (deflection < -180) deflection += 360
    return (Math.abs(deflection) <= angleInterval / 2) // .toString() + "  " + Math.abs(deflection);
}
