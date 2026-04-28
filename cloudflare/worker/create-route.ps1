# create-route.ps1
# Crea una ruta para el Worker y comprueba headers en https://tescha.pages.dev
# Uso: Ejecuta en PowerShell local, pega tu API token cuando se solicite.

param()

$accountId = '05293bb4e73b2e98248f37d339b52633'
$scriptName = 'tescha-security-headers-worker'
$pattern = 'tescha.pages.dev/*'

Write-Host "Este script intentará crear la ruta $pattern -> $scriptName en la cuenta $accountId"

# Leer token en modo seguro y convertir a string
$secure = Read-Host -Prompt 'Pega tu CF API token (se ocultará)' -AsSecureString
$ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
$token = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($ptr)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)

$baseUrl = "https://api.cloudflare.com/client/v4/accounts/$accountId/workers/routes"
$headers = @{
    Authorization = "Bearer $token"
    'Content-Type' = 'application/json'
}

# Mostrar rutas existentes (opcional)
try {
    Write-Host "Obteniendo rutas existentes..."
    $existing = Invoke-RestMethod -Method Get -Uri $baseUrl -Headers $headers -ErrorAction Stop
    if ($existing.success) {
        Write-Host "Rutas actuales:"
        $existing.result | ForEach-Object { Write-Host " - $_.pattern  -> $_.script" }
    }
} catch {
    Write-Warning "No se pudieron listar rutas (puede que el token no tenga permisos). Continuo..." 
}

$body = @{ pattern = $pattern; script = $scriptName } | ConvertTo-Json -Compress

try {
    Write-Host "Creando la ruta..."
    $resp = Invoke-RestMethod -Method Post -Uri $baseUrl -Headers $headers -Body $body -ErrorAction Stop
    if ($resp.success) {
        Write-Host "Ruta creada correctamente:" -ForegroundColor Green
        $resp.result | Format-List
    } else {
        Write-Warning "API devolvió success=false"
        $resp | Format-List
    }
} catch {
    Write-Error "Error creando ruta: $($_.Exception.Message)"
    if ($_.Exception.Response) { $_.Exception.Response.GetResponseStream() | % { $_ } }
    exit 1
}

Start-Sleep -Seconds 5

Write-Host "Verificando headers en https://tescha.pages.dev ..."
try {
    $head = Invoke-WebRequest -Uri 'https://tescha.pages.dev' -Method Head -UseBasicParsing -ErrorAction Stop
    Write-Host "Respuesta HEAD:" -ForegroundColor Cyan
    $head.Headers.GetEnumerator() | ForEach-Object { Write-Host "$_" }
} catch {
    Write-Error "Error al consultar https://tescha.pages.dev : $($_.Exception.Message)"
}

Write-Host "Listo. Si faltan headers o la API devolvió 403, revisa permisos del token (Workers Scripts + Workers Edit en Account Resources)." -ForegroundColor Yellow
