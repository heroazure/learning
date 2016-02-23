删除远程分支和tag
>>git push origin --delete <branchName>
>>git push origin --delete tag <tagname>

clone远程指定分支
>>git clone -b <branchName> <server>

根据远程分支创建本地分支
>>git fetch
>>git checkout -b localBranch origin/remoteBranch
或者以下方式:
>>git fetch origin
>>git checkout branchName
示例
{
cd repository
git fetch origin
remote: Counting objects: 92, done.
remote: Compressing objects: 100% (63/63), done.
remote: Total 68 (delta 41), reused 0 (delta 0)
Unpacking objects: 100% (68/68), done.
From https://github.com/user/repo.git
 * [new branch]      gh-pages     -> origin/gh-pages

git checkout gh-pages
Branch gh-pages set up to track remote branch gh-pages from origin.
Switched to a new branch 'gh-pages'
}

删除git管理文件
>>git rm .idea/* -r