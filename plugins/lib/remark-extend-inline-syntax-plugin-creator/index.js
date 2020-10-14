/**
 * reference: https://github.com/Darkhax/remark-underline
 * <marker>text<marker> => <tagName className="classNames">text<tagName>
 * @example: __text__ => <ins>text</ins>
 */

module.exports = function createAttacher(opts) {
  const {
    // string
    // @example: 'underline'
    defaultNodeType,

    // string
    // @example: '__'
    defaultMarker,

    // []string
    // @example: ['underline']
    defaultClassNames,

    // string
    // @example: 'span'
    defaultTagType,

    // string
    // @example: 'underline'
    inlineMethodName
  } = opts

  return function attacher(options = {}) {
    const Parser = this.Parser.prototype;

    const nodeType = options.nodeType || defaultNodeType;
    const marker = options.marker || defaultMarker;
    const classNames = options.classNames || defaultClassNames;
    const tagType = options.tagType || defaultTagType;

    Parser.inlineTokenizers[inlineMethodName] = function tokenizer(eat, value, silent) {

      if (value.startsWith(marker)) {

        const end = value.indexOf(marker, marker.length);

        if (end > -1) {

          if (silent) {

            return true;
          }

          const text = value.substring(marker.length, end);

          const now = eat.now();
          now.column += marker.length;
          now.offset += marker.length;

          return eat(marker + text + marker)({
            type: nodeType,
            children: this.tokenizeInline(text, now),
            data: {
              hName: tagType,
              hProperties: classNames.length ? { className: classNames } : {}
            }
          });
        }
      }

      return false;
    };
    Parser.inlineTokenizers[inlineMethodName].locator = (value, fromIndex) => value.indexOf(marker, fromIndex);
    Parser.inlineMethods.unshift(inlineMethodName);
  }

}
