export interface DirectoryNode {
  name: string;
  type: 'folder' | 'file';
  comment?: string;
  children?: DirectoryNode[];
}
