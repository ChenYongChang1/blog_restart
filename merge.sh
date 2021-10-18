#退出程序
function goto_exit()
{
    echo "${3} ${RED_COLOR} $1 ${RES}"
    # read -p "按任意键关闭" -n 1
    exit $2
}

#检测冲突
function last_status()
{
    if [ $? -eq 0 ]
    then
        return 0
    else
        #exit -2
        goto_exit "执行异常[产生冲突或其他原因]" -2
    fi
}
#切换分支并拉取代码
function pull_latest_branch(){
    if git checkout $1 && git pull
    then
        last_status
    fi
}
# $1表示要合并到的分支[目标分支]，$2表示要合并的分支
function merge_branch()
{
    if git checkout $1 && pull_latest_branch $1 && git merge $2
    then
        echo $1 合并 $2 成功
        last_status
    fi
}

# 接收一个参数，要推送的目标分支
function push_branch()
{
    if git push origin $1 && git status
    then
        last_status
    fi
}

function pull_merge() {
    # 1 是commit text 2 是 merge branch 3 是当前 branch
    echo $1 $2 $3
    git add .
    echo "添加所有更改成功"
    git commit -m "$1"
    echo "commit $1 成功"
    push_branch $3
    echo "推送到远程成功"
    echo $3 '准备合并到' $2 '分支'
    merge_branch $2 $3
    push_branch $2
}


branch=`git branch | grep "*"`
# 截取分支名
currBranch=${branch:2}

commitType=${1:-'?'}
commitMsg=${2:-'---'}
modal=${3:-'模块'}
commitBrand=${4:-'?'}

if [[ "$commitType" == "?" ]];then
    echo "功能如下：\n{
        init: '初始化',
        feat: '添加了个很棒的功能',
        fix: '修复了一些 bug',
        refactor: '代码重构',
        ui: '修改了一下样式',
        docs: '更新了一下文档',
        style: '代码格式修改, 注意不是 css 修改',
        test: '测试用例修改',
        build: '构建项目',
        chore: '对脚手架做了些更改',
        locale: '为国际化做了微小的贡献',
        scope: 'commit 影响的范围, 比如: route, component, utils, build…',
        subject: 'commit 的概述',
    }"
    goto_exit '没有 commitType' -2 ""
fi

if [[ "$commitBrand" == "?" ]];then
    if [[ $currBranch == hotfix-* ]];then
        commitBrand='test'
    else
        git pull origin
        commitBrand='dev'
    fi
fi

pull_merge "$commitType($modal): $commitMsg" $commitBrand $currBranch

merge_branch $currBranch $commitBrand

push_branch $currBranch
