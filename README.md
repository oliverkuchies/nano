# Nano - static state management tool

No magic here, no DOM trees being maintained for state refreshed; just a simple lib to keep state in an isolated global hashmap.

```js
import { useNano } from 'nano';
const counter = useNano<number>('counter', 1);
counter.value += 1;
```

`console.log(counter.value)` - returns 2.

