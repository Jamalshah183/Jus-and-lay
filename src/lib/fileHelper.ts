/**
 * Compresses an image file if it is an image, otherwise returns the file.
 */
export async function compressImageIfPossible(file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.6): Promise<File> {
  if (!file.type.startsWith('image/') || file.type.includes('gif')) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              // Only return compressed if it's actually smaller
              if (compressedFile.size < file.size) {
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => {
        resolve(file);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      resolve(file);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * File to Base64 utility
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Converts a Base64 data URL into a binary Blob.
 */
export function base64ToBlob(base64Data: string): Blob {
  const parts = base64Data.split(';base64,');
  const contentType = parts[0].split(':')[1] || 'application/octet-stream';
  const byteCharacters = window.atob(parts[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

/**
 * Safe opening of links in another tab to avoid initiating forced downloads
 */
export function openOrDownloadFile(url: string, defaultName = 'case_document') {
  if (!url) return;
  if (url.startsWith('data:')) {
    try {
      const blob = base64ToBlob(url);
      const fileURL = URL.createObjectURL(blob);
      const isPdf = blob.type.includes('pdf');
      
      // Open clean new blank tab
      let viewer: Window | null = null;
      try {
        viewer = window.open('', '_blank');
      } catch (err) {
        console.warn("Failed to open blank window via window.open:", err);
      }
      if (viewer) {
        viewer.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${defaultName}</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                html, body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                  background-color: #0d0d0e;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  overflow: hidden;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                }
                .content-wrapper {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                iframe {
                  width: 100%;
                  height: 100%;
                  border: none;
                }
                img {
                  max-width: 95%;
                  max-height: 95%;
                  object-fit: contain;
                  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                  border-radius: 8px;
                  border: 1px solid rgba(255,255,255,0.1);
                  background: #161618;
                }
              </style>
            </head>
            <body>
              <div class="content-wrapper">
                ${isPdf 
                  ? `<iframe src="${fileURL}" type="application/pdf"></iframe>` 
                  : `<img src="${fileURL}" alt="${defaultName}" />`
                }
              </div>
            </body>
          </html>
        `);
        viewer.document.close();
      } else {
        // Fallback to normal behavior if blocked
        let fallbackTab: Window | null = null;
        try {
          fallbackTab = window.open(fileURL, '_blank');
        } catch (err) {
          console.warn("Failed to open fileURL via window.open:", err);
        }
        if (!fallbackTab) {
          window.location.href = fileURL;
        }
      }
    } catch (e) {
      console.error("Base64 document preview failed:", e);
      // Direct raw dataURL open as ultimate fallback
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } else {
    // Open standard cloud URLs in a new tab
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn("Failed to open standard URL via window.open:", err);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
