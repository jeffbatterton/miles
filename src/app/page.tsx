import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto max-w-md p-4">
      <header className="py-4">
        <h1 className="text-2xl font-bold tracking-tight">Miles</h1>
        <p className="text-sm text-gray-600">Log trips quickly. Mobile first.</p>
      </header>
      <nav className="flex gap-2 text-sm">
        <a href="/" className="underline">Trips</a>
        <a href="/new" className="underline">New Trip</a>
      </nav>
    </main>
  );
}