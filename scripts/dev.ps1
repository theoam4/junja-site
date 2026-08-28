param(
  [int]$Port = 8000
)

$python = Get-Command py -ErrorAction SilentlyContinue
if ($null -eq $python) {
  $python = Get-Command python -ErrorAction SilentlyContinue
}

if ($null -eq $python) {
  throw "Python não foi encontrado. Instale o Python 3 e tente novamente."
}

Write-Host "Prévia local do Junja: http://127.0.0.1:$Port"
Write-Host "Edite os arquivos e recarregue o navegador para ver as mudanças."
Write-Host "Encerre o servidor com Ctrl+C."

if ($python.Name -eq 'py.exe') {
  & py -3 -m http.server $Port --bind 127.0.0.1
} else {
  & python -m http.server $Port --bind 127.0.0.1
}
