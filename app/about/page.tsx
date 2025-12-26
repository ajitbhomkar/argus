export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">About Argus</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg">
          Argus is a modern Next.js application built with the latest technologies
          and best practices.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Technology Stack</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Next.js 14+ with App Router</li>
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for styling</li>
          <li>shadcn/ui components</li>
          <li>NextAuth.js for authentication</li>
          <li>Prisma ORM with PostgreSQL</li>
          <li>Dark mode support</li>
        </ul>
      </div>
    </div>
  )
}
