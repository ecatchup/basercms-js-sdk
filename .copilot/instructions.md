# Copilot Instructions

## フレームワーク
CakePHP 5系
baserCMS 5系

## ドキュメント
- [baserCMS Web API ガイド](https://baserproject.github.io/5/web_api/)

## 注意事項

### ファイルアップロードについて
ファイルアップロードの際は、Node.js の場合、fs を利用してアップロードします。

```typescript
import fs from 'fs';
const value = fs.createReadStream('./asset_sample/test.jpg');
```