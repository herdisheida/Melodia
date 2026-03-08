import { NextResponse } from "next/server";

// get album details and tracks by collectionId
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  try {
    const { collectionId } = await params;

    if (!collectionId) {
      return NextResponse.json(
        { error: "Missing collectionId" },
        { status: 400 },
      );
    }

    const url = `https://itunes.apple.com/lookup?id=${collectionId}&entity=song`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch album details from iTunes" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Album API route error:", error);

    return NextResponse.json(
      { error: "Server error while fetching album details" },
      { status: 500 },
    );
  }
}
