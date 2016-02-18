删除远程分支和tag
>>git push origin --delete <branchName>
>>git push origin --delete tag <tagname>

clone远程指定分支
>>git clone -b <branchName> <server>

根据远程分支创建本地分支
>>git fetch
>>git checkout -b localBranch origin/remoteBranch
