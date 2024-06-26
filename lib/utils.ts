import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isImage(name: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|tif|tiff)$/.test(name);
}

export function isDocument(name: string) {
  return /\.(pdf|doc|docx|xls|xlsx)$/.test(name);
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export function getApplicationType(extension: string) {
  if (extension[0] === ".") {
    extension = extension.substring(1);
  }
  return {
    aac: "audio",
    abw: "document",
    arc: "archive",
    avi: "video",
    azw: "ebook",
    bin: "binary",
    bmp: "image",
    bz: "archive",
    bz2: "archive",
    cda: "document",
    csh: "script",
    css: "stylesheet",
    csv: "document",
    doc: "document",
    docx: "document",
    eot: "font",
    epub: "ebook",
    gz: "archive",
    gif: "image",
    htm: "document",
    html: "document",
    ico: "image",
    ics: "document",
    jar: "archive",
    jpeg: "image",
    jpg: "image",
    js: "script",
    json: "document",
    jsonld: "document",
    mid: "audio",
    midi: "audio",
    mjs: "script",
    mp3: "audio",
    mp4: "video",
    mpeg: "video",
    mpkg: "document",
    odp: "document",
    ods: "document",
    odt: "document",
    oga: "audio",
    ogv: "video",
    ogx: "document",
    opus: "audio",
    otf: "font",
    png: "image",
    pdf: "document",
    php: "script",
    ppt: "document",
    pptx: "document",
    rar: "archive",
    rtf: "document",
    sh: "script",
    svg: "image",
    swf: "script",
    tar: "archive",
    tif: "image",
    tiff: "image",
    ts: "video",
    ttf: "font",
    txt: "document",
    vsd: "document",
    wav: "audio",
    weba: "audio",
    webm: "video",
    webp: "image",
    woff: "font",
    woff2: "font",
    xhtml: "document",
    xls: "document",
    xlsx: "document",
    xml: "document",
    xul: "document",
  };
}

export function getMimeTypeFromExtension(extension: string) {
  if (extension[0] === ".") {
    extension = extension.substring(1);
  }
  return (
    {
      aac: "audio/aac",
      abw: "application/x-abiword",
      arc: "application/x-freearc",
      avi: "video/x-msvideo",
      azw: "application/vnd.amazon.ebook",
      bin: "application/octet-stream",
      bmp: "image/bmp",
      bz: "application/x-bzip",
      bz2: "application/x-bzip2",
      cda: "application/x-cdf",
      csh: "application/x-csh",
      css: "text/css",
      csv: "text/csv",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      eot: "application/vnd.ms-fontobject",
      epub: "application/epub+zip",
      gz: "application/gzip",
      gif: "image/gif",
      htm: "text/html",
      html: "text/html",
      ico: "image/vnd.microsoft.icon",
      ics: "text/calendar",
      jar: "application/java-archive",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      js: "text/javascript",
      json: "application/json",
      jsonld: "application/ld+json",
      mid: "audio/midi audio/x-midi",
      midi: "audio/midi audio/x-midi",
      mjs: "text/javascript",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      mpeg: "video/mpeg",
      mpkg: "application/vnd.apple.installer+xml",
      odp: "application/vnd.oasis.opendocument.presentation",
      ods: "application/vnd.oasis.opendocument.spreadsheet",
      odt: "application/vnd.oasis.opendocument.text",
      oga: "audio/ogg",
      ogv: "video/ogg",
      ogx: "application/ogg",
      opus: "audio/opus",
      otf: "font/otf",
      png: "image/png",
      pdf: "application/pdf",
      php: "application/x-httpd-php",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      rar: "application/vnd.rar",
      rtf: "application/rtf",
      sh: "application/x-sh",
      svg: "image/svg+xml",
      swf: "application/x-shockwave-flash",
      tar: "application/x-tar",
      tif: "image/tiff",
      tiff: "image/tiff",
      ts: "video/mp2t",
      ttf: "font/ttf",
      txt: "text/plain",
      vsd: "application/vnd.visio",
      wav: "audio/wav",
      weba: "audio/webm",
      webm: "video/webm",
      webp: "image/webp",
      woff: "font/woff",
      woff2: "font/woff2",
      xhtml: "application/xhtml+xml",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xml: "application/xml",
      xul: "application/vnd.mozilla.xul+xml",
      zip: "application/zip",
      "3gp": "video/3gpp",
      "3g2": "video/3gpp2",
      "7z": "application/x-7z-compressed",
    }[extension] || "application/octet-stream"
  );
}
