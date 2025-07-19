# baserCMS Javascript SDK

## Installation

```bash
npm intall @ecatchup/basercms-js-sdk
```

ルートに .env を配置する
```bash
# baserCMSを配置しているURLを記述
API_BASE_URL=https://example.com
API_USER="foo@example.com"
API_PASSWORD="baserCMS1234"
```
## Usage

### getBlogPosts 
ブログ記事一覧を取得する

```javascript
import { apiClinet, getBlogPosts } from "@ecatchup/basercms-js-sdk";
import type { BlogPost } from "@ecatchup/basercms-js-sdk";

const posts = await getBlogPosts(new ApiClient());
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
import { apiClient, getBlogPost } from "@ecatchup/basercms-js-sdk";
import type { BlogPost } from "@ecatchup/basercms-js-sdk";

const post = await getBlogPost(new ApiClient(), 1);
console.log(post.id);
console.log(post.title);
console.log(post.content);
console.log(post.detail);
console.log(post.posted);
console.log(post.eye_catch);
``` 

### addBlogPost
ブログ記事を追加する
```javascript
import { apiClient, addBlogPost } from "@ecatchup/basercms-js-sdk";
import type { BlogPost } from "@ecatchup/basercms-js-sdk";

const data: BlogPost = { blog_content_id: 1, no: null, name: '', title: 'ダミー記事', content: 'ダミー本文', detail: 'ダミー詳細', blog_category_id: 1, user_id: 1, status: 1, posted: '2025-07-01 00:00:00' };

const apiClient = new ApiClient();
apiClient.login();
const result = await addBlogPost(apiClient, data);
console.log('Blog post added:', result);
```