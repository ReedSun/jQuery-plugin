# jQuery-plugin
jQuery插件库，包括滚动轮播插件、回到顶部插件、瀑布流插件、skickup效果插件、模态框插件、日期输入插件、tab切换插件等。

## carousel
滚动轮播插件，包含两个可以前后滚动的按钮，跳转到指定页面的按钮，以及让其自动滚动的功能。

- [demo](https://reedsun.github.io/jQuery-plugin/carousel/demo.html)

## gotop
滚动回到顶部插件，可以设置当页面滚动指定距离后显示回到顶部按钮，以及滚动回到顶部的速度。

- [demo](https://reedsun.github.io/jQuery-plugin/gotop/demo.html)

## waterfall
图片瀑布流插件，选择要进行瀑布流布置的图片即可自动实现瀑布流。

- [demo](https://reedsun.github.io/jQuery-plugin/waterfall/demo.html)

## stickup
导航栏悬浮插件，可以将指定元素固定在浏览器顶部从而不受浏览器滚动的影响。

- [demo](https://reedsun.github.io/jQuery-plugin/stickup/demo.html)

## modal
模态框插件。可以指定点击某个元素后出现模态框

- [demo](https://reedsun.github.io/jQuery-plugin/modal/demo.html)

参数为一个对象，具体含义如下：

```
{
    $node: xxx,              // 点击此元素打开模态框，必填
    header: xxx,             // 头部文字，选填
    content: xxx,            // 内容，可以为html字符串，选填 
    footer: {                // 尾部按钮，选填
        confirmBtn: {        // 确认按钮，选填
            name: "确认",    // 确认按钮名字，选填
            hint: "确认"     // 确认按钮提示文字，选填
        },
        closeBtn: {          // 取消按钮，选填
            name: "取消",    // 取消按钮名字，选填
            hint: "取消"     // 取消按钮提示文字，选填
        }
    }
```

## datePicker
日期输入插件，可以生成一个日历对象用于选取日期。

- [demo](https://reedsun.github.io/jQuery-plugin/datePicker/demo.html)

## tab
tab切换插件，可以自动生成tab切换模块功能。

- [demo](https://reedsun.github.io/jQuery-plugin/tab/demo.html)
