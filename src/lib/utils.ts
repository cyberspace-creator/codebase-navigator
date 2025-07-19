import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DirectoryNode } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function formatDirectoryToStringRecursive(nodes: DirectoryNode[], prefix: string): string {
  let result = '';
  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const name = node.type === 'folder' ? `${node.name}/` : node.name;
    const comment = node.comment ? ` ${node.comment}` : '';
    result += `${prefix}${connector}${name}${comment}\n`;

    if (node.children && node.children.length > 0) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      result += formatDirectoryToStringRecursive(node.children, newPrefix);
    }
  });
  return result;
}

export function formatDirectoryToString(root: DirectoryNode): string {
  let result = `${root.name}/\n`;
  if (root.children) {
    result += formatDirectoryToStringRecursive(root.children, '');
  }
  return result;
}
