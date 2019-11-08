// Converts angles (in degrees) from -180 to 0 to positive values from 180 to 360.
export default function angleTo360 (angle) {
    if (angle < 0) angle += 360
    return angle
}
