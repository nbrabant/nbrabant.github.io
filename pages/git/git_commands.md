====Git Cheat Sheet====

====Install Git====
**For Windows**
https://windows.github.com

**For Mac**
https://mac.github.com

**For all plateforms**
http://git-scm.com


====Configure tolling====
Configure user informations for all local repositories

<code bash>
git config --global user.name "[name]"
git config --global user.email "[email]"
</code>

Enable helpfull colorization of command line output
<code bash>
git config --global color.ui auto
</code>

====Create repository====
Create a new local repository
<code bash>
git init [project-name]
</code>

Download a project and his entire version history
<code bash>
git clone [url]
</code>

====MAke changes====
List all new of modified files
<code bash>
git status
</code>

Show file differences not yet staged
<code bash>
git diff
</code>

Shapshots the file in the preparation of versionning
<code bash>
git add [file]
</code>

Shows file differences between staging and the last file version
<code bash>
git diff --staged
</code>

Unstages the file, but perserve his content
<code bash>
git reset [file]
</code>

Records file snapshots permanently in version history (or use --patch to show the diff)
<code bash>
git commit -m "[descriptive message]"
</code>

====Group changes====
Show the project branches
<code bash>
git branch
</code>

Create a new branch
<code bash>
git branch [branch-name]
</code>

Switch to the specified branch
<code bash>
git checkout [branch-name]
</code>

Merge the specified branch to the current branch
<code bash>
git merge [branch-name]
</code>

Delete the specified branch
<code bash>
git branch -d [branch-name]
</code>

====Refactor filenames====
Delete the file from the working directory and stage the deletion
<code bash>
git rm [file-name]
</code>

Remove the file from version control but preserves the file locally
<code bash>
git rm --cached [file-name]
</code>

Changes the file name and prepare it for commit
<code bash>
git mv [file-original] [file-renamed]
</code>

====Suppress tracking====
In a text file named ".gitignore"
<code>
*.log
build/
temp-*
</code>

List of all ignored files in the project
<code bash>
git ls-files --other --ignored --exclude-standard
</code>

====Save fragments====
Temporarily stores all modified tracked files
<code bash>
git stash
</code>

Restores the most recently stashed files
<code bash>
git stash pop
</code>

Lists all stashed files
<code bash>
git stash list
</code>

Discard the most recently stashed changeset
<code bash>
git stash drop
</code>

====Review history====
Lists version history for the current branch
<code bash>
git log
</code>

Lists version history of a file, including rename
<code bash>
git log --follow [file]
</code>

Shows content differences between two branches
<code bash>
git diff [first-branch]...[second-branch]
</code>

Output metadata and content changes of the specified commit
<code bash>
git show [commit]
</code>

====Redo commit====
Undoes all commit after [commit], preserving changes locally
<code bash>
git reset [commit]
</code>

Discards all history and changes back to the specified commit
<code bash>
git reset --hard [commit]
</code>

====Synchronize changes====
Download all history from the repository bookmark
<code bash>
git fetch [bookmark]
</code>

Combines bookmark's branch into current local branch
<code bash>
git merge [bookmark]/[branch]
</code>

Uploads all local branch commit to Github
<code bash>
git push [alias] [branch]
</code>

Donwloads bookmark history and incorporates changes
<code bash>
git pull
</code>
