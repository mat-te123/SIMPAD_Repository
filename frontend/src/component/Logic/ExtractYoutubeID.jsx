function extractYouTubeID(url) {
  try {
    const parsedUrl = new URL(url);

    // 1. If normal youtube link → https://www.youtube.com/watch?v=ID
    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // 2. If short link → https://youtu.be/ID
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.substring(1);
    }

    // 3. If embed link → https://www.youtube.com/embed/ID
    if (parsedUrl.pathname.startsWith("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1];
    }

    return null;
  } catch {
    return null;
  }
}
export default extractYouTubeID;