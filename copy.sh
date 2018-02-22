# set  the sh code enviroment  !/usr/bin/env node
echo "copy.sh 用于拷贝本地~/template下的模板文件";

#获取当前的目录
dir=$(pwd);

echo "想要复制的是 $1";
echo "...";

# 配置模板的地址;
temp=$HOME/template/$1;

# 手动生成的
if [ $1 == 'gitignore' ]
then
    echo "node_modules" >> .gitignore;
    echo "生成成功"
    
    # 匹配模板
elif test -e $temp
then
    echo "$1的模板文件已找到：";
    ls -l $temp
    
    cp -R $temp/* $dir;
    echo "复制完成";
    ls -l;
    
    # 当有第二个参数时
    if [ $# -eq 2 ]
    then
        # 如果是node项目
        if [ $2 -eq "-node" ]
        then
            echo "node_modules" >> .gitignore;
            echo ".gitignore 生成成功";
            yarn install;
        fi
    fi
else
    echo '复制失败，模板文件不存在!'
fi
