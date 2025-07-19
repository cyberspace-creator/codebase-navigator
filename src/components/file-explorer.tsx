'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DirectoryNode } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Folder, File, ChevronRight, FolderOpen } from 'lucide-react';

function TreeNode({ node, isRoot = false }: { node: DirectoryNode; isRoot?: boolean }) {
  const [isOpen, setIsOpen] = useState(isRoot);

  const isFolder = node.type === 'folder';

  return (
    <div className={cn(!isRoot && 'pl-1')}>
      <button
        onClick={() => isFolder && setIsOpen(!isOpen)}
        disabled={!isFolder}
        aria-expanded={isFolder ? isOpen : undefined}
        className={cn(
          'flex items-center py-1.5 w-full text-left rounded-md hover:bg-accent/50 disabled:hover:bg-transparent transition-colors px-1',
          { 'cursor-default': !isFolder }
        )}
      >
        <span className="flex items-center w-5 mr-1 flex-shrink-0">
          {isFolder && (
            <ChevronRight className={cn('h-4 w-4 transform transition-transform', isOpen && 'rotate-90')} />
          )}
        </span>

        {isFolder ? (
          isOpen ? (
            <FolderOpen className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
          ) : (
            <Folder className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
          )
        ) : (
          <File className="mr-2 h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}

        <span className="font-code font-medium text-sm">{node.name}</span>
        {node.comment && <span className="ml-2 text-muted-foreground font-code text-xs truncate">{node.comment}</span>}
      </button>

      {isFolder && isOpen && node.children && (
        <div className="pl-5 border-l-2 border-dashed ml-[14px]">
          {node.children.map(child => (
            <TreeNode key={child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({ rootNode }: { rootNode: DirectoryNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Directory Structure</CardTitle>
      </CardHeader>
      <CardContent className="pr-2">
        <TreeNode node={rootNode} isRoot />
      </CardContent>
    </Card>
  );
}
