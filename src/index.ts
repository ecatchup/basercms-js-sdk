export { ApiClient } from "./basercms-js-sdk";

export {
  getCustomTables,
  getCustomTable,
  addCustomTable,
  editCustomTable,
  deleteCustomTable
} from "./bc-custom-content/custom-tables";
export type { CustomTable } from "./bc-custom-content/custom-tables";

export {
  getCustomContents,
  getCustomContent,
  addCustomContent,
  editCustomContent,
  deleteCustomContent
} from "./bc-custom-content/custom-contents";
export type { CustomContent } from "./bc-custom-content/custom-contents";

export {
  getCustomEntries,
  getCustomEntry,
  addCustomEntry,
  editCustomEntry,
  deleteCustomEntry
} from './bc-custom-content/custom-entries';
export type { CustomEntry } from './bc-custom-content/custom-entries';

export {
  getBlogPost,
  getBlogPosts,
  addBlogPost,
  editBlogPost,
  deleteBlogPost
} from "./bc-blog/blog-posts";
export type { BlogPost } from "./bc-blog/blog-posts";

export {
  login,
  getUserByEmail,
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser
} from "./baser-core/users";
export type { User, NewUser } from "./baser-core/users";

export {
  getBlogCategories,
  getBlogCategory,
  addBlogCategory,
  editBlogCategory,
  deleteBlogCategory
} from "./bc-blog/blog-categories";

export {
  getBlogTags,
  getBlogTag,
  addBlogTag,
  editBlogTag,
  deleteBlogTag
} from "./bc-blog/blog-tags";
export type { BlogTag } from "./bc-blog/blog-tags";

export {
  getBlogContents,
  getBlogContent,
  addBlogContent,
  editBlogContent,
  deleteBlogContent
} from "./bc-blog/blog-contents";
export type { BlogContent } from "./bc-blog/blog-contents";

export {
  getCustomFields,
  getCustomField,
  addCustomField,
  editCustomField,
  deleteCustomField
} from "./bc-custom-content/custom-fields";
export type { CustomField } from "./bc-custom-content/custom-fields";

export {
  getCustomLink,
  getCustomLinks,
  addCustomLink,
  editCustomLink,
  deleteCustomLink
} from "./bc-custom-content/custom-links";
export type { CustomLink } from "./bc-custom-content/custom-links";
