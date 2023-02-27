# Test

```scss
pre code {
  font-size: 0.875em;
}

pre[class^="language"] {
  position: relative;
  background-color: var(--foreground-10);
  color: var(--foreground-10-text);
  padding: var(--space);
  border-radius: var(--border-radius);
  overflow: scroll;
  &::before {
    content: "";
    display: block;
    background-color: var(--secondary);
    color: var(--secondary-text);
    position: absolute;
    right: var(--space);
    top: 0;
    // transform: translateY(-50%);
    padding: var(--space-xs);
    line-height: 1;
    font-size: 0.75em;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
  &.language {
    &-json::before {
      content: "json";
    }
    &-bash::before {
      content: "bash";
    }
    &-ejs::before {
      content: "ejs";
    }
  }
}

code {
  font-size: 0.875em;
  background-color: var(--foreground-10);
  color: var(--foreground-10-text);
  padding: var(--space-xs);
  border-radius: var(--border-radius);
}

```

```ts

import { dirname } from "path";
import { createWriteStream } from "fs";
import https from "https";
import fetch from "node-fetch";
import { createDir } from "@sil/tools/dist/lib/system";

export interface DownloadResponse {
  body: any;
  [index: string]: any;
}

export const download = async (
  url: string,
  destination: string
): Promise<void> => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const res: DownloadResponse = await fetch(url, { agent });
  await createDir(dirname(destination));
  await new Promise((resolve, reject) => {
    const fileStream = createWriteStream(destination);
    res.body?.pipe(fileStream);
    res.body?.on("error", (err: any) => {
      reject(err);
    });
    fileStream.on("finish", () => {
      //@ts-ignore: Resolve has to be resolved some how
      resolve();
    });
  });
};

export const getGist = async (id: string): Promise<string> => {
  const url = `https://api.github.com/gists/${id}`;

  const res: DownloadResponse = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);

  const file = (Object.values(res.files)[0] as any).content;

  return file;
};

```
