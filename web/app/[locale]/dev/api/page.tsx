import { MOCK_SPEC, TAGS, type MockEndpoint, type HttpMethod } from "./mockSpec";

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET:    "bg-green-100 text-green-700 border-green-300",
  POST:   "bg-blue-100 text-blue-700 border-blue-300",
  PUT:    "bg-yellow-100 text-yellow-700 border-yellow-300",
  PATCH:  "bg-orange-100 text-orange-700 border-orange-300",
  DELETE: "bg-red-100 text-red-700 border-red-300",
};

function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] font-bold ${METHOD_COLORS[method]}`}
    >
      {method}
    </span>
  );
}

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-900 px-4 py-3 text-[12px] leading-relaxed text-gray-200">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

function EndpointCard({ ep }: { ep: MockEndpoint }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <MethodBadge method={ep.method} />
        <code className="flex-1 font-mono text-[14px] text-gray-800">{ep.path}</code>
        <span className="text-[13px] text-gray-400">{ep.delay}ms</span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 px-5 py-4">
        <p className="text-[14px] font-semibold text-gray-700">{ep.summary}</p>

        {ep.notes && (
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-[12px] text-amber-700">
            <span>⚠</span>
            <span>{ep.notes}</span>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {ep.requestBody !== undefined && (
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Request Body
              </p>
              <JsonBlock value={ep.requestBody} />
            </div>
          )}
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Response
            </p>
            <JsonBlock value={ep.response} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MockApiPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-[18px] font-bold text-white">B</span>
            </div>
            <h1 className="text-[22px] font-bold text-gray-900">
              비플월렛 Mock API
            </h1>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
              DEV ONLY
            </span>
          </div>
          <p className="text-[13px] text-gray-500">
            MSW(Mock Service Worker)로 모의 응답 중인 API 목록입니다.
            실제 서버 없이 개발·테스트 환경에서만 동작합니다.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mb-8 flex gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-center">
            <p className="text-[22px] font-bold text-gray-900">{MOCK_SPEC.length}</p>
            <p className="text-[11px] text-gray-400">총 엔드포인트</p>
          </div>
          <div className="mx-2 w-px bg-gray-100" />
          {(["GET", "POST"] as const).map((m) => (
            <div key={m} className="text-center">
              <p className="text-[22px] font-bold text-gray-900">
                {MOCK_SPEC.filter((e) => e.method === m).length}
              </p>
              <p className="text-[11px] text-gray-400">{m}</p>
            </div>
          ))}
          <div className="mx-2 w-px bg-gray-100" />
          <div className="text-center">
            <p className="text-[22px] font-bold text-gray-900">{TAGS.length}</p>
            <p className="text-[11px] text-gray-400">태그</p>
          </div>
        </div>

        {/* Endpoints grouped by tag */}
        {TAGS.map((tag) => {
          const endpoints = MOCK_SPEC.filter((e) => e.tag === tag);
          return (
            <section key={tag} className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-[16px] font-bold text-gray-700">
                <span className="h-5 w-1 rounded-full bg-primary" />
                {tag}
                <span className="text-[13px] font-normal text-gray-400">
                  ({endpoints.length}개)
                </span>
              </h2>
              <div className="flex flex-col gap-3">
                {endpoints.map((ep) => (
                  <EndpointCard key={`${ep.method}-${ep.path}`} ep={ep} />
                ))}
              </div>
            </section>
          );
        })}

        <p className="text-center text-[11px] text-gray-400">
          이 페이지는 NODE_ENV=development 환경에서만 접근 가능합니다
        </p>
      </div>
    </main>
  );
}
