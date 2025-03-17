# amz-content-sha256
Fetch with automatically embedded amz-content-sha256 header to comply with AWS CloudFront requirements when enabling OAC.

How to use:

```javascript
import { fetchSha256 } from "amz-content-sha256-fetch";

const url = 'https://example.mangos'
const body = { key: 'bobs-bananas', 'mango': 'fruit' }

const options = {
    method: 'POST',
    url: url,
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    }
}

await fetchSha256(options)
```