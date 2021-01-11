import * as vscode from "vscode";

export function showTerminal() {
  getActiveTerminal().show(true);
}

export function executeShellCommand(command: string): void {
  getActiveTerminal().sendText(command, true);
}

export function switchToRoot(): void {
  const folders = vscode.workspace.workspaceFolders;
  if (folders && folders.length > 0) {
    executeShellCommand(`cd ${folders[0].uri.fsPath}`);
  }
}

function getActiveTerminal(): vscode.Terminal {
  let t = vscode.window.activeTerminal;
  if (!t) {
    t = vscode.window.createTerminal();
  }
  return t;
}
