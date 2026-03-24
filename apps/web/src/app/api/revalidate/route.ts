import { env } from "@workspace/env/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type SanityWebhookPayload = {
  _type?: string;
  slug?: {
    current?: string;
  } | null;
};

function buildRevalidatedPaths(payload: SanityWebhookPayload) {
  const paths = new Set<string>(["/", "/api/navigation"]);

  if (payload._type === "page" && payload.slug?.current) {
    paths.add(`/${payload.slug.current}`);
  }

  return [...paths];
}

async function revalidateFromRequest(request: NextRequest) {
  if (!env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, message: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  const secret =
    request.nextUrl.searchParams.get("secret") ?? request.headers.get("x-revalidate-secret");

  if (secret !== env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  let payload: SanityWebhookPayload = {};

  if (request.method === "POST") {
    try {
      payload = (await request.json()) as SanityWebhookPayload;
    } catch {
      payload = {};
    }
  }

  const paths = buildRevalidatedPaths(payload);

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    paths,
    documentType: payload._type ?? null,
    slug: payload.slug?.current ?? null,
  });
}

export async function GET(request: NextRequest) {
  return revalidateFromRequest(request);
}

export async function POST(request: NextRequest) {
  return revalidateFromRequest(request);
}
