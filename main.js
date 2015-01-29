define(function(require, exports, module) {
	"use strict";
	var language_manager = brackets.getModule("language/LanguageManager");
	var code_mirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
	code_mirror.defineMode("coffeescriptimproved", function(config) {
		var constant_list = [
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
		var keyword_list = [
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
				if (state.keyword) {
					if (stream.match(/^[^a-z]/, false)) {
						state.keyword = false;
					} else {
						highlight = "keyword";
					}
				} else if (match = stream.match(new RegExp("^" + keyword_list.join("|")), false)) {
					if (stream.match(new RegExp("^(" + keyword_list.join("|") + ")([^a-zA-Z0-9\$_]|$)"), false)) {
						if (stream.column() !== 0) {
							stream.backUp(1);
							if (stream.match(new RegExp("^[^a-zA-Z0-9\$_]"), false)) {
								state.keyword = true;
								highlight = "keyword";
							}
							stream.next();
						} else {
							state.keyword = true;
							highlight = "keyword";
						}
					}
				}
				if (state.parameter_list) {
					if (stream.match(/^\)/, false)) {
						state.parameter_list = false;
					}
				} else if (stream.match(/^\([^\n\r\(\)]*\)[\t ]*(->|=>)/, false)) {
					state.parameter_list = true;
				}
				if (state.this) {
					if (stream.match(/^[^a-zA-Z0-9\$_]/, false)) {
						state.this = false;
					} else {
						highlight = "keyword";
					}
				} else if (match = stream.match(/^@[a-zA-Z0-9\$_]/, false)) {
					if (stream.column() !== 0) {
						stream.backUp(1);
						if (stream.match(/^[^a-zA-Z0-9\$_]/, false)) {
							state.this = true;
							highlight = "keyword";
						}
						stream.next();
					} else {
						state.this = true;
						highlight = "keyword";
					}
				}
				if (state.parameter) {
					if (stream.match(/^[\,\)\t ]/, false)) {
						state.parameter = false;
					} else {
						highlight = "def";
					}
				} else if ((state.parameter_list) && (stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*/, false))) {
					state.parameter = true;
					highlight = "def";
				}
				if (state.function) {
					if (stream.match(/^(:|=)/, false)) {
						state.function = false;
					} else {
						highlight = "def";
					}
				} else if (stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*[\t ]*(:|=)[\t ]*(\([^\n\r]*\))?[\t ]*(->|=>)/, false)) {
					state.function = true;
					highlight = "def";
				}
				if (state.property) {
					if (stream.match(/^:/, false)) {
						state.property = false;
					} else {
						highlight = "def";
					}
				} else if (stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*[\t ]*:/, false)) {
					state.property = true;
					highlight = "def";
				}
				if (state.variable) {
					if (stream.match(/^[=\[]/, false)) {
						state.variable = false;
					} else {
						highlight = "def";
					}
				} else if (match = stream.match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*(\[.*\])*[\t ]*=([^=]|$)/, false)) {
					state.variable = true;
					highlight = "def";
					//if ((match = match[0].match(/^[a-zA-Z\$\_]+[a-zA-Z0-9\$\_]*/)[0]) && (defined.indexOf(match) === -1)) {
					//	defined.push(match);
					//}
				}
				if (state.method) {
					if (stream.match(/^[^a-zA-Z0-9\$_]/, false)) {
						state.method = false;
					} else {
						highlight = "def";
					}
				}
				if (stream.match(/^\.[a-zA-Z\$\_][a-zA-Z0-9\$_]*/, false)) {
					if (stream.column() !== 0) {
						stream.backUp(1);
						if (stream.match(/^\S*/, false)) {
							state.method = true;
						}
						stream.next();
					} else {
						state.method = true;
					}
				}
				if (state.number) {
					if (stream.match(/^[^0-9a-fA-FoxOX\+\-\.]/, false)) {
						state.number = false;
					} else {
						highlight = "number";
					}
				} else if (match = stream.match(/^((?:0(?:(?:[bB][01]+)|(?:[oO][0-7]+)|(?:[xX][0-9a-fA-F]+)))|(?:[\d]*\.?[\d]+(?:e[\+\-]\d+)?))([^a-zA-Z0-9\$_]|$)/, false)) {
					if (stream.column() !== 0) {
						stream.backUp(1);
						if (stream.match(/^[^a-zA-Z0-9\$_]/, false)) {
							state.number = true;
							highlight = "number";
						}
						stream.next();
					} else {
						state.number = true;
						highlight = "number";
					}
				}
				if (state.constant) {
					if (stream.match(/^[^a-z]/, false)) {
						state.constant = false;
					} else {
						highlight = "string";
					}
				} else if (match = stream.match(new RegExp("^" + constant_list.join("|")), false)) {
					if (stream.match(new RegExp("^(" + constant_list.join("|") + ")([^a-zA-Z0-9\$_]|$)"), false)) {
						if (stream.column() !== 0) {
							stream.backUp(1);
							if (stream.match(new RegExp("^[^a-zA-Z0-9\$_]"), false)) {
								state.constant = true;
								highlight = "string";
							}
							stream.next();
						} else {
							state.constant = true;
							highlight = "string";
						}
					}
				}
				if (state.string_1) {
					if (stream.match(/^\\\\"/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^\\"/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^"/, false)) {
						state.string_1 = false;
						highlight = "string";
					} else {
						highlight = "string";
					}
				} else if ((!state.string_2) && (stream.match(/^"/, false))) {
					state.string_1 = true;
					highlight = "string";
				}
				if (state.string_2) {
					if (stream.match(/^\\\\'/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^\\'/, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^'/, false)) {
						state.string_2 = false;
						highlight = "string";
					} else {
						highlight = "string";
					}
				} else if ((!state.string_1) && (stream.match(/^'/, false))) {
					state.string_2 = true;
					highlight = "string";
				}
				if (state.regexp) {
					if (stream.match(/^\\\//, false)) {
						highlight = "string";
						stream.next();
					} else if (stream.match(/^\//, false)) {
						state.regexp = false;
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
				} else if ((!state.string_1) && (!state.string_2) && (stream.match(/\/((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)\//, false))) {
					state.regexp = true;
					highlight = "string";
				}
				if (state.comment_block) {
					if (stream.match(/^###/, false)) {
						state.comment_block = false;
						highlight = "comment";
						stream.next();
						stream.next();
					} else {
						highlight = "comment";
					}
				} else if ((!state.string_1) && (!state.string_2) && (stream.match(/^###/, false))) {
					state.comment_block = true;
					highlight = "comment";
					stream.next();
					stream.next();
				}
				if (state.comment_line) {
					if (stream.sol()) {
						state.comment_line = false;
					} else {
						highlight = "comment";
					}
				} else if ((!state.comment_block) && (!state.string_1) && (!state.string_2) && (stream.match(/^#/, false))) {
					if (stream.column() > 1) {
						stream.backUp(2);
						if (!stream.match(/^###/, false)) {
							state.comment_line = true;
							highlight = "comment";
						}
						stream.next();
						stream.next();
					} else {
						state.comment_line = true;
						highlight = "comment";
					}
				}
				stream.next();
				return highlight;
			},
			startState: function() {
				return {
					comment_block: false,
					comment_line: false,
					constant: false,
					function: false,
					keyword: false,
					method: false,
					number: false,
					parameter: false,
					parameter_list: false,
					property: false,
					regexp: false,
					string_1: false,
					string_2: false,
					this: false,
					variable: false
				};
			}
		};
	});
	code_mirror.defineMIME("text/coffeescript", "coffeescriptimproved");
	language_manager.getLanguage("coffeescript").removeFileExtension("coffee");
	language_manager.defineLanguage("coffeescriptimproved", {
		fileExtensions: ["coffee"],
		mode: "coffeescriptimproved",
		name: "CoffeeScript"
	});
});
