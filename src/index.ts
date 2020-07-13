import pick from './pick';
import parse from './parse';
import parseKey from './parse-key';
import { IKeySource, IKeyFromPathResult } from './interfaces';

if (['development', 'dev'].includes(process.env.NODE_ENV)) {
  console.warn(
    'Warning: "@arg-def/dot-notation" has been moved to "@cookbook/dot-notation".\n\n' +
      'Repository & Documentation: https://bit.ly/3ewtm3u',
  );
}

export { pick, parse, parseKey, IKeySource, IKeyFromPathResult };

export default {
  pick,
  parse,
  parseKey,
};
