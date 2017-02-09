function Tab($node){
	this.$node = $node;
	this.init();
	this.bind();
}
Tab.prototype.init = function(){
	this.$opinion = this.$node.find(".tab-ct");
	this.$content = this.$node.find(".tab-content")
}
Tab.prototype.bind = function(){
	var _this = this
	this.$opinion.on("click", function(e){
		var idx = $(e.target).index();
		_this.$opinion.children().removeClass("active");
		_this.$opinion.children().eq(idx).addClass("active");
		_this.$content.children().removeClass("active");
		_this.$content.children().eq(idx).addClass("active");
	})
}
$.fn.tab = function($node){
	new Tab($node)
}