const vscode = require('vscode');

const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
const commandId = 'extension.totalLines';

function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand(commandId, function () {
	  vscode.window.showInformationMessage(`${getTotalLines()}   *Happy Coding...*!`);
  }));
  
  statusBarItem.command = commandId;
  context.subscriptions.push(statusBarItem);
  
  context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
  context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(updateStatusBarItem));

	// update status bar item once at start
  updateStatusBarItem();
}


function getTotalLines() {
  const editor = vscode.window.activeTextEditor;
  let totalLines = 0;
  if (editor) {
    const doc = editor.document;
    totalLines = (doc.getText().match(/\n/g) || '').length + 1;
  }
  return `Total ${totalLines > 1 ? `Lines:` : `Line:` } ${totalLines}`;
}

function updateStatusBarItem() {
  const editor = vscode.window.activeTextEditor;
  statusBarItem.text =  getTotalLines();
	statusBarItem.tooltip = `Total Lines`
  editor ? statusBarItem.show() :  statusBarItem.hide() ;
}


function deactivate() {}

module.exports = {
	activate,
	deactivate
}