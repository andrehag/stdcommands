import * as vscode from "vscode";
import { Command } from "./commands";
import { createDefaultCommands, getSettings, storeSettings } from "./config";
import { registerMultiple } from "./register";

/**
 * These are the standard commands that is registered. These must match contributed commands
 * in package.json.
 */
const commands: Command[] = ["build", "watch", "prepare", "clean"];

export function activate(context: vscode.ExtensionContext) {
  const settings = getSettings();
  const wsName = vscode.workspace.name;
  if (wsName && typeof settings[wsName] === "undefined") {
    settings[wsName] = createDefaultCommands();
    storeSettings(settings);
  }

  registerMultiple(commands).forEach((d) => {
    context.subscriptions.push(d);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
