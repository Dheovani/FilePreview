import * as vscode from 'vscode';
import { getPreview } from './preview';
import { isTypeSupported } from './types';

let panel: vscode.WebviewPanel | undefined;
let statusBarItem: vscode.StatusBarItem | undefined;

/**
 * Opens the SVG file viewer
 */
function openViewer(filename: string): void
{	
	panel?.reveal(vscode.ViewColumn.One);

	if (!panel) {
		panel = vscode.window.createWebviewPanel(
			'File Preview',
			'File Preview',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		// Delete panel on dispose
		panel.onDidDispose(() => panel = undefined);
		panel.onDidChangeViewState(() => panel?.dispose());
	}

	const preview = getPreview(filename, panel);
	
	if (preview)
		panel.webview.html = preview;
}

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

	// Open preview with mouse's right button
	const openPreviewMenuCommand = vscode.commands.registerCommand('extension.openFilePreviewMenuItem', (resource) => {
		if (resource && isTypeSupported(resource.fsPath))
			openViewer(resource.fsPath);
	});

	// Open using editor title button
	const openPreviewOnEditorButton = vscode.commands.registerCommand('extension.openPreviewShortcut', (resource) => {
		if (resource && isTypeSupported(resource.fsPath))
			openViewer(resource.fsPath);
	});

	context.subscriptions.push(openPreviewMenuCommand);
	context.subscriptions.push(openPreviewOnEditorButton);
}

export function deactivate(): void
{
	panel?.dispose();
	statusBarItem?.dispose();
}
