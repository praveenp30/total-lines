const vscode = require('vscode');

function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.totalLines', function () {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showInformationMessage('No open file!');
		return;
	}

	const doc = editor.document;
	const totalLines = (doc.getText().match(/\n/g) || '').length + 1;
	const statusBar =vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);

	statusBar.text = `Total ${totalLines > 1 ? `Lines:` : `Line:` } ${totalLines}`
	statusBar.tooltip = `Total Lines`
	statusBar.show();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
