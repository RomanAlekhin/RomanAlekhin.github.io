// Remove value from Array.
Array.prototype.remove = (value) => {
    const position = this.indexOf(value)
    if (~position) this.splice(position, 1)
    return this
}
