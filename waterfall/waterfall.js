$.fn.waterfall = function($node){
	function init($node){
		var nodeWidth = $node.outerWidth(true),
			colNum = parseInt( $(window).width() / nodeWidth ),
			colSumHeight = [];

		for (var i=0;i<colNum;i++) {
			colSumHeight.push(0);
		}

		$node.each(function(){
			var $cur = $(this),
				idx = 0,
				minSumHeight = colSumHeight[0];

			// 获取到solSumHeight中的最小高度
			for (var i=0;i<colSumHeight.length;i++) {
				if (minSumHeight > colSumHeight[i]) {
					minSumHeight = colSumHeight[i];
					idx = i;
				}
			}

			// 设置各个item的css属性
			$cur.css({
				left: nodeWidth*idx,
				top: minSumHeight
			})

			// 更新solSumHeight
			colSumHeight[idx] = colSumHeight[idx] + $cur.outerHeight(true);
		})
	}
	init($node)

	// 设置窗口改变时也能重新加载
	$(window).on("resize", function(){
		init($node);
	})
}