
export const removeExtraSpacesFromString = (string: string) => {
    const newString = string.trim().replace(/\s+/g, ' ')

    return newString
}