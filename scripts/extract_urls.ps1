$basePath = "C:\Users\VinhDat\.gemini\antigravity\brain\2a1415b1-1043-4f4a-b64e-d1888c5211c0\.system_generated\steps"

# Client screens
$clientJson = Get-Content "$basePath\285\output.txt" -Raw | ConvertFrom-Json
Write-Host "=== CLIENT WEBAPP (Pro) ==="
foreach ($s in $clientJson.screens) {
    $id = ($s.name -split '/')[-1]
    $title = $s.title
    $url = $s.htmlCode.downloadUrl
    Write-Host "TITLE: $title"
    Write-Host "ID: $id"
    Write-Host "URL: $url"
    Write-Host "---"
}

# Admin screens
$adminJson = Get-Content "$basePath\286\output.txt" -Raw | ConvertFrom-Json
Write-Host ""
Write-Host "=== ADMIN WEBAPP (Pro) ==="
foreach ($s in $adminJson.screens) {
    $id = ($s.name -split '/')[-1]
    $title = $s.title
    $url = $s.htmlCode.downloadUrl
    Write-Host "TITLE: $title"
    Write-Host "ID: $id"  
    Write-Host "URL: $url"
    Write-Host "---"
}
