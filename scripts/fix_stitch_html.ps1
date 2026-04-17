$frontendDir = "C:\Users\VinhDat\Desktop\REQ\src\frontend"
$count = 0

# Get all HTML files (client + admin)
$files = Get-ChildItem -Path "$frontendDir\client","$frontendDir\admin" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # ===== FIX 1: Year 2024 -> 2026 =====
    $content = $content -replace [regex]::Escape("© 2024"), "© 2026"

    # ===== FIX 2: Branding - Replace fancy names with "Wonton POS" =====
    $content = $content -replace "The Culinary Editorial", "Wonton POS"
    $content = $content -replace "Culinary Editorial POS", "Wonton POS"
    $content = $content -replace "Culinary Editorial", "Wonton POS"
    $content = $content -replace "Wonton Culinary Editorial", "Wonton POS"
    $content = $content -replace "The Modern Heritage Critic", "Restaurant Management System"
    $content = $content -replace "Precision Crafted Cuisine Management", "Restaurant Management System"
    $content = $content -replace "High-end culinary editorial", "Online Ordering System"
    $content = $content -replace "All culinary rights reserved", "All rights reserved"

    # ===== FIX 3: Page titles =====
    $content = $content -replace "<title>Your Cart \| Wonton POS</title>", "<title>Cart | Wonton POS</title>"
    $content = $content -replace "<title>Notifications Center \| Wonton POS</title>", "<title>Notifications | Wonton POS</title>"

    # ===== FIX 4: Remove Tax 8% line in cart =====
    $content = $content -replace "Tax \(8%\)", "Tax (0%)"

    # ===== FIX 5: Fix "Inventory" -> correct nav items for client pages =====
    # Only fix in client files — admin "Inventory" is ok as menu concept
    if ($file.DirectoryName -like "*\client*") {
        # Replace nav link "Inventory" with "Order History" in client pages
        $content = $content -replace '>Inventory</a>', '>Order History</a>'
    }

    # ===== FIX 6: Fix phone number format to Vietnamese style =====
    $content = $content -replace '\+1 \(555\) WON-TONS', '+84 28 1234 5678'

    # ===== FIX 7: Fix address to Vietnamese style =====
    $content = $content -replace '123 Culinary Row, Gastronomy District', '123 Nguyen Hue, Dist. 1, Ho Chi Minh City'

    # ===== FIX 8: Simplify over-fancy copywriting =====
    $content = $content -replace "Craft a new artisanal entry for your digital catalog\.", "Add a new item to your menu."
    $content = $content -replace "Precision engineering for the modern culinary landscape\. Elevating the art of noodle service through technology\.", "Wonton POS - Modern restaurant management for your wonton noodle shop."
    $content = $content -replace "Experience culinary precision in every bowl\.", "Fast, fresh, and convenient."

    # ===== FIX 9: Fix duplicate Material Symbols link =====
    # Remove the second identical link tag
    $pattern = '(<link href="https://fonts\.googleapis\.com/css2\?family=Material\+Symbols\+Outlined[^"]*" rel="stylesheet"/>)\s*\n\s*\1'
    $content = $content -replace $pattern, '$1'

    # Check if anything changed
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $count++
        Write-Host "FIXED: $($file.Name)"
    } else {
        Write-Host "  OK: $($file.Name) (no changes needed)"
    }
}

Write-Host ""
Write-Host "=== DONE: $count files fixed ==="
