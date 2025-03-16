import * as vscode from "vscode";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "open-in-phpstorm.openFile",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No file opened.");
        return;
      }

      const filePath = editor.document.fileName;
      const line = editor.selection.active.line + 1;
      const position = editor.selection.active.character;

      const command = `open "phpstorm://open?file=${filePath}&line=${line}&column=${position}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(
            `Error when opening PhpStorm: ${stderr}`
          );
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
