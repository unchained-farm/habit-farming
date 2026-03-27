$root = 'C:\Users\shira\Documents\habit-farming'
$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port"
[Console]::Out.Flush()

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css'
    '.js'   = 'application/javascript'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.mp3'  = 'audio/mpeg'
    '.json' = 'application/json'
}

while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
        try {
            $local = $ctx.Request.Url.LocalPath.TrimStart('/')
            if ($local -eq '') { $local = 'index.html' }
            $path = Join-Path $root $local
            if (Test-Path $path -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($path)
                $ext = [System.IO.Path]::GetExtension($path)
                $ctx.Response.ContentType = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
                $ctx.Response.ContentLength64 = $bytes.Length
                $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $ctx.Response.StatusCode = 404
            }
        } catch { }
        finally { try { $ctx.Response.Close() } catch { } }
    } catch { }
}
