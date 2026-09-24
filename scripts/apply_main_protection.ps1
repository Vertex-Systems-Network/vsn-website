param(
    [string]$Repository = "Vertex-Systems-Network/vsn-website",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw "GitHub CLI (gh) is required." }
gh auth status 1>$null 2>$null
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI is not authenticated." }

$payload = @{
    required_status_checks = @{
        strict = $true
        contexts = @("static-integrity")
    }
    enforce_admins = $true
    required_pull_request_reviews = @{
        dismissal_restrictions = @{ users = @(); teams = @(); apps = @() }
        dismiss_stale_reviews = $false
        require_code_owner_reviews = $false
        required_approving_review_count = 0
        require_last_push_approval = $false
        bypass_pull_request_allowances = @{ users = @(); teams = @(); apps = @() }
    }
    restrictions = $null
    required_linear_history = $true
    allow_force_pushes = $false
    allow_deletions = $false
    block_creations = $false
    required_conversation_resolution = $true
    lock_branch = $false
    allow_fork_syncing = $true
}

$json = $payload | ConvertTo-Json -Depth 10
$json | gh api --method PUT -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" "repos/$Repository/branches/$Branch/protection" --input -
if ($LASTEXITCODE -ne 0) { throw "Failed to apply branch protection." }
Write-Host "Applied target protection to $Repository/$Branch."
Write-Host "Run scripts/verify_main_protection.ps1 to verify the active policy."