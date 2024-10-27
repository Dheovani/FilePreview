import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem | undefined;

/**
 * Displays the extension's status bar item
 */
function displayStatus(): void
{
	statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left,
		10000
	);
	
	statusBarItem.text = "$(eye) File Preview";
	statusBarItem.command = "extension.openExtensionPage";
	statusBarItem.tooltip = new vscode.MarkdownString()
		.appendMarkdown("**_File Viewer_**\n\n")
		.appendMarkdown("---\n\n")
		.appendMarkdown("The File Viewer Extension enables you to effortlessly preview and view different document ")
		.appendMarkdown("types within the editor, organizing views for maximum productivity.\n\n");

	// TODO: Add in next release, when there's a page to point to
	// .appendMarkdown("For a complete use tutorial, checkout the [extension's page](vscode:extension/Dheovani.filepreview).");
	
	statusBarItem.show();
}

export function activate(context: vscode.ExtensionContext): void
{
	displayStatus();
}

export function deactivate(): void
{
	statusBarItem?.dispose();
}
