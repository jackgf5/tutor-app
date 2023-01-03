import Navbar from "./(modules)/Navbar/Navbar";

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <Navbar />
    </main>
  );
}
