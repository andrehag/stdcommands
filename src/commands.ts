import { create } from "domain";
import * as vscode from "vscode";
import { Commands, createDefaultCommands, getSettings } from "./config";
import { EXTENSION_ID } from "./constants";

export type Command = "build" | "watch" | "clean" | "prepare";

export function getCommand(cmd: Command): string {
  const conf = vscode.workspace.getConfiguration(EXTENSION_ID);
  const buildCommand = conf.get(cmd);

  if (typeof buildCommand === "string" && buildCommand.length > 0) {
    return buildCommand;
  } else {
    const commandsFromSettingsFile = getCurrentWorkspaceCommands();
    return commandsFromSettingsFile[cmd];
  }
}

export function getCurrentWorkspaceCommands(): Commands {
  const settings = getSettings();
  const wsName = vscode.workspace.name;
  if (wsName && settings[wsName]) {
    return settings[wsName];
  }

  return createDefaultCommands();
}
