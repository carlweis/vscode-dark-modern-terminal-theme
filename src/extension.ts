// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let isEnabled = true; // Initial state

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('dark-modern-terminal-theme.enableDisableColors', () => {
		isEnabled = !isEnabled; // Toggle the state

		const config = vscode.workspace.getConfiguration('workbench');
		const terminalColors = {
			"terminal.background":"#1e1e1e",
			"terminal.foreground":"#d4d4d4",
			"terminal.ansiBlack":"#1e1e1e",
			"terminal.ansiBrightBlack":"#1e1e1e",
			"terminal.ansiBrightBlue":"#569cd6",
			"terminal.ansiBrightCyan":"#4ec9b0",
			"terminal.ansiBrightGreen":"#608b4e",
			"terminal.ansiBrightMagenta":"#c586c0",
			"terminal.ansiBrightRed":"#d16969",
			"terminal.ansiBrightWhite":"#d4d4d4",
			"terminal.ansiBrightYellow":"#d7ba7d",
			"terminal.ansiBlue":"#569cd6",
			"terminal.ansiCyan":"#4ec9b0",
			"terminal.ansiGreen":"#608b4e",
			"terminal.ansiMagenta":"#646695",
			"terminal.ansiRed":"#d16969",
			"terminal.ansiWhite":"#d4d4d4",
			"terminal.ansiYellow":"#d7ba7d"
		};
		const colorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations');
		const updatedColors = Object.assign({}, colorCustomizations);

		if (isEnabled) {
			Object.assign(updatedColors, terminalColors);
		} else {
			const colorCustomizationsObject: object = colorCustomizations as object; // Explicitly type colorCustomizations as an object
			if (Object.keys(colorCustomizationsObject).some(key => key.startsWith('terminal.'))) {
				// Disable colors: Remove only the terminal colors added by your extension
				for (const colorKey of Object.keys(terminalColors)) {
					if (updatedColors[colorKey as keyof typeof updatedColors] === terminalColors[colorKey as keyof typeof terminalColors]) {
						delete updatedColors[colorKey as keyof typeof updatedColors];
					}
				}
			}
		}

		vscode.workspace.getConfiguration('workbench').update('colorCustomizations', updatedColors, vscode.ConfigurationTarget.Global);
		vscode.window.showInformationMessage(`Dark Modern Terminal Colors ${isEnabled ? 'Enabled' : 'Disabled'}.`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Remove terminal_colors from the colorCustomizations
	const terminalColorsKeys = [
		"terminal.background",
		"terminal.foreground",
		"terminal.ansiBlack",
		"terminal.ansiBrightBlack",
		"terminal.ansiBrightBlue",
		"terminal.ansiBrightCyan",
		"terminal.ansiBrightGreen",
		"terminal.ansiBrightMagenta",
		"terminal.ansiBrightRed",
		"terminal.ansiBrightWhite",
		"terminal.ansiBrightYellow",
		"terminal.ansiBlue",
		"terminal.ansiCyan",
		"terminal.ansiGreen",
		"terminal.ansiMagenta",
		"terminal.ansiRed",
		"terminal.ansiWhite",
		"terminal.ansiYellow"
	];
	const config = vscode.workspace.getConfiguration('workbench');
	const colorCustomizations: { [key: string]: string } = config.get('colorCustomizations') || {};

	// Remove only the terminal colors added by your extension
	for (const colorKey of terminalColorsKeys) {
		if (colorCustomizations.hasOwnProperty(colorKey)) {
			delete colorCustomizations[colorKey];
		}
	}

	config.update("colorCustomizations", colorCustomizations, vscode.ConfigurationTarget.Global);
}
