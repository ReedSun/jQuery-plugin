function GoTop($parent, line, speed){
	this.ct = $parent;
	this.line = line;
	this.speed = speed;
	this.target = $('<div id="go-top">回到顶部</div>');
	this.createNode();
	this.bindEvent();
}
GoTop.prototype.bindEvent = function(){
	var $cur = this.target;
	var _this = this;
	var clockForTimeout;
	$cur.on("click", function(){
		var clock = setInterval(function(){
			var top = $(window).scrollTop();
			if((top-_this.speed)>0){
				$(window).scrollTop(top-_this.speed);
			}else {
				$(window).scrollTop(0);
				clearInterval(clock);
			}
		}, 5)
	})
	$(window).on("scroll", function(){
		if (clockForTimeout) {
			clearTimeout(clockForTimeout)
		}
		clockForTimeout = setTimeout(function(){
			if($(window).scrollTop()>_this.line){
				$cur.show()
			}
			if($(window).scrollTop()<_this.line){
				$cur.hide()
			}
		}, 200)

	})
}
GoTop.prototype.createNode = function(){
	this.ct.append(this.target);
}

$.fn.gotop = function($node, line, speed){
	$node = $node || $("body")
	line = line || 600;
	speed = speed || 50;
	new GoTop($node, line, speed)
}



