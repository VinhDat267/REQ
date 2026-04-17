$frontendDir = "C:\Users\VinhDat\Desktop\REQ\src\frontend"
$count = 0

# Script tag to inject (with correct relative path)
$clientScriptTag = '<script src="../shared/nav-components.js" defer></script>'
$adminScriptTag = '<script src="../shared/nav-components.js" defer></script>'

$files = Get-ChildItem -Path "$frontendDir\client","$frontendDir\admin" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already injected
    if ($content -match 'nav-components\.js') {
        Write-Host "  SKIP: $($file.Name) (already has nav-components.js)"
        continue
    }
    
    # Determine script tag based on directory
    $scriptTag = if ($file.DirectoryName -like "*\client*") { $clientScriptTag } else { $adminScriptTag }
    
    # Inject before </body>
    if ($content -match '</body>') {
        $content = $content -replace '</body>', "$scriptTag`n</body>"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $count++
        Write-Host "INJECTED: $($file.Name)"
    } else {
        Write-Host "  WARN: $($file.Name) - no </body> tag found"
    }
}

Write-Host ""
Write-Host "=== DONE: $count files injected with nav-components.js ==="
