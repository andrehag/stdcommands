# stdcommands README

This extension allows you to define some standard shell-commands as VS Code commands. These commands are set up:

- Prepare
- Build
- Watch
- Clean

The initial goal of this is to work with the stream-deck integration to have per-workspace standard commands.

## Extension Settings

This extension contributes the following settings:

- `stdcommands.prepare`: Shell-command for prepare-action. This is typically used for npm install and similar
- `stdcommands.build`: Production build-command
- `stdcommands.watch`: Development watch-build command
- `stdcommands.clean`: Clean-command

## Release Notes

### 0.1.0

Initial release.
