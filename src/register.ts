import * as vscode from "vscode";
import { Command, getCommand } from "./commands";
import { Settings } from "./config";
import { EXTENSION_ID, SWITCH_TO_ROOT } from "./constants";
import { executeShellCommand, showTerminal, switchToRoot } from "./shell";

export function registerCommand(cmd: Command) {
  const commandId = `${EXTENSION_ID}.${cmd}`;

  return vscode.commands.registerCommand(commandId, () => {
    const conf = vscode.workspace.getConfiguration(EXTENSION_ID);
    const switchRoot = conf.get(SWITCH_TO_ROOT);

    const buildCommand = getCommand(cmd);

    if (typeof buildCommand === "string" && buildCommand.length > 0) {
      if (switchRoot) {
        switchToRoot();
      }

      showTerminal();
      executeShellCommand(buildCommand);

      vscode.window.showInformationMessage(`Running standard command: ${cmd}`);
    } else {
      vscode.window.showErrorMessage(
        `Command ${cmd} not defined. Commands are defined in settings.`
      );
    }
  });
}

export function registerMultiple(cmds: Command[]) {
  return cmds.map(registerCommand);
}
