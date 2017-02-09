function Modal(option) {
    this.$node = option.$node;
    this.header = option.header || undefined;
    this.content = option.content || undefined;
    this.footer = option.footer || undefined;
    if (this.footer !== undefined) {
        if(option.footer.confirmBtn) {
            this.confirmBtn = option.footer.confirmBtn.name || undefined;
            this.confirmBtnHint = option.footer.confirmBtn.hint || undefined;
        }
        if(option.footer.closeBtn) {
            this.closeBtn = option.footer.closeBtn.name || undefined;
            this.closeBtnHint = option.footer.closeBtn.hint || undefined;
        }
    }
    this.bind();
}

Modal.prototype.render = function(){
    var tpl = "";
    tpl += '  <div class="dialog-overlay"></div>';
    tpl += '  <div class="dialog-box">';
    if (this.header !== undefined) {
        tpl += '<div class="dialog-header clear">';
        tpl += '  <h3>' + this.header +'</h3>';
        tpl += '  <span class="btn-close">X</span>';
	    tpl += '</div>';
    }
    tpl += '    <div class="dialog-content">' + this.content + '</div>';
    if (this.footer !== undefined) {
        tpl += '<div class="dialog-footer">';
        if(this.closeBtn !== undefined) {
            tpl += '<a href="javascript:void(0)" class="btn btn-close">' + this.closeBtn + '</a>';
        }
        if(this.confirmBtn !== undefined) {
            tpl += '<a href="javascript:void(0)" class="btn btn-confirm">' + this.confirmBtn + '</a>';
        }
        tpl += '</div>';
    }
    tpl += '  </div>';
    $(".dialog").html(tpl);
};
Modal.prototype.bind = function(){
    var _this = this;

    this.$node.on("click", function(){
    	_this.render();
       
        $(".dialog .btn-close").on("click", function(){
            if(_this.closeBtnHint !== undefined) {
                alert(_this.closeBtnHint);
            }
            $(".dialog").hide();    
        });
        
        $(".dialog .btn-confirm").on("click", function(){
        	console.log(1);
            if(_this.confirmBtn !== undefined) {
                alert(_this.confirmBtnHint);
            }
            $(".dialog").hide();
        });

        $(".dialog").show();
    });
}

$.fn.modal = function(object) {
	new Modal(object)	
}