$basePath = "C:\Users\VinhDat\.gemini\antigravity\brain\2a1415b1-1043-4f4a-b64e-d1888c5211c0\.system_generated\steps"
$outBase = "C:\Users\VinhDat\Desktop\REQ\src\frontend"

# Create output directories
New-Item -ItemType Directory -Force -Path "$outBase\client" | Out-Null
New-Item -ItemType Directory -Force -Path "$outBase\admin" | Out-Null

function Sanitize-Filename($title) {
    $clean = $title -replace '[^a-zA-Z0-9\s\-]', ''
    $clean = $clean.Trim() -replace '\s+', '-'
    return $clean.ToLower()
}

# Download Client screens
$clientJson = Get-Content "$basePath\285\output.txt" -Raw | ConvertFrom-Json
Write-Host "=== Downloading CLIENT WEBAPP screens ==="
$i = 1
foreach ($s in $clientJson.screens) {
    $title = $s.title
    $url = $s.htmlCode.downloadUrl
    $filename = "{0:D2}-$(Sanitize-Filename $title).html" -f $i
    $outPath = "$outBase\client\$filename"
    Write-Host "[$i/10] $title -> $filename"
    try {
        Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
        Write-Host "  OK"
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)"
    }
    $i++
}

# Download Admin screens
$adminJson = Get-Content "$basePath\286\output.txt" -Raw | ConvertFrom-Json
Write-Host ""
Write-Host "=== Downloading ADMIN WEBAPP screens ==="
$i = 1
foreach ($s in $adminJson.screens) {
    $title = $s.title
    $url = $s.htmlCode.downloadUrl
    $filename = "{0:D2}-$(Sanitize-Filename $title).html" -f $i
    $outPath = "$outBase\admin\$filename"
    Write-Host "[$i/14] $title -> $filename"
    try {
        Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
        Write-Host "  OK"
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)"
    }
    $i++
}

Write-Host ""
Write-Host "=== DONE ==="
Write-Host "Client files: $(Get-ChildItem "$outBase\client\*.html" | Measure-Object | Select-Object -ExpandProperty Count)"
Write-Host "Admin files: $(Get-ChildItem "$outBase\admin\*.html" | Measure-Object | Select-Object -ExpandProperty Count)"
