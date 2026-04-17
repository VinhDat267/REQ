$frontendDir = "C:\Users\VinhDat\Desktop\REQ\src\frontend"

Write-Host "=== CLIENT WEBAPP NAVIGATION AUDIT ==="
Write-Host ""

$clientFiles = Get-ChildItem -Path "$frontendDir\client" -Filter "*.html" | Sort-Object Name
foreach ($file in $clientFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Extract logo/brand name
    $brand = [regex]::Matches($content, '>([^<]*Wonton[^<]*)</(?:span|div|a)>') | ForEach-Object { $_.Groups[1].Value } | Select-Object -First 1
    
    # Extract nav link text (href="#" anchor texts)
    $navLinks = [regex]::Matches($content, 'href="#"[^>]*>([^<]+)</a>') | ForEach-Object { $_.Groups[1].Value.Trim() }
    
    # Extract nav height
    $navHeight = ""
    if ($content -match 'h-(\d+)') { $navHeight = "h-$($Matches[1])" }
    
    # Count buttons in nav
    $hasLogin = $content -match 'Login|Register|Sign'
    $hasNotif = $content -match 'notifications'
    $hasAvatar = $content -match 'avatar|profile'
    $hasCart = $content -match 'shopping_cart'
    
    Write-Host "--- $($file.Name) ---"
    Write-Host "  Brand: $brand"
    Write-Host "  Nav Links: $($navLinks -join ' | ')"
    Write-Host "  Has Login/Register: $hasLogin"
    Write-Host "  Has Notifications: $hasNotif"  
    Write-Host "  Has Avatar: $hasAvatar"
    Write-Host "  Has Cart: $hasCart"
    Write-Host ""
}

Write-Host ""
Write-Host "=== ADMIN WEBAPP SIDEBAR AUDIT ==="
Write-Host ""

$adminFiles = Get-ChildItem -Path "$frontendDir\admin" -Filter "*.html" | Sort-Object Name
foreach ($file in $adminFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Look for sidebar nav items
    $sidebarItems = [regex]::Matches($content, '(?:>|\s)(Dashboard|Orders|Kitchen|Tables|Menu|Staff|Reports|Notifications|Settings|Inventory)(?:<|\s)') | ForEach-Object { $_.Groups[1].Value }
    $sidebarItems = $sidebarItems | Select-Object -Unique
    
    # Check for sidebar existence
    $hasSidebar = $content -match 'aside|sidebar|side-nav'
    
    # Check which item is active/highlighted
    $activeItem = ""
    if ($content -match 'active|selected|current') { 
        $activeMatches = [regex]::Matches($content, '(?:active|selected|current)[^>]*>([^<]+)')
        if ($activeMatches.Count -gt 0) { $activeItem = $activeMatches[0].Groups[1].Value.Trim() }
    }
    
    Write-Host "--- $($file.Name) ---"
    Write-Host "  Has Sidebar: $hasSidebar"
    Write-Host "  Sidebar Items: $($sidebarItems -join ' | ')"
    Write-Host ""
}
