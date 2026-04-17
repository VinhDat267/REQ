$frontendDir = "C:\Users\VinhDat\Desktop\REQ\src\frontend"
$count = 0
$dong = [char]0x20AB  # ₫ character

$clientFiles = Get-ChildItem -Path "$frontendDir\client" -Filter "*.html" -Recurse

foreach ($file in $clientFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # ===== L6: Fix USD prices to VND =====
    $content = $content -replace '>\$42\.50<', ('>' + $dong + '85,000<')
    $content = $content -replace '>\$14\.50<', ('>' + $dong + '55,000<')
    $content = $content -replace '>\$18\.00<', ('>' + $dong + '65,000<')
    $content = $content -replace '>\$10\.00<', ('>' + $dong + '45,000<')
    $content = $content -replace '>\$12\.00<', ('>' + $dong + '48,000<')
    $content = $content -replace '>\$68\.25<', ('>' + $dong + '125,000<')
    $content = $content -replace '>\$19\.75<', ('>' + $dong + '95,000<')
    $content = $content -replace '>\$5\.25<', ('>' + $dong + '25,000<')

    # ===== L3: Fix Tax 0% value from 16,000 to 0 =====
    $content = $content -replace ($dong + '16,000'), ($dong + '0')

    # ===== L4: Fix wrong pickup date =====
    $content = $content -replace 'Today, Oct 24', 'Today, Apr 7'

    # ===== L5: Fix phone placeholder =====
    $content = $content -replace '\+84 000 000 000', '+84 912 345 678'

    # ===== L7: Fix Credit Card to MoMo =====
    $content = $content -replace 'Paid via Credit Card', 'Paid via MoMo'

    # ===== Auth page: Fix email placeholder =====
    $content = $content -replace 'chef@wontonpos\.com', 'customer@email.com'

    # ===== Auth page: Fix copy =====
    $content = $content -replace 'access the terminal', 'access your account'

    # ===== Fix Phone format in Order Tracking =====
    $content = $content -replace '\(555\) 000-0000', '0912 345 678'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $count++
        Write-Host "FIXED: $($file.Name)"
    } else {
        Write-Host "  OK: $($file.Name)"
    }
}

Write-Host ""
Write-Host "=== DONE: $count files fixed ==="
