import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { SETTINGS_FILE_NAME } from "./constants";

export type Commands = {
  prepare: string;
  build: string;
  watch: string;
  clean: string;
};

export type Settings = {
  [k: string]: Commands;
};

function loadSettings(): Settings {
  const p = getSettingsFilePath();
  let retVal = {} as Settings;

  try {
    const json = fs.readFileSync(p).toString();
    retVal = JSON.parse(json);
  } catch (e) {
    // console.error(e);
  }

  return retVal;
}

let currentSettings: Settings | undefined = undefined;
export function storeSettings(s: Settings): void {
  currentSettings = s;

  const p = getSettingsFilePath();
  const f = fs.openSync(p, "w");
  fs.writeFileSync(f, JSON.stringify(s));
  fs.closeSync(f);
}

export function getSettings(): Settings {
  if (!currentSettings) {
    currentSettings = loadSettings();
  }
  return currentSettings;
}

export function createDefaultCommands(): Commands {
  return {
    prepare: "",
    build: "",
    watch: "",
    clean: "",
  };
}

function getSettingsFilePath(): string {
  return path.resolve(os.homedir(), SETTINGS_FILE_NAME);
}
