# Async flow

This library allow you to use flows, _or sometimes named waterfalls,_ on an easy way.

```js
const asyncflow = require('./index');

const square = (value) => value * value;

const asyncSquare = (value) => new Promise((resolve) => {
  setTimeout(() => { resolve(value * value); });
});

const result = asyncflow([
  square,
  asyncSquare,
])(2);
```

## License

Copyright (c) Weekendesk SAS.

[MIT](LICENSE)