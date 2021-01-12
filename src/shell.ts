import * as vscode from "vscode";
import { EXTENSION_ID, ROOT_FOLDER_OVERRIDE } from "./constants";

export function showTerminal() {
  getActiveTerminal().show(true);
}

export function executeShellCommand(command: string): void {
  getActiveTerminal().sendText(command, true);
}

export function switchToRoot(): void {
  const conf = vscode.workspace.getConfiguration(EXTENSION_ID);
  const rootFolderOverride = conf.get(ROOT_FOLDER_OVERRIDE);

  const folders = vscode.workspace.workspaceFolders;
  const rootFolder =
    rootFolderOverride ||
    (folders && folders.length > 0 ? folders[0].uri.fsPath : "");

  if (rootFolder) {
    executeShellCommand(`cd ${rootFolder}`);
  }
}

function getActiveTerminal(): vscode.Terminal {
  let t = vscode.window.activeTerminal;
  if (!t) {
    t = vscode.window.createTerminal();
  }
  return t;
}
