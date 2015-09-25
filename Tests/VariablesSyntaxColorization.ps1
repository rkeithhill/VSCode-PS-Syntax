# PowerShell V3 language specification - http://www.microsoft.com/en-us/download/confirmation.aspx?id=36389

<#
variable:
    $$
    $?
    $^
    $   variable-scopeopt  variable-characters
    @   variable-scopeopt   variable-characters
    braced-variable
braced-variable:
    ${   variable-scopeopt   braced-variable-characters   }
variable-scope:
    global:
    local:
    private:
    script:
    using:
    workflow:
    variable-namespace
variable-namespace:
    variable-characters   :
variable-characters:
    variable-character
    variable-characters   variable-character
variable-character:
    A Unicode character of classes Lu, Ll, Lt, Lm, Lo, or Nd
    _   (The underscore character U+005F)
    ?
braced-variable-characters:
braced-variable-character
braced-variable-characters   braced-variable-character
braced-variable-character:
Any Unicode character except
		}   (The closing curly brace character U+007D)
		`   (The backtick character U+0060)
escaped-character
`   (The backtick character U+0060) followed by any Unicode character
#>

#######################################################################
# Valid PowerShell variables.

# All of the instances of $foo should be colorized (blue in the dark color scheme)
# The tokens 'bar' and 'baz' should not be colorized (not part of the variable name).
$$
$?
$^
$_
$foo
$foo_foo
$fo?o
$global:foo
$script:foo
$local:foo
$private:foo
$using:foo
$workflow:foo
$glarch:bar
$glarch_xyzzy:bar

@_
@foo
@f23_o?o
@global:foo
@script:foo
@local:foo
@private:foo
@using:foo
@workflow:foo
@glarch:bar
@glarch_xyzzy:bar

${$}
${?}
${^}
${_}
${foo}
${foo_foo}
${fo?o}
${fo`o}
${global:foo}
${global:fo`o}
${script:foo}
${local:foo}
${private:foo}
${using:foo}
${workflow:foo}
${glarch_xyzzy:bar}

"$foo"
"${foo}"
" ... $foo in middle of dq string"
"$global:foo baz"
"$script:foo.baz"
"$local:foo/baz"
"$private:foo-baz"
"$using:foo_bar"
"$workflow:foo_bar"
"${global:foo`n} baz"
"${script:foo}.baz"
"${local:foo}/baz"
"${private:foo}-baz"
"${using:foo_bar}"
"${workflow:foo_bar}"
"$($workflow:foo)"
"$(${workflow:foo})"
"$(${workflow:foo`1})"

@"
    $foo
"@
@"
    ${foo}
"@
@"
    ... $foo in middle of dq string
"@
@"
    $global:foo baz
"@
@"
    $script:foo.baz
"@
@"
    $local:foo/baz
"@
@"
    $private:foo-baz
"@
@"
    $using:foo_bar
"@
@"
    $workflow:foo_bar
"@
@"
    ${global:foo`n} baz
"@
@"
    ${script:foo}.baz
"@
@"
    ${local:foo}/baz
"@
@"
    ${private:foo}-baz
"@
@"
    ${using:foo_bar}
"@
@"
    ${workflow:foo_bar}
"@
@"
    $($workflow:foo)
"@
@"
    $(${workflow:foo})
"@
@"
    $(${workflow:foo`1})
"@

#######################################################################
# Invalid (or not) PowerShell variables

${global:foo`}

# The second variable should be flagged as an invalid token but I don't have
# negative lookahead in JavaScript regexes.
$fo$fo

'$bar'
'${bar}'
'${global:bar}'
' ... $bar in middle of sq string '

@'
    $bar
'@
@'
    ${bar}
'@
@'
    ${global:bar}
'@'
@'
     ... $bar in middle of sq string
'@