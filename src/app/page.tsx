import Link from "next/link";
import { CopyIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-neutral-800">
      <main className="max-w-4xl mx-auto py-24 px-6">
        <header className="mb-16">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium bg-neutral-900 border border-neutral-800 rounded-full text-neutral-400">
            API Version 1.0 is Live
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">
            Disposable Email Verification API
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Verify if an email address is a temporary or disposable email instantly. Stop spam and improve your user quality.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            Integration Guide
          </h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <span className="text-xs font-mono text-neutral-500">cURL example</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-neutral-300">
                <code className="block">
<span className="text-pink-400">curl</span> -X GET \
  <span className="text-green-400">"https://api.yourdomain.com/api/v1/verify?email=test@mailinator.com"</span> \
  -H <span className="text-green-400">"x-api-key: YOUR_API_KEY"</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Blazing Fast</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Deployed on Vercel Edge Network for single-digit millisecond latency worldwide.</p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Live Updated List</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Blocked domains are updated daily from the largest open-source registry.</p>
          </div>
        </section>

      </main>
    </div>
  );
}
