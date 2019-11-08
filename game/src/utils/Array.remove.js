// Remove value from Array.
export default function removeFrom (array, value) {
    const position = array.indexOf(value)
    if (~position) array.splice(position, 1)
    return array
}
