define(function(require, exports, module) {
	"use strict";
	var LanguageManager = brackets.getModule("language/LanguageManager");
	var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
	CodeMirror.defineMode("coffeescriptimproved", function(config) {
		var constants = [
			"false",
			"no",
			"null",
			"off",
			"on",
			"true",
			"undefined",
			"Infinity",
			"NaN"
		];
		var keywords = [
			"and",
			"break",
			"by",
			"catch",
			"class",
			"continue",
			"debugger",
			"delete",
			"do",
			"else",
			"extends",
			"finally",
			"for",
			"if",
			"in",
			"instanceof",
			"is",
			"isnt",
			"loop",
			"new",
			"not",
			"of",
			"or",
			"return",
			"super",
			"switch",
			"then",
			"this",
			"throw",
			"try",
			"typeof",
			"unless",
			"until",
			"when",
			"while"
		];
		//var defined = [];
		return {
			token: function(stream, state) {
				var highlight = "";
				var match = null;
				if (state.inKeyword) {
					if (stream.match(/^[^a-z]/, false)) {
						state.inKeyword = false;
					} else {
						highlight = "keyword";
					}
				} else if (match = stream.match(new RegExp("^" + keywords.join("|")), false)) {
					if ((match[0].length === match.input.length) || (stream.match(new RegExp("^(" + keywords.join("|") + ")[^a-zA-Z0-9\$_]"), false))) {
						if (stream.column() !== 0) {
							stream.backUp(1);
							if (stream.match(new RegExp("^[^a-zA-Z0-9\$_](" + keywords.join("|") + ")"), false)) {
								state.inKeyword = true;
								highlight = "keyword";
							}
							stream.next();
						} else {
							state.inKeyword = true;
							highlight = "keyword";
						}
					}
				}
				if (state.inArguments) {
					if (stream.match(/^\)/, false)) {
						state.inArguments = false;
					}
				} else if (stream.match(/^\([^\n\r\(\)]*\)[\t ]*(->|=>)/, false)) {
					state.inArguments = true;
				}
				if (state.inThis) {
					if (stream.match(/^[^a-zA-Z0-9\$_]/, false)) {
						state.inThis = false;
					} else {
						highlight = "keyword";
					}
				} else if (match = stream.match(/^@[a-zA-Z0-9\$_]/, false)) {
					if (stream.column() !== 0) {
						stream.backUp(1);
						if (stream.match(/^[^a-zA-Z0-9\$_]@/, false)) {
							state.inThis = true;
							highlight = "keyword";
						}
						stream.next();
					} else {
						state.inThis = true;
						highlight = "keyword";
					}
				}
				if (state.inArgument) {
					if (stream.match(/^[\,\)\t ]/, false)) {
						state.inArgument = false;
					} else {
						highlight = "def";
					}
				} else if ((state.inArguments) && (stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*/, false))) {
					state.inArgument = true;
					highlight = "def";
				}
				if (state.inFunction) {
					if (stream.match(/^(:|=)/, false)) {
						state.inFunction = false;
					} else {
						highlight = "def";
					}
				} else if (stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*[\t ]*(:|=)[\t ]*(\([^\n\r]*\))?[\t ]*(->|=>)/, false)) {
					state.inFunction = true;
					highlight = "def";
				}
				if (state.inProperty) {
					if (stream.match(/^:/, false)) {
						state.inProperty = false;
					} else {
						highlight = "def";
					}
				} else if (stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*[\t ]*:/, false)) {
					state.inProperty = true;
					highlight = "def";
				}
				if (state.inDefinition) {
					if (stream.match(/^[=\[]/, false)) {
						state.inDefinition = false;
					} else {
						highlight = "def";
					}
				} else if (match = stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*(\[.*\])*[\t ]*=([^=]|$)/, false)) {
					state.inDefinition = true;
					highlight = "def";
					//if ((match = match[0].match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*/)[0]) && (defined.indexOf(match) === -1)) {
					//	defined.push(match);
					//}
				}
				if (state.inMethod) {
					if (stream.match(/^[^a-zA-Z0-9\$_]/, false)) {
						state.inMethod = false;
					} else {
						highlight = "def";
					}
				}
				if (stream.match(/^\.[a-zA-Z\$\_][a-zA-Z0-9\$_]*/, false)) {
					if (stream.column() !== 0) {
						stream.backUp(1);
						if (stream.match(/^\S\.[a-zA-Z\$\_][a-zA-Z0-9\$_]*/, false)) {
							state.inMethod = true;
						}
						stream.next();
					} else {
						state.inMethod = true;
					}
				}
				if (state.inNumber) {
					if (stream.match(/^[^0-9\.]/, false)) {
						state.inNumber = false;
					} else {
						highlight = "number";
					}
				} else if (stream.match(/^[0-9]/, false)) {
					if (stream.column() !== 0) {
						stream.backUp(1);
						if (stream.match(/^[^a-zA-Z0-9\$_][0-9]/, false)) {
							state.inNumber = true;
							highlight = "number";
						}
						stream.next();
					} else {
						state.inNumber = true;
						highlight = "number";
					}
				}
				if (state.inConstant) {
					if (stream.match(/^[^a-z]/, false)) {
						state.inConstant = false;
					} else {
						highlight = "string";
					}
				} else if (match = stream.match(new RegExp("^" + constants.join("|")), false)) {
					if ((match[0].length === match.input.length) || (stream.match(new RegExp("^(" + constants.join("|") + ")[^a-zA-Z0-9\$_]"), false))) {
						if (stream.column() !== 0) {
							stream.backUp(1);
							if (stream.match(new RegExp("^[^a-zA-Z0-9\$_](" + constants.join("|") + ")"), false)) {
								state.inConstant = true;
								highlight = "string";
							}
							stream.next();
						} else {
							state.inConstant = true;
							highlight = "string";
						}
					}
				}
				if (state.inString1) {
					if (stream.match(/^\\\\"/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^\\"/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^"/, false)) {
						state.inString1 = false;
						highlight = "string";
					} else {
						highlight = "string";
					}
				} else if ((!state.inString2) && (stream.match(/^"/, false))) {
					state.inString1 = true;
					highlight = "string";
				}
				if (state.inString2) {
					if (stream.match(/^\\\\'/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^\\'/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^'/, false)) {
						state.inString2 = false;
						highlight = "string";
					} else {
						highlight = "string";
					}
				} else if ((!state.inString1) && (stream.match(/^'/, false))) {
					state.inString2 = true;
					highlight = "string";
				}
				if (state.inRegExp) {
					if (stream.match(/^\\\//, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^\//, false)) {
						state.inRegExp = false;
						highlight = "string";
						stream.next();
						for (var i = 0; i < 3; i++) {
							if (stream.match(/^(g|m|i)/, false)) {
								stream.next();
							} else {
								stream.backUp(1);
								break;
							}
						}
					} else {
						highlight = "string";
					}
				} else if ((!state.inString1) && (!state.inString2) && (stream.match(/\/((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)\//, false))) {
					state.inRegExp = true;
					highlight = "string";
				}
				if (state.inBlockComment) {
					if (stream.match(/^###/, false)) {
						state.inBlockComment = false;
						highlight = "comment";
						stream.next();
						stream.next();
					} else {
						highlight = "comment";
					}
				} else if ((!state.inString1) && (!state.inString2) && (stream.match(/^###/, false))) {
					state.inBlockComment = true;
					highlight = "comment";
					stream.next();
					stream.next();
				}
				if (state.inLineComment) {
					if (stream.sol()) {
						state.inLineComment = false;
					} else {
						highlight = "comment";
					}
				} else if ((!state.inBlockComment) && (!state.inString1) && (!state.inString2) && (stream.match(/^#/, false))) {
					if (stream.column() > 1) {
						stream.backUp(2);
						if (!stream.match(/^###/, false)) {
							state.inLineComment = true;
							highlight = "comment";
						}
						stream.next();
						stream.next();
					} else {
						state.inLineComment = true;
						highlight = "comment";
					}
				}
				stream.next();
				return highlight;
			},
			startState: function() {
				return {
					inArguments: false,
					inBlockComment: false,
					inConstant: false,
					inDefinition: false,
					inFunction: false,
					inKeyword: false,
					inLineComment: false,
					inMethod: false,
					inNumber: false,
					inThis: false,
					inProperty: false,
					inRegExp: false,
					inString1: false,
					inString2: false
				};
			}
		};
	});
	CodeMirror.defineMIME("text/coffeescript", "coffeescriptimproved");
	LanguageManager.getLanguage("coffeescript").removeFileExtension("coffee");
	LanguageManager.defineLanguage("coffeescriptimproved", {
		fileExtensions: ["coffee"],
		mode: "coffeescriptimproved",
		name: "CoffeeScript"
	});
});
