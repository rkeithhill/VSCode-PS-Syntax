/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'PowerShell',
        name: 'ps1',
        defaultToken: '',
        ignoreCase: true,
        lineComment: '#',
        blockCommentStart: '<#',
        blockCommentEnd: '#>',
        // the default separators except `$-`
        wordDefinition: /(-?\d*\.\d\w*)|([^\`\~\!\@\#%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        brackets: [
            { token: 'delimiter.curly', open: '{', close: '}' },
            { token: 'delimiter.square', open: '[', close: ']' },
            { token: 'delimiter.parenthesis', open: '(', close: ')' }],
        enhancedBrackets: [
            { tokenType: 'string', openTrigger: '"', open: /@"$/, closeComplete: '"@' },
            { tokenType: 'string', openTrigger: '\'', open: /@'$/, closeComplete: '\'@' },
            { tokenType: 'string', openTrigger: '"', open: /"$/, closeComplete: '"' },
            { tokenType: 'string', openTrigger: '\'', open: /'$/, closeComplete: '\'' }
        ],
        autoClosingPairs: [['{', '}'], ['[', ']'], ['(', ')']],
        // default auto-closing of ' and " which is
        // override above by enhancedBrackets
        keywords: [
            'begin', 'break', 'catch', 'class', 'continue', 'data',
            'define', 'do', 'dynamicparam', 'else', 'elseif', 'end',
            'exit', 'filter', 'finally', 'for', 'foreach', 'from',
            'function', 'if', 'in', 'param', 'process', 'return',
            'switch', 'throw', 'trap', 'try', 'until', 'using',
            'var', 'while', 'workflow', 'parallel', 'sequence', 'inlinescript', 'configuration'
        ],
        helpKeywords: /SYNOPSIS|DESCRIPTION|PARAMETER|EXAMPLE|INPUTS|OUTPUTS|NOTES|LINK|COMPONENT|ROLE|FUNCTIONALITY|FORWARDHELPTARGETNAME|FORWARDHELPCATEGORY|REMOTEHELPRUNSPACE|EXTERNALHELP/,
        // we include these common regular expressions
        symbols: /[=><!~?&%|+\-*\/\^;\.,]+/,
        escapes: /`(?:[abfnrtv\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        // Ideal variableChars when JavaScript has Unicode support: /[_?\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}\p{Nd}]+/
        variableChars: /[?\w]+/,
        variableScope: /(global|local|private|script|using|workflow|@variableChars):/,
        bracedVariableChars: /([^`}]|`.)+/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // commands and keywords
                [/[a-zA-Z_][\w-]*/, { cases: { '@keywords': { token: 'keyword.$0' },
                            '@default': '' } }],
                // whitespace
                [/[ \t\r\n]+/, ''],
                // labels
                [/^:\w*/, 'metatag'],
                // variables
                [/\$[$?\^]|[$@](@variableScope)?@variableChars|\${(@variableScope)?@bracedVariableChars\}/, 'variable'],
                // Comments
                [/<#/, 'comment', '@comment'],
                [/#.*$/, 'comment'],
                // delimiters
                [/[{}()\[\]]/, '@brackets'],
                [/@symbols/, 'delimiter'],
                // numbers
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],
                [/\d+?/, 'number'],
                // delimiter: after number because of .\d floats
                [/[;,.]/, 'delimiter'],
                // strings:
                [/\@"/, 'string', '@herestring."'],
                [/\@'/, 'string', '@herestring.\''],
                [/"/, { cases: { '@eos': 'string', '@default': { token: 'string', next: '@string."' } } }],
                [/'/, { cases: { '@eos': 'string', '@default': { token: 'string', next: '@string.\'' } } }],
            ],
            string: [
                [/[^"'\$`]+/, { cases: { '@eos': { token: 'string', next: '@popall' }, '@default': 'string' } }],
                [/@escapes/, { cases: { '@eos': { token: 'string.escape', next: '@popall' }, '@default': 'string.escape' } }],
                [/`./, { cases: { '@eos': { token: 'string.escape.invalid', next: '@popall' }, '@default': 'string.escape.invalid' } }],
                [/\$[\w]+$/, { cases: { '$S2=="': { token: 'variable', next: '@popall' }, '@default': { token: 'string', next: '@popall' } } }],
                [/\$[$?\^]|[$@](@variableScope)?@variableChars|\${(@variableScope)?@bracedVariableChars\}/, { cases: { '$S2=="': 'variable', '@default': 'string' } }],
                [/["']/, { cases: { '$#==$S2': { token: 'string', next: '@pop' },
                            '@default': { cases: { '@eos': { token: 'string', next: '@popall' }, '@default': 'string' } } } }],
            ],
            herestring: [
                [/^\s*(["'])@/, { cases: { '$1==$S2': { token: 'string', next: '@pop' }, '@default': 'string' } }],
                [/[^\$`]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/`./, 'string.escape.invalid'],
                [/\$[$?\^]|[$@](@variableScope)?@variableChars|\${(@variableScope)?@bracedVariableChars\}/, { cases: { '$S2=="': 'variable', '@default': 'string' } }],
            ],
            comment: [
                [/[^#\.]+/, 'comment'],
                [/#>/, 'comment', '@pop'],
                [/(\.)(@helpKeywords)(?!\w)/, { token: 'comment.keyword.$2' }],
                [/[\.#]/, 'comment']
            ],
        },
    };
});
//# sourceMappingURL=powershellDef.js.map