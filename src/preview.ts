import * as vscode from 'vscode';
import { isAudioType, isImageType, isOfficeType, isTextType, isVideoType } from "./types";

/**
 * Returns the content of the preview panel for text preview
 */
function getTextPreview(filename: string, panel: vscode.WebviewPanel): string | null {
    if (isTextType(filename)) {
        const fileUri = vscode.Uri.file(filename);
        const fileWebviewUri = panel.webview.asWebviewUri(fileUri);

        // TODO: Fix problem on display
        return `
            <html>
                <head>
                    <title>File Preview</title>
                </head>
                <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;">
                    <embed src="${fileWebviewUri}" type="application/pdf" width="100%" height="100%" style="border: none;" />
                </body>
            </html>
        `;
    }

    return null;
}

/**
 * Returns the content of the preview panel for image preview
 */
function getImagePreview(filename: string, panel: vscode.WebviewPanel): string | null
{
    if (isImageType(filename)) {
        const fileUri = vscode.Uri.file(filename);
        const fileWebviewUri = panel.webview.asWebviewUri(fileUri);

        const bodyStyle = `
            background-color: white;
            background-image: 
                linear-gradient(45deg, lightgray 25%, transparent 25%, transparent 75%, lightgray 75%, lightgray),
                linear-gradient(45deg, lightgray 25%, transparent 25%, transparent 75%, lightgray 75%, lightgray);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        `;

        return `
            <html>
                <head>
                    <title>File Preview</title>
                </head>
                <body style="${bodyStyle}">
                    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                        <img src="${fileWebviewUri}" alt="image" style="width: 90%; height: 90%; object-fit: contain;" />
                    </div>
                </body>
            </html>
        `;
    }

    return null;
}

/**
 * Returns the content of the preview panel for video preview
 */
function getVideoPreview(filename: string, panel: vscode.WebviewPanel): string | null
{
    if (isVideoType(filename)) {
        const fileUri = vscode.Uri.file(filename);
        const fileWebviewUri = panel.webview.asWebviewUri(fileUri);

        return `
            <html>
                <head>
                    <title>File Preview</title>
                </head>
                <body>
                    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                        <video controls>
                            <source src="${fileWebviewUri}" type="video/mp4" />
                            Video tag not supported.
                        </video>
                    </div>
                </body>
            </html>
        `;
    }

    return null;
}

/**
 * Returns the content of the preview panel for audio preview
 */
function getAudioPreview(filename: string, panel: vscode.WebviewPanel): string | null
{
    if (isAudioType(filename)) {
        const fileUri = vscode.Uri.file(filename);
        const fileWebviewUri = panel.webview.asWebviewUri(fileUri);
        const audioType = `${filename.split('.').pop()}`.toLowerCase() == "wav" ? "wav" : "mpeg";

        // TODO: Fix problem on display
        return `
            <html>
                <head>
                    <title>File Preview</title>
                </head>
                <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                    <audio controls>
                        <source src="${fileWebviewUri}" type="audio/${audioType}">
                        Audio not supported.
                    </audio>
                </body>
            </html>
        `;
    }

    return null;
}

/**
 * Returns the content of the preview panel
 */
export function getPreview(filename: string, panel: vscode.WebviewPanel): string | null
{
    switch (true) {
        case isTextType(filename):
            return getTextPreview(filename, panel);

        case isImageType(filename):
            return getImagePreview(filename, panel);
        
        case isVideoType(filename):
            return getVideoPreview(filename, panel);

        case isAudioType(filename):
            return getAudioPreview(filename, panel);

        // TODO: Implement support to office types
        case isOfficeType(filename):
        default:
            return null;
    }
}
