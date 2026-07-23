import { notFound } from "next/navigation";
import { chapters, getChapter } from "@/content/chapters";
import { ChapterView } from "@/components/chapter/ChapterView";

export function generateStaticParams() {
  return chapters.map((c) => ({ id: String(c.id) }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const chapter = getChapter(Number(id));
    return {
      title: chapter ? `Ch. ${chapter.id} ${chapter.title}` : "Chapter",
    };
  });
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = getChapter(Number(id));
  if (!chapter) notFound();
  return <ChapterView chapter={chapter} />;
}
