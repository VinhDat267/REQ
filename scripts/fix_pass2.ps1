$frontendDir = "C:\Users\VinhDat\Desktop\REQ\src\frontend"
$count = 0

$files = Get-ChildItem -Path "$frontendDir\client","$frontendDir\admin" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # Fix year - handle both UTF8 copyright and escaped
    $content = $content -replace '2024 Wonton', '2026 Wonton'
    $content = $content -replace '2024 Culinary', '2026 Wonton POS.'

    # Fix double-name bugs from previous replacement
    $content = $content -replace 'Wonton Wonton POS', 'Wonton POS'
    $content = $content -replace 'Wonton POS POS', 'Wonton POS'
    $content = $content -replace 'High-end Wonton POS\.', 'Online Ordering System.'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $count++
        Write-Host "FIXED: $($file.Name)"
    } else {
        Write-Host "  OK: $($file.Name)"
    }
}

Write-Host ""
Write-Host "=== Pass 2 DONE: $count files fixed ==="
