import Link from 'next/link'; // ✅ Import the Link component

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Test Page</h1>
        <p className="text-gray-600">If you can see this, Next.js is working correctly!</p>
        <Link
          href="/"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
