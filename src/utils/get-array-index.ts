/**
 * Ger Array Index
 * @description get array index from given string
 * @param {string} str
 */
const getArrayIndex = (str: string): RegExpExecArray | null => /\[([-]*\d*)]/g.exec(str);

export default getArrayIndex;
