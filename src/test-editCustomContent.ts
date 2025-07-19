import { ApiClient } from './basercms-js-sdk';
import { editCustomContent } from './bc-custom-content/custom-contents';

(async () => {
  const apiClient = new ApiClient();
  await apiClient.login();
  try {
    const result = await editCustomContent(apiClient, '2', { description: 'テスト編集' });
    console.log('editCustomContent result:', result);
  } catch (e) {
    console.error('editCustomContent error:', e);
  }
})();
