# baserCMS Javascript SDK

## Installation

```bash
npm intall @ryuring/basercms-js-sdk
```

ルートに .env を配置する
```bash
# baserCMSを配置しているURLを記述
API_BASE_URL=https://example.com
API_USER="foo@example.com"
API_PASSWORD="baserCMS1234"
```
## Usage

### apiClientのインスタンスを生成とログイン
```typescript
import { ApiClient } from '@ryuring/basercms-js-sdk';
const apiClient = new ApiClient();
await apiClient.login();
```
各APIは `ApiClient` のインスタンスを生成し、`login()` 実行後に利用してください。

---

### ユーザー単一取得
```typescript
import { getUser } from '@ryuring/basercms-js-sdk';
const user = await getUser(apiClient, '1');
console.log(user);
```

### ユーザー一覧取得
```typescript
import { ApiClient, getUsers } from '@ryuring/basercms-js-sdk';
const apiClient = new ApiClient();
await apiClient.login();
const users = await getUsers(apiClient);
console.log(users);
```

### メールアドレスでユーザー取得
```typescript
import { getUserByEmail } from '@ryuring/basercms-js-sdk';
const user = await getUserByEmail(apiClient, 'foo@example.com');
console.log(user);
```

---

### getBlogPosts 
ブログ記事一覧を取得する

```javascript
import { apiClinet, getBlogPosts } from "@ryuring/basercms-js-sdk";
import type { BlogPost } from "@ryuring/basercms-js-sdk";

const posts = await getBlogPosts(apiClient);
posts.map((post: BlogPost) => {
    console.log(post);
});
```

### getBlogPost
id を指定してブログ記事を取得する

```javascript
import { apiClient, getBlogPost } from "@ryuring/basercms-js-sdk";
import type { BlogPost } from "@ryuring/basercms-js-sdk";

const post = await getBlogPost(apiClient, 1);
console.log(post);
``` 

### ブログ記事追加
```typescript
import fs from 'fs';
import { addBlogPost } from '@ryuring/basercms-js-sdk';

const result = await addBlogPost(apiClient, {
  blog_content_id: 1,
  no: null,
  name: 'test-file-post',
  title: 'ファイルアップロードテスト',
  content: 'ファイルアップロード本文',
  detail: 'ファイルアップロード詳細',
  blog_category_id: 1,
  user_id: 1,
  status: 1,
  posted: '2025-07-21 12:00:00',
  eye_catch: fs.createReadStream('./asset_sample/test.jpg')
});
console.log(result);
```

---

### カスタムテーブル一覧取得

```typescript
import { ApiClient, getCustomTables } from '@ryuring/basercms-js-sdk';
const tables = await getCustomTables(apiClient);
console.log(tables);
```

### カスタムテーブル単一取得
```typescript
import { getCustomTable } from '@ryuring/basercms-js-sdk';
const table = await getCustomTable(apiClient, '1');
console.log(table);
```

### カスタムテーブル新規登録
```typescript
import { addCustomTable } from '@ryuring/basercms-js-sdk';
const newTable = await addCustomTable(apiClient, {
  type: 'typeA',
  name: 'テーブル名',
  title: 'タイトル',
  display_field: 'name',
  has_child: 0,
  created: '',
  modified: ''
});
console.log(newTable);
```

---

### カスタムリンク一覧取得
```typescript
import { getCustomLinks } from '@ryuring/basercms-js-sdk';
const links = await getCustomLinks(apiClient);
console.log(links);
```

### カスタムリンク単一取得
```typescript
import { getCustomLink } from '@ryuring/basercms-js-sdk';
const link = await getCustomLink(apiClient, '1');
console.log(link);
```

### カスタムエントリー新規登録
```typescript
import fs from 'fs';
import { addCustomEntry } from '@ryuring/basercms-js-sdk';
const customTableId = 3;
const entryData = {
  custom_table_id: customTableId,
  name: 'test-entry',
  title: 'カスタムエントリー投稿テスト',
  product_image: fs.createReadStream('./asset_sample/test.jpg'),
  status: true,
  creator_id: 1,
};
const entry = await addCustomEntry(apiClient, customTableId, entryData);
console.log(entry);
```

