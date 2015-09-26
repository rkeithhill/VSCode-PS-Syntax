# VSCode
## PowerShell contributions to the Visual Studio Code project

For now this is a replacement for the powershellDef.js file that defines the syntax colorization
for PowerShell tokens like variables, strings, etc.  There is also a file -
powershell.json - that contains many useful PowerShell snippets.

To get the improved variable syntax colorization, drop the vs.language.powershell
into your VS Code install dir:
 ```
 C:\Program Files (x86)\Microsoft VS Code\resources\app\plugins\vs.language.powershell\out
 ```
 It wouldn't hurt to make a backup of the original powershellDef.js file.  Of course, any VS Code
 update is likely to replace this customized version of the file.  So you might need
 to put this version of the file back after an update. That said, I am working with
 the VS Code team to get them to take these changes and put them into VS Code.

 The snippets file - powershell.json - can be installed by copying it to the following
 folder:

 ```
 $env:UserProfile\AppData\Roaming\Code\User\snippets
 ```

Let me know if you find any issues.