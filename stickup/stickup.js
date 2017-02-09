$.fn.stick =function(){
	var $cur = this,
		curH = $cur.height(),
		curW = $cur.width(),
		offsetTop = $cur.offset().top,
		offsetLeft = $cur.offset().left,
		isFixed = false;

	//  克隆元素，用于占位
	var $curClone = $cur.clone()
						.css({visibility: "hidden",display: "none"})
						.insertBefore($cur);
	

	//  设置监听函数
	$(window).on("scroll", function(){
		var winScroll = $(this).scrollTop();
		if(offsetTop < winScroll){
			if(!isFixed){
				setFixed();
			}
		}else{
			if(isFixed){
				unsetFixed();
			}
		}
	});



	// 设置添加和删除stick函数
	function setFixed(){
		$cur.css({
			"position" : "fixed",
			"top" : 0,
			"left" : offsetLeft,
			"width" : curW,
			"z-index" : 100,
			"margin" : 0
		}),
		$curClone.show();
		isFixed = true;
	}
	function unsetFixed(){
		$cur.removeAttr("style");
		$curClone.hide();
		isFixed = false;
	}

}