Template-Creator 用于拷贝模板文档

内置了一些常用的项目模板文件, 本项目特点:
1. 模板模块内置.
2. 一个项目里面可以安装多个模板模块, 可以根据需要搭配组合.
3. `creator` 是一个颜色丰富多彩命令行工具

### 安装 

`yarn global add template-creator`, 得到命令行工具 `creator`

### `creator` | `creator -l`

```
已有模板项目:
code-lint // eslint 提供代码检查
ts-jest // typescript 的测试
ts-package // typescript 构建一个 npm 包
ts-react // typescript 下的react 项目
```

### `creator <模板名字>` 例如: `creator code-lint` | `creator ts-jest`

在当前项目中安装 <模板名字> 对应的模板文件和依赖库.