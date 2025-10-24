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

### apiClientのインスタンスを生成とログイン
```typescript
import { ApiClient } from '@ecatchup/basercms-js-sdk';
const apiClient = new ApiClient();
await apiClient.login();
```
各APIは `ApiClient` のインスタンスを生成し、`login()` 実行後に利用してください。

---

### ユーザー単一取得
```typescript
import { getUser } from '@ecatchup/basercms-js-sdk';
const user = await getUser(apiClient, '1');
console.log(user);
```

### ユーザー一覧取得
```typescript
import { ApiClient, getUsers } from '@ecatchup/basercms-js-sdk';
const users = await getUsers(apiClient);
console.log(users);
```

### メールアドレスでユーザー取得
```typescript
import { getUserByEmail } from '@ecatchup/basercms-js-sdk';
const user = await getUserByEmail(apiClient, 'foo@example.com');
console.log(user);
```

### ユーザー新規追加
```typescript
import { addUser } from '@ecatchup/basercms-js-sdk';
const newUser = await addUser(apiClient, {
  name: 'newuser',
  password_1: 'password123',
  password_2: 'password123',
  real_name_1: '山田',
  real_name_2: '太郎',
  email: 'newuser@example.com',
  nickname: 'やまだ',
  status: true,
  user_groups: {
    _ids: [1]
  }
});
console.log(newUser);
```

### ユーザー編集
```typescript
import { editUser } from '@ecatchup/basercms-js-sdk';
const updated = await editUser(apiClient, '1', {
  real_name_1: '田中',
  real_name_2: '次郎',
  email: 'updated@example.com',
  status: true
});
console.log(updated);
```

### ユーザー削除
```typescript
import { deleteUser } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteUser(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### ブログ記事一覧取得
ブログ記事一覧を取得する

```javascript
import { apiClinet, getBlogPosts } from "@ecatchup/basercms-js-sdk";
import type { BlogPost } from "@ecatchup/basercms-js-sdk";

const posts = await getBlogPosts(apiClient);
posts.map((post: BlogPost) => {
    console.log(post);
});
```

### 単一ブログ記事取得
id を指定してブログ記事を取得する

```javascript
import { apiClient, getBlogPost } from "@ecatchup/basercms-js-sdk";
import type { BlogPost } from "@ecatchup/basercms-js-sdk";

const post = await getBlogPost(apiClient, 1);
console.log(post);
``` 

### ブログ記事追加
```typescript
import fs from 'fs';
import { addBlogPost } from '@ecatchup/basercms-js-sdk';

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
import { editBlogPost } from '@ecatchup/basercms-js-sdk';
const updated = await editBlogPost(apiClient, '1', {
  title: '編集後タイトル',
  content: '編集後本文',
});
console.log(updated);
```

### ブログ記事削除（delete）
```typescript
import { deleteBlogPost } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteBlogPost(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### ブログカテゴリ一覧取得
```typescript
import { getBlogCategories } from '@ecatchup/basercms-js-sdk';
const blogContentId = 1;
const categories = await getBlogCategories(apiClient, blogContentId);
console.log(categories);
```

### ブログカテゴリ単一取得
```typescript
import { getBlogCategory } from '@ecatchup/basercms-js-sdk';
const category = await getBlogCategory(apiClient, 1);
console.log(category);
```

### ブログカテゴリ新規追加
```typescript
import { addBlogCategory } from '@ecatchup/basercms-js-sdk';
const newCategory = await addBlogCategory(apiClient, {
  name: 'new-category',
  blog_content_id: 1,
  title: '新しいカテゴリ',
  parent_id: null
});
console.log(newCategory);
```

### ブログカテゴリ編集
```typescript
import { editBlogCategory } from '@ecatchup/basercms-js-sdk';
const updated = await editBlogCategory(apiClient, '1', {
  title: '更新されたカテゴリ',
  name: 'updated-category'
});
console.log(updated);
```

### ブログカテゴリ削除
```typescript
import { deleteBlogCategory } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteBlogCategory(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### ブログタグ一覧取得
```typescript
import { getBlogTags } from '@ecatchup/basercms-js-sdk';
const tags = await getBlogTags(apiClient);
console.log(tags);
```

### ブログタグ単一取得
```typescript
import { getBlogTag } from '@ecatchup/basercms-js-sdk';
const tag = await getBlogTag(apiClient, 1);
console.log(tag);
```

### ブログタグ新規追加
```typescript
import { addBlogTag } from '@ecatchup/basercms-js-sdk';
const newTag = await addBlogTag(apiClient, {
  name: 'new-tag'
});
console.log(newTag);
```

### ブログタグ編集
```typescript
import { editBlogTag } from '@ecatchup/basercms-js-sdk';
const updated = await editBlogTag(apiClient, '1', {
  name: 'updated-tag'
});
console.log(updated);
```

### ブログタグ削除
```typescript
import { deleteBlogTag } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteBlogTag(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### ブログコンテンツ一覧取得
```typescript
import { getBlogContents } from '@ecatchup/basercms-js-sdk';
const contents = await getBlogContents(apiClient);
console.log(contents);
```

### ブログコンテンツ単一取得
```typescript
import { getBlogContent } from '@ecatchup/basercms-js-sdk';
const content = await getBlogContent(apiClient, 1);
console.log(content);
```

### ブログコンテンツ新規追加
```typescript
import { addBlogContent } from '@ecatchup/basercms-js-sdk';
const newContent = await addBlogContent(apiClient, {
  description: 'ブログの説明',
  template: 'default',
  list_count: 10,
  list_direction: 'DESC',
  feed_count: 10,
  tag_use: true,
  comment_use: true,
  comment_approve: false,
  widget_area: 2,
  eye_catch_size: 'medium',
  use_content: true
});
console.log(newContent);
```

### ブログコンテンツ編集
```typescript
import { editBlogContent } from '@ecatchup/basercms-js-sdk';
const updated = await editBlogContent(apiClient, '1', {
  description: '更新された説明',
  list_count: 20,
  tag_use: false
});
console.log(updated);
```

### ブログコンテンツ削除
```typescript
import { deleteBlogContent } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteBlogContent(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### カスタムテーブル一覧取得

```typescript
import { ApiClient, getCustomTables } from '@ecatchup/basercms-js-sdk';
const tables = await getCustomTables(apiClient);
console.log(tables);
```

### カスタムテーブル単一取得
```typescript
import { getCustomTable } from '@ecatchup/basercms-js-sdk';
const table = await getCustomTable(apiClient, '1');
console.log(table);
```

### カスタムテーブル新規登録
```typescript
import { addCustomTable } from '@ecatchup/basercms-js-sdk';
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
import { getCustomLinks } from '@ecatchup/basercms-js-sdk';
const links = await getCustomLinks(apiClient);
console.log(links);
```

### カスタムリンク単一取得
```typescript
import { getCustomLink } from '@ecatchup/basercms-js-sdk';
const link = await getCustomLink(apiClient, '1');
console.log(link);
```

### カスタムリンク新規追加
```typescript
import { addCustomLink } from '@ecatchup/basercms-js-sdk';
const newLink = await addCustomLink(apiClient, {
  custom_table_id: 1,
  custom_field_id: 1,
  name: 'new_link',
  title: '新しいリンク',
  no: 1,
  parent_id: null,
  level: 1,
  lft: 1,
  rght: 2,
  before_head: null,
  after_head: null,
  description: 'リンクの説明',
  attention: null,
  options: null,
  class: null,
  group_valid: false,
  before_linefeed: false,
  after_linefeed: false,
  use_loop: false,
  display_admin_list: true,
  display_front: true,
  search_target_admin: false,
  search_target_front: false,
  use_api: true,
  required: false,
  status: true
});
console.log(newLink);
```

### カスタムリンク編集
```typescript
import { editCustomLink } from '@ecatchup/basercms-js-sdk';
const updated = await editCustomLink(apiClient, '1', {
  title: '更新されたタイトル',
  description: '更新された説明',
  status: false
});
console.log(updated);
```

### カスタムリンク削除
```typescript
import { deleteCustomLink } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteCustomLink(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### カスタムエントリー新規登録
```typescript
import fs from 'fs';
import { addCustomEntry } from '@ecatchup/basercms-js-sdk';
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
import { getCustomEntries } from '@ecatchup/basercms-js-sdk';
const customTableId = 3;
const entries = await getCustomEntries(apiClient, customTableId);
console.log(entries);
```

### カスタムエントリー単一取得
```typescript
import { getCustomEntry } from '@ecatchup/basercms-js-sdk';
const customTableId = 3;
const entry = await getCustomEntry(apiClient, customTableId, '1');
console.log(entry);
```

### カスタムエントリー編集
```typescript
import { editCustomEntry } from '@ecatchup/basercms-js-sdk';
const customTableId = 3;
const updated = await editCustomEntry(apiClient, customTableId, '1', {
  title: '編集後タイトル',
  status: true,
});
console.log(updated);
```

### カスタムエントリー削除
```typescript
import { deleteCustomEntry } from '@ecatchup/basercms-js-sdk';
const customTableId = 3;
const deleted = await deleteCustomEntry(apiClient, customTableId, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### カスタムフィールド一覧取得
```typescript
import { getCustomFields } from '@ecatchup/basercms-js-sdk';
const fields = await getCustomFields(apiClient);
console.log(fields);
```

### カスタムフィールド単一取得
```typescript
import { getCustomField } from '@ecatchup/basercms-js-sdk';
const field = await getCustomField(apiClient, '1');
console.log(field);
```

### カスタムフィールド新規登録
```typescript
import { addCustomField } from '@ecatchup/basercms-js-sdk';
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
import { editCustomField } from '@ecatchup/basercms-js-sdk';
const updated = await editCustomField(apiClient, '1', {
  title: '編集後タイトル',
  status: 1,
});
console.log(updated);
```

### カスタムフィールド削除
```typescript
import { deleteCustomField } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteCustomField(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

---

### カスタムコンテンツ一覧取得
```typescript
import { getCustomContents } from '@ecatchup/basercms-js-sdk';
const contents = await getCustomContents(apiClient);
console.log(contents);
```

### カスタムコンテンツ単一取得
```typescript
import { getCustomContent } from '@ecatchup/basercms-js-sdk';
const content = await getCustomContent(apiClient, '1');
console.log(content);
```

### カスタムコンテンツ新規登録
```typescript
import { addCustomContent } from '@ecatchup/basercms-js-sdk';
const newContent = await addCustomContent(apiClient, {
  custom_table_id: 1,
  description: '説明',
  template: 'default',
  widget_area: 0,
  list_count: 10,
  list_order: 'id',
  list_direction: 'asc',
  content: {
    status: true,
    title: 'コンテンツタイトル'
  }
});
console.log(newContent);
```

### カスタムコンテンツ編集
```typescript
import { editCustomContent } from '@ecatchup/basercms-js-sdk';
const updated = await editCustomContent(apiClient, '1', {
  description: '更新された説明',
  list_count: 20,
  content: {
    title: '更新されたタイトル',
    status: false
  }
});
console.log(updated);
```

### カスタムコンテンツ削除
```typescript
import { deleteCustomContent } from '@ecatchup/basercms-js-sdk';
const deleted = await deleteCustomContent(apiClient, '1');
console.log(deleted); // true:成功, false:失敗
```

