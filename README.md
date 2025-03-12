# baserCMS Javascript SDK

## Installation

```bash
npm intall @ryuring/basercms-js-sdk
```
ルートに .env を配置する
```bash
# baserCMSを配置しているURLを記述
API_BASE_URL=https://example.com
```
## Usage

### getBlogPosts 
ブログ記事一覧を取得する

```javascript
import { getBlogPosts } from "@ryuring/basercms-js-sdk";
import { BlogPost } from "@ryuring/basercms-js-sdk";

const posts = await getBlogPosts();
posts.map((post: BlogPost) => {
    console.log(post.id);
	console.log(post.title);
	console.log(post.content);
	console.log(post.detail);
	console.log(post.eye_catch);
	console.log(post.posted);
});
```

### getBlogPost
id を指定してブログ記事を取得する

```javascript
import { BlogPost, getBlogPost } from "@ryuring/basercms-js-sdk";

const post = await getBlogPost(1);
console.log(post.id);
console.log(post.title);
console.log(post.content);
console.log(post.detail);
console.log(post.posted);
console.log(post.eye_catch);
``` 

