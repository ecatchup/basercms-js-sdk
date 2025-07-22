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

### ブログ記事一覧取得
ブログ記事一覧を取得する

```javascript
import { apiClinet, getBlogPosts } from "@ryuring/basercms-js-sdk";
import type { BlogPost } from "@ryuring/basercms-js-sdk";

const posts = await getBlogPosts(apiClient);
posts.map((post: BlogPost) => {
    console.log(post);
});
```

### 単一ブログ記事取得
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

### ブログ記事編集（update）
```typescript
import { editBlogPost } from '@ryuring/basercms-js-sdk';
const updated = await editBlogPost(apiClient, '1', {
  title: '編集後タイトル',
  content: '編集後本文',
});
console.log(updated);
```

### ブログ記事削除（delete）
```typescript
import { deleteBlogPost } from '@ryuring/basercms-js-sdk';
const deleted = await deleteBlogPost(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
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

---

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

### カスタムエントリー一覧取得
```typescript
import { getCustomEntries } from '@ryuring/basercms-js-sdk';
const customTableId = 3;
const entries = await getCustomEntries(apiClient, customTableId);
console.log(entries);
```

### カスタムエントリー単一取得
```typescript
import { getCustomEntry } from '@ryuring/basercms-js-sdk';
const customTableId = 3;
const entry = await getCustomEntry(apiClient, customTableId, '1');
console.log(entry);
```

### カスタムエントリー編集
```typescript
import { editCustomEntry } from '@ryuring/basercms-js-sdk';
const customTableId = 3;
const updated = await editCustomEntry(apiClient, customTableId, '1', {
  title: '編集後タイトル',
  status: true,
});
console.log(updated);
```

### カスタムエントリー削除
```typescript
import { deleteCustomEntry } from '@ryuring/basercms-js-sdk';
const customTableId = 3;
const deleted = await deleteCustomEntry(apiClient, customTableId, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### カスタムフィールド一覧取得
```typescript
import { getCustomFields } from '@ryuring/basercms-js-sdk';
const fields = await getCustomFields(apiClient);
console.log(fields);
```

### カスタムフィールド単一取得
```typescript
import { getCustomField } from '@ryuring/basercms-js-sdk';
const field = await getCustomField(apiClient, '1');
console.log(field);
```

### カスタムフィールド新規登録
```typescript
import { addCustomField } from '@ryuring/basercms-js-sdk';
const newField = await addCustomField(apiClient, {
  name: 'fieldA',
  title: 'フィールドA',
  type: 'text',
  status: 1,
});
console.log(newField);
```

### カスタムフィールド編集
```typescript
import { editCustomField } from '@ryuring/basercms-js-sdk';
const updated = await editCustomField(apiClient, '1', {
  title: '編集後タイトル',
  status: 1,
});
console.log(updated);
```

### カスタムフィールド削除
```typescript
import { deleteCustomField } from '@ryuring/basercms-js-sdk';
const deleted = await deleteCustomField(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### カスタムコンテンツ一覧取得
```typescript
import { getCustomContents } from '@ryuring/basercms-js-sdk';
const contents = await getCustomContents(apiClient);
console.log(contents);
```

### カスタムコンテンツ単一取得
```typescript
import { getCustomContent } from '@ryuring/basercms-js-sdk';
const content = await getCustomContent(apiClient, '1');
console.log(content);
```

### カスタムコンテンツ新規登録
```typescript
import { addCustomContent } from '@ryuring/basercms-js-sdk';
const newContent = await addCustomContent(apiClient, {
  custom_table_id: 1,
  description: '説明',
  template: 'default',
  widget_area: 0,
  list_count: 10,
  list_order: 'id',
  list_direction: 'asc',
  created: '',
  modified: ''
});
console.log(newContent);
```

