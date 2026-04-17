$frontendDir = "C:\Users\VinhDat\Desktop\REQ\src\frontend"
$count = 0
$dong = [char]0x20AB  # VND dong sign

$adminFiles = Get-ChildItem -Path "$frontendDir\admin" -Filter "*.html" -Recurse

foreach ($file in $adminFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # ===== Fix USD prices to VND =====
    $content = $content -replace '>\$84\.50<', ('>' + $dong + '165,000<')
    $content = $content -replace '>\$91\.26<', ('>' + $dong + '195,000<')

    # ===== Fix wrong dates (2023 -> 2026) =====
    $content = $content -replace 'Oct 24, 2023 - Oct 25, 2023', 'Apr 7, 2026 - Apr 8, 2026'
    $content = $content -replace '24 Oct 2023, 14:45', '7 Apr 2026, 14:45'

    # ===== Fix US phone format =====
    $content = $content -replace '\+1 \(555\) 000-0000', '+84 912 345 678'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $count++
        Write-Host "FIXED: $($file.Name)"
    } else {
        Write-Host "  OK: $($file.Name)"
    }
}

Write-Host ""
Write-Host "=== DONE: $count admin files fixed ==="
