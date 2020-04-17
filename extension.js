// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log(
  //   'Congratulations, your extension "vscode-code-block-header" is now active!'
  // );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "vscode-code-block-header.blockHeader",
    function () {
      let editor = vscode.window.activeTextEditor;

      if (editor) {
        let document = editor.document;
        let selection = editor.selection;

        // Only works for single lines
        if (!selection.isSingleLine) {
          return;
        }

        let line = selection.active.line;
        let text = document.lineAt(line).text;

        let length = 72 - text.length - 2 - 2; // -2 Spaces - '# '
        let quotient = Math.floor(length / 2);
        let remainder = length % 2;

        let block =
          "# " +
          "-".repeat(quotient) +
          " " +
          text +
          " " +
          "-".repeat(quotient) +
          "-".repeat(remainder);

        editor
          .edit((editBuilder) => {
            editBuilder.replace(
              new vscode.Range(line, 0, line, text.length),
              block
            );
          })
          .then((success) => {
            console.log("success:", success);
            var position = new vscode.Position(line, block.length);
            editor.selection = new vscode.Selection(position, position);
          });
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
