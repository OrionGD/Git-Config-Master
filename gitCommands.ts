export interface GitCommand {
  cmd: string;
  desc: string;
  note?: string;
  diagramBefore?: string;
  diagramAfter?: string;
}

export interface GitCommandCategory {
  name: string;
  icon: string;
  commands: GitCommand[];
}

export const GIT_COMMANDS_DATABASE: GitCommandCategory[] = [
  {
    name: "Getting Started",
    icon: "🚀",
    commands: [
      {
        cmd: "git init",
        desc: "Start a new local repository",
        note: "Initializes a blank Git repository in the current directory, creating the hidden '.git' folder."
      },
      {
        cmd: "git clone <url>",
        desc: "Clone an existing repository",
        note: "Creates a local copy of a remote repository from GitHub, GitLab, etc."
      }
    ]
  },
  {
    name: "Prepare to Commit",
    icon: "📥",
    commands: [
      {
        cmd: "git add <file>",
        desc: "Stage changes or add untracked file",
        note: "Prepares a specific file's changes for the next commit."
      },
      {
        cmd: "git add .",
        desc: "Stage all untracked files and unstaged changes",
        note: "Stages every file modification, deletion, and addition in the entire project directory tree."
      },
      {
        cmd: "git add -p",
        desc: "Choose which parts of a file to stage (hunk-by-hunk)",
        note: "Interactive mode: prompts you for each change block (hunk) in modified files so you can stage granularly."
      },
      {
        cmd: "git mv <old> <new>",
        desc: "Move or rename a file",
        note: "Renames/moves a file and automatically stages the change in Git's index."
      },
      {
        cmd: "git rm <file>",
        desc: "Delete a file",
        note: "Deletes the file from the filesystem and stages the deletion for commit."
      },
      {
        cmd: "git rm --cached <file>",
        desc: "Forget about a file without deleting it",
        note: "Removes the file from Git's tracking (staging index) but keeps the actual file safe on your disk."
      },
      {
        cmd: "git reset <file>",
        desc: "Unstage a single file",
        note: "Removes the file from the staging area but keeps its changes intact in your working directory."
      },
      {
        cmd: "git reset",
        desc: "Unstage everything",
        note: "Clears the staging area entirely. Working directory changes are completely safe."
      },
      {
        cmd: "git status",
        desc: "Check what files are modified or staged",
        note: "Shows the state of your working directory and the staging area: which files are staged, unstaged, or untracked."
      }
    ]
  },
  {
    name: "Make Commits",
    icon: "💾",
    commands: [
      {
        cmd: "git commit",
        desc: "Make a commit (and open text editor to write message)",
        note: "Launches your default configured terminal editor (e.g. Vim, VS Code) to write a detailed multiline commit message."
      },
      {
        cmd: "git commit -m 'message'",
        desc: "Make a commit with an inline message",
        note: "Creates a new snapshot with a quick, single-line explanation of changes."
      },
      {
        cmd: "git commit -am 'message'",
        desc: "Commit all unstaged changes",
        note: "Combines 'git add' for all currently tracked files and 'git commit' in a single command. Does not add new (untracked) files."
      }
    ]
  },
  {
    name: "Move Between Branches",
    icon: "🌿",
    commands: [
      {
        cmd: "git switch <name>",
        desc: "Switch branches",
        note: "The modern way to check out an existing branch."
      },
      {
        cmd: "git checkout <name>",
        desc: "Switch branches (legacy)",
        note: "Older standard command to switch your working directory to another branch."
      },
      {
        cmd: "git switch -c <name>",
        desc: "Create a branch and switch to it",
        note: "The modern standard command to create a new branch and immediately check it out."
      },
      {
        cmd: "git checkout -b <name>",
        desc: "Create a branch and switch to it (legacy)",
        note: "Traditional way to create a branch and switch working directory to it."
      },
      {
        cmd: "git branch",
        desc: "List branches",
        note: "Lists all local branches in the repository, highlighting the active branch with an asterisk (*)."
      },
      {
        cmd: "git branch --sort=-committerdate",
        desc: "List branches by most recently committed to",
        note: "Sorts your local branches in descending order based on their last commit date, showing active branches first."
      },
      {
        cmd: "git branch -d <name>",
        desc: "Delete a branch",
        note: "Safely deletes a branch only if its changes have already been merged into the upstream branch."
      },
      {
        cmd: "git branch -D <name>",
        desc: "Force delete a branch",
        note: "Permanently deletes a branch, even if it contains unmerged work. Use with caution!"
      }
    ]
  },
  {
    name: "Diff Staged/Unstaged Changes",
    icon: "🔍",
    commands: [
      {
        cmd: "git diff HEAD",
        desc: "Diff all staged and unstaged changes",
        note: "Shows the differences between your active working tree (both staged and unstaged) and your most recent commit (HEAD)."
      },
      {
        cmd: "git diff --staged",
        desc: "Diff just staged changes",
        note: "Shows differences between files in the staging area and your last commit. These are the changes that will go into your next commit."
      },
      {
        cmd: "git diff",
        desc: "Diff just unstaged changes",
        note: "Shows differences between your active working directory and your staging area. Only shows changes that are NOT yet staged."
      }
    ]
  },
  {
    name: "Diff Commits",
    icon: "📊",
    commands: [
      {
        cmd: "git show <commit>",
        desc: "Show diff between a commit and its parent",
        note: "Displays the commit metadata (author, date, message) and the complete code changes introduced by that specific commit."
      },
      {
        cmd: "git diff <commit> <commit>",
        desc: "Diff two commits",
        note: "Compares the state of the codebase between two specific commit hashes, branch names, or tags."
      },
      {
        cmd: "git diff <commit> <file>",
        desc: "Diff one file since a commit",
        note: "Compares the working version of a single file against its state in a specific historical commit."
      },
      {
        cmd: "git diff <commit> --stat",
        desc: "Show a summary of a diff",
        note: "Shows a high-level summary of modifications: list of files changed, lines added (+), and lines deleted (-) in each."
      },
      {
        cmd: "git show <commit> --stat",
        desc: "Show metadata and summary of a commit's diff",
        note: "Combines commit author details and description with file alteration statistics (files changed, insertions, deletions)."
      }
    ]
  },
  {
    name: "Ways to refer to a commit",
    icon: "🎯",
    commands: [
      {
        cmd: "main",
        desc: "Refer to a branch name",
        note: "Points directly to the newest commit in that branch (e.g. 'main', 'development')."
      },
      {
        cmd: "v0.1",
        desc: "Refer to a tag name",
        note: "Refers to a tag marking an immutable release version or specific milestone."
      },
      {
        cmd: "3e887ab",
        desc: "Refer to a commit ID",
        note: "A unique cryptographic SHA-1 hash identifier. Usually, the first 7 characters are sufficient."
      },
      {
        cmd: "origin/main",
        desc: "Refer to a remote branch",
        note: "Points to the last fetched state of the 'main' branch in the remote repository named 'origin'."
      },
      {
        cmd: "HEAD",
        desc: "Refer to the current commit",
        note: "A special pointer that always represents the commit currently checked out by your working tree."
      },
      {
        cmd: "HEAD^^^  (or  HEAD~3)",
        desc: "Refer to 3 commits ago",
        note: "Relative commit pointers. HEAD~N traverses straight up the parent hierarchy N times."
      }
    ]
  },
  {
    name: "Discard Your Changes",
    icon: "🗑️",
    commands: [
      {
        cmd: "git restore <file>",
        desc: "Delete unstaged changes to one file",
        note: "Modern standard command: discards all changes in the working directory that are not staged."
      },
      {
        cmd: "git checkout <file>",
        desc: "Delete unstaged changes to one file (legacy)",
        note: "Older standard command: restores the file from index/staging to your working directory, erasing unstaged changes."
      },
      {
        cmd: "git restore --staged --worktree <file>",
        desc: "Delete all staged and unstaged changes to one file",
        note: "Modern standard: un-stages the file's changes and reverts your local working copy back to the HEAD commit version."
      },
      {
        cmd: "git checkout HEAD <file>",
        desc: "Delete all staged and unstaged changes to one file (legacy)",
        note: "Older standard: restores the file directly from the HEAD commit, overwriting staging and working copy changes."
      },
      {
        cmd: "git reset --hard",
        desc: "Delete all staged and unstaged changes in tracked files",
        note: "Destructive command! Reverts all tracked files in the workspace to the last commit, throwing away all local work."
      },
      {
        cmd: "git clean",
        desc: "Delete untracked files",
        note: "Removes files from your working directory that are not tracked by Git. Run with '-f' to force or '-n' for a dry-run."
      },
      {
        cmd: "git stash",
        desc: "'Stash' all staged and unstaged changes",
        note: "Saves current modifications to a temporary stash pile and restores a clean working tree so you can change focus easily."
      }
    ]
  },
  {
    name: "Edit History",
    icon: "⏳",
    commands: [
      {
        cmd: "git reset HEAD^",
        desc: "Undo the most recent commit (keep your working directory changes)",
        note: "Moves your branch pointer back by one commit, keeping all modified files unstaged in your working directory."
      },
      {
        cmd: "git rebase -i HEAD~6",
        desc: "Squash the last 5 commits into one",
        note: "Launches interactive editor. Change 'pick' to 'fixup' (or 'f') for the commits you want to combine into the previous commit."
      },
      {
        cmd: "git reflog <branchname>",
        desc: "Undo a failed rebase (part 1: find previous commit in history)",
        note: "Lists a history of all actions and branch pointer changes. Locate the hash of your commit before the rebase started."
      },
      {
        cmd: "git reset --hard <commit>",
        desc: "Undo a failed rebase (part 2: reset branch to found commit)",
        note: "Resets your working tree and active branch back to the clean commit state you located in the reflog."
      },
      {
        cmd: "git commit --amend",
        desc: "Change a commit message (or add a file you forgot)",
        note: "Amends the latest commit. If files are staged, they are added to the commit. Opens an editor to modify the description."
      }
    ]
  },
  {
    name: "Code Archaeology",
    icon: "🏛️",
    commands: [
      {
        cmd: "git log main",
        desc: "Look at a branch's history",
        note: "Displays the list of commits made to the 'main' branch, sorted in reverse chronological order."
      },
      {
        cmd: "git log --graph main",
        desc: "View history with text branch lines",
        note: "Draws an ASCII graphical representation of the branch paths, showing merges and forks."
      },
      {
        cmd: "git log --oneline",
        desc: "View ultra-condensed history",
        note: "Displays commits on single lines: shows only the abbreviated commit hash and the subject line."
      },
      {
        cmd: "git log <file>",
        desc: "Show every commit that modified a file",
        note: "Filters history to only show commits that introduced modifications to the specified file path."
      },
      {
        cmd: "git log --follow <file>",
        desc: "Show every commit that modified a file (including pre-renames)",
        note: "Tracks a file backwards in history, even showing commits that modified it under a different name prior to a rename."
      },
      {
        cmd: "git log -G banana",
        desc: "Find every commit that added or removed specific text",
        note: "Searches the commit diffs for lines that added or removed the word 'banana' (often called pickaxe search)."
      },
      {
        cmd: "git blame <file>",
        desc: "Show who last changed each line of a file",
        note: "Annotates each line of a file with the author, date, and commit hash of the last revision that modified that line."
      }
    ]
  },
  {
    name: "Combine Diverged Branches",
    icon: "🔀",
    commands: [
      {
        cmd: "git switch banana\ngit rebase main",
        desc: "Combine with rebase",
        note: "Replays commits from 'banana' branch on top of 'main' branch, creating a completely linear history.",
        diagramBefore: "      D---E (banana)\n     /\nA---B---C (main)",
        diagramAfter: "A---B---C (main)\n         \\\n          D'---E' (banana rebased)"
      },
      {
        cmd: "git switch main\ngit merge banana",
        desc: "Combine with standard merge",
        note: "Creates a new merge commit combining history from both branches, preserving history exactly as it happened.",
        diagramBefore: "      D---E (banana)\n     /\nA---B---C (main)",
        diagramAfter: "      D-------E (banana)\n     /         \\\nA---B---C-------F (main merge commit)"
      },
      {
        cmd: "git switch main\ngit merge --squash banana\ngit commit",
        desc: "Combine with squash merge",
        note: "Condenses all commits from 'banana' into a single set of changes and places them as one standard commit on 'main'.",
        diagramBefore: "      D---E (banana)\n     /\nA---B---C (main)",
        diagramAfter: "A---B---C---F (main, F contains all banana changes in one commit)"
      },
      {
        cmd: "git switch main\ngit merge banana",
        desc: "Bring branch up to date (Fast-Forward merge)",
        note: "If no commits occurred on 'main' since the divergence, Git simply fast-forwards the 'main' pointer to match 'banana'.",
        diagramBefore: "A---B (main)\n     \\\n      C---D (banana)",
        diagramAfter: "A---B---C---D (main & banana)"
      },
      {
        cmd: "git cherry-pick <commit>",
        desc: "Copy one specific commit onto the current branch",
        note: "Applies the code changes from one existing commit elsewhere in history onto your active branch.",
        diagramBefore: "Branch-A: A---B---C (want C)\nBranch-B: D---E (active HEAD)",
        diagramAfter: "Branch-A: A---B---C\nBranch-B: D---E---C' (C copied as C')"
      }
    ]
  },
  {
    name: "Restore an Old File",
    icon: "⏪",
    commands: [
      {
        cmd: "git checkout <commit> <file>",
        desc: "Get the version of a file from another commit",
        note: "Older standard: updates your working directory and staging index to match the file's content in a specific commit."
      },
      {
        cmd: "git restore <file> --source <commit>",
        desc: "Get the version of a file from another commit (modern)",
        note: "Modern standard: extracts the file content from a historical commit and places it in your current working copy."
      }
    ]
  },
  {
    name: "Add a Remote",
    icon: "🌐",
    commands: [
      {
        cmd: "git remote add <name> <url>",
        desc: "Link your local repository to a remote database",
        note: "Registers a remote repository URL under an alias name (traditionally 'origin' for your main remote server)."
      }
    ]
  },
  {
    name: "Push Your Changes",
    icon: "📤",
    commands: [
      {
        cmd: "git push origin main",
        desc: "Push the main branch to the remote origin",
        note: "Uploads your local commits from the 'main' branch to the 'origin' remote repository."
      },
      {
        cmd: "git push",
        desc: "Push the current branch to its remote tracking branch",
        note: "Sends local commits on the active branch to its configured upstream remote counterpart."
      },
      {
        cmd: "git push -u origin <name>",
        desc: "Push a branch that has never been pushed before",
        note: "Pushes the local branch to 'origin' and configures Git upstream tracking ('-u') so subsequent runs require only 'git push'."
      },
      {
        cmd: "git push --force-with-lease",
        desc: "Force push safely",
        note: "Overrides history on the remote but safely aborts if someone else has pushed new commits since your last pull."
      },
      {
        cmd: "git push --tags",
        desc: "Push tags",
        note: "Uploads all your local tags to the remote repository, creating releases on platforms like GitHub."
      }
    ]
  },
  {
    name: "Pull Changes",
    icon: "📥",
    commands: [
      {
        cmd: "git fetch origin main",
        desc: "Fetch changes (but don't change local branches)",
        note: "Downloads new historical data and refs from the remote branch, but does not merge them into your working copy."
      },
      {
        cmd: "git pull --rebase",
        desc: "Fetch changes and then rebase your branch",
        note: "Combines fetch and rebase: pulls changes from upstream and reapplies your local commits linearly on top of them."
      },
      {
        cmd: "git pull origin main",
        desc: "Fetch changes and merge them directly",
        note: "Combines fetch and merge: pulls down remote 'main' commits and merges them directly into your current branch."
      },
      {
        cmd: "git pull",
        desc: "Fetch changes and merge from default upstream branch",
        note: "Shorthand to pull updates from the upstream branch set for your active branch."
      }
    ]
  },
  {
    name: "Configure Git",
    icon: "⚙️",
    commands: [
      {
        cmd: "git config user.name 'Your Name'",
        desc: "Set a config option",
        note: "Sets a configuration key to a specific value inside the local repository's '.git/config' file."
      },
      {
        cmd: "git config --global user.name 'Your Name'",
        desc: "Set option globally",
        note: "Applies the setting to your user's global '~/.gitconfig' file across all repositories."
      },
      {
        cmd: "git config alias.st status",
        desc: "Add an alias",
        note: "Defines a shortcut 'git st' that acts exactly like 'git status' when typed."
      },
      {
        cmd: "man git-config",
        desc: "See all possible config options",
        note: "Displays the comprehensive unix manuals for Git configuration settings. You can also run 'git config --help'."
      }
    ]
  },
  {
    name: "Important Files",
    icon: "📁",
    commands: [
      {
        cmd: ".git/config",
        desc: "Local git config file location",
        note: "Contains all repository-specific config items. Takes highest priority."
      },
      {
        cmd: "~/.gitconfig",
        desc: "Global git config file location",
        note: "Located in your home folder. Contains settings applied to all your repositories."
      },
      {
        cmd: ".gitignore",
        desc: "List of files to ignore",
        note: "A plain text file placed in repository root containing glob patterns of files/folders Git should ignore entirely."
      }
    ]
  }
];
