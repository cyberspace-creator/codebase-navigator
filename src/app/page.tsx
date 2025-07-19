import { FileExplorer } from '@/components/file-explorer';
import { CodeSummary } from '@/components/code-summary';
import { summarizeCodebase } from '@/ai/flows/summarize-codebase';
import { directoryData } from '@/lib/data';
import { formatDirectoryToString } from '@/lib/utils';
import { FileCode2 } from 'lucide-react';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function SummarySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

async function GeneratedCodeSummary() {
  const directoryString = formatDirectoryToString(directoryData);
  const { summary } = await summarizeCodebase(directoryString);
  return <CodeSummary summary={summary} />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-3">
          <FileCode2 className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold font-headline">
            Codebase Navigator
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <FileExplorer rootNode={directoryData} />
          <Suspense fallback={<SummarySkeleton />}>
            <GeneratedCodeSummary />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
