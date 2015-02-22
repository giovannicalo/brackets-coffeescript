# Brackets CoffeeScript
An extension for [Brackets](https://github.com/adobe/brackets) that improves [CoffeeScript](https://github.com/jashkenas/coffeescript) and [CJSX](https://github.com/jsdf/coffee-react-transform) syntax highlighting.

It is meant as a temporary solution to use while waiting for an improved [CodeMirror](https://github.com/codemirror/CodeMirror) mode.

It uses the same coloring conventions as the JavaScript mode.

Improved syntax highlighting comes at the cost of some advanced features of the official mode.

![CoffeeScript Sample](http://i.imgur.com/6zT913M.png)
![CJSX Sample](http://i.imgur.com/OcnMqfA.png)

## Installation

### Extension Manager

1. In Brackets, `File > Extension Manager...`
2. Search for the extension, copy and paste the repository URL or download it as a ZIP file, then drag and drop it in place
3. Press `Install`

### Manual

1. Clone or download the repository.
2. In Brackets, `Help > Show Extensions Folder`.
3. Paste the repository in the `user` folder.
4. In Brackets, `Debug > Reload With Extensions` or `F5`

## Known Issues
* All variables assignments are recognized as definitions.
* Curly braces break string interpolation highlighting.
* No help is provided with indentation.
