param(
    [string]$Repository = "Vertex-Systems-Network/vsn-website",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw "GitHub CLI (gh) is required." }
gh auth status 1>$null 2>$null
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI is not authenticated." }

$raw = gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" "repos/$Repository/branches/$Branch/protection"
if ($LASTEXITCODE -ne 0) { throw "Failed to read branch protection." }

$p = $raw | ConvertFrom-Json
$checks = [ordered]@{
    pull_request_required = ($null -ne $p.required_pull_request_reviews)
    required_approvals_zero = ($p.required_pull_request_reviews.required_approving_review_count -eq 0)
    admins_enforced = ($p.enforce_admins.enabled -eq $true)
    linear_history = ($p.required_linear_history.enabled -eq $true)
    force_pushes_blocked = ($p.allow_force_pushes.enabled -eq $false)
    deletion_blocked = ($p.allow_deletions.enabled -eq $false)
    conversations_resolved = ($p.required_conversation_resolution.enabled -eq $true)
}

$checks.GetEnumerator() | ForEach-Object { "{0}: {1}" -f $_.Key, $_.Value }
$failed = @($checks.GetEnumerator() | Where-Object { -not $_.Value })
if ($failed.Count -gt 0) {
    Write-Error ("Protection verification failed: " + (($failed | ForEach-Object { $_.Key }) -join ", "))
    exit 1
}
Write-Host "Main branch protection matches the target AI-led governance policy."