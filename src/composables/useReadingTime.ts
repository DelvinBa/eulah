// composables/useReadingTime.js
import readingTime from "reading-time";

export function useReadingTime(content: string) {
  // content should be a string (the Markdown or plain text content of your post)
  return readingTime(content);
}
