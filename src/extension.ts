import * as vscode from "vscode";

import { exec } from "child_process";

function openFileInIDE(filePath: string, line: number, position: number, ide: string) {
  if (ide === "pycharm-ce") {
    const command = `open -a "PyCharm CE" "${filePath}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(
          `Error opening PyCharm CE: ${stderr}`
        );
      }
    });
  } else {
    const command = `open "${ide}://open?file=${filePath}&line=${line}&column=${position}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(
          `Error when opening ${ide}: ${stderr}`
        );
      }
    });
  }
}

export function activate(context: vscode.ExtensionContext) {
  let phpStormDisposable = vscode.commands.registerCommand(
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

      openFileInIDE(filePath, line, position, "phpstorm");
    }
  );

  let pyCharmCEDisposable = vscode.commands.registerCommand(
    "open-in-pycharm-ce.openFile",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No file opened.");
        return;
      }

      const filePath = editor.document.fileName;
      const line = editor.selection.active.line + 1;
      const position = editor.selection.active.character;

      openFileInIDE(filePath, line, position, "pycharm-ce");
    }
  );

  context.subscriptions.push(phpStormDisposable);
  context.subscriptions.push(pyCharmCEDisposable);
}

export function deactivate() {}
