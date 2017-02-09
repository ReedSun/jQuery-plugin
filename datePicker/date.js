function DatePicker($node) {
	this.init($node);
	this.render();
	this.setDate();
	this.bind();
}


// 提供两个属性 this.date(当前日期或指定要展示的日期) this.watchDate(用户切换月份时看到的日期)
DatePicker.prototype.init = function($node){
	this.$node = $node;
	if (this.isValidDate($node.attr("date-init"))) {
		this.date = new Date($target.attr("date-init"));
		this.watchDate = new Date($target.attr("date-init"));
	} else {
		this.date = new Date();
		this.watchDate = new Date();
	}
}

//  将日历模板渲染到页面上
//   提供一个属性this.$datepicker(日历模板的jq对象)
DatePicker.prototype.render = function(){
    var tpl = '<div class="ui-date-picker" style="display:none">'
          	+    '<div class="header"><span class="pre arrow"></span><span class="cur header-date"></span><span class="next arrow"></span></div>'
            +    '<table class="panel">'
          	+      '<thead> <tr> <th>日</th> <th>一</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> </tr> </thead>'
          	+      '<tbody></tbody>'
          	+   '</div>';
    this.$datepicker = $(tpl);
    // 将日历模板渲染到页面上，但是display:none，所以不会显示
    // 设置css属性让模板渲染到输入框下方
    this.$datepicker.insertAfter(this.$node).css({
    	"position": "absolute",
    	"left": this.$node.offset().left,
    	"top": this.$node.offset().top + this.$node.outerHeight()
    })
}


// 渲染日历面板
DatePicker.prototype.setDate = function(){
	this.$datepicker.find("tbody").html("");

	var firstDay = this.getFirstDay(this.watchDate),
		lastDay = this.getLastDay(this.watchDate);

	var dateArr = [];

	// 添加当前日历模板中上个月的日期
	for (var i=firstDay.getDay();i>0;i--) {
		var day = new Date(firstDay.getTime() - i*24*60*60*1000);
		dateArr.push({type:"pre", date:day})
	}

	// 添加当前日历模板中这个月的日期
	for (var j=0;j<lastDay.getDate()-firstDay.getDate()+1; j++) {
		var day =  new Date(firstDay.getTime() + j*24*60*60*1000);
		dateArr.push({type:"cur", date:day})
	}

	// 添加当前日历模板中下个月的日期
	for (var k=1;k<7-lastDay.getDay();k++) {
		var day = new Date(lastDay.getTime() + k*24*60*60*1000);
		dateArr.push({type:"next", date:day})
	}
	this.$datepicker.find(".header-date").text(this.watchDate.getFullYear()+"年"+(this.watchDate.getMonth()+1)+"月");
	
	var tpl = "";
	for (var i=0;i<dateArr.length;i++) {
		// 如果是星期天另起一行
		if(i%7 === 0) {
			tpl += '<tr>';
		}

		tpl += '<td class="';

		if(dateArr[i].type === "pre") {
			tpl += 'pre-month';
		} else if(dateArr[i].type === "cur") {
			tpl += 'cur-month';
		} else if(dateArr[i].type === "next") {
			tpl += 'next-month';
		}

		// 如果是今天就加一个class
		if(this.getYYMMDD(new Date) === this.getYYMMDD(dateArr[i].date)) {
			tpl += ' cur-date';
		}

		tpl += '" date-data="' + this.getYYMMDD(dateArr[i].date) + '">';
		tpl += this.toFixed(dateArr[i].date.getDate()) + '</td>';

		// 如果是星期六，闭合这一行
		if(i%7 === 6) {
			tpl += '</tr>'
		}
	}
	this.$datepicker.find("tbody").html(tpl);
}


DatePicker.prototype.bind = function(){
	var _this = this
	
	this.$node.on("click", function(e){
		$(document).find(".ui-date-picker").hide();
		_this.$datepicker.show();
		e.stopPropagation();
	});

	this.$datepicker.find(".pre").on("click", function(){
		_this.watchDate = _this.getPreMonth(_this.watchDate);
		_this.setDate()
	});

	this.$datepicker.find(".next").on("click", function(){
		_this.watchDate = _this.getNextMonth(_this.watchDate);
		_this.setDate()
	});


	this.$datepicker.on("click",".cur-month, .pre-month, .next-month", function(e){
		var data = $(e.target).attr("date-data");
		_this.$node.val(data);		
		_this.$datepicker.hide()
	});


	this.$datepicker.on("click", function(e){
		e.stopPropagation();
	})

	$(window).on("click",function(){
		_this.$datepicker.hide();
		console.log(11);
	})
}


//  判断指定要展示的日期是否合法
//  指定要展示的日期在.data-ipt的date-init属性中
DatePicker.prototype.isValidDate = function(dateStr){
	return (new Date(dateStr).toString() !== "Invalid Date")
}


// 获取当月第一天的时间对象
DatePicker.prototype.getFirstDay = function(date) {
	var year = date.getFullYear(),
		month = date.getMonth();
	return new Date(year, month, 1);
}


// 获取当月最后一天的时间对象
DatePicker.prototype.getLastDay = function(date) {
	var year = date.getFullYear(),
		month = date.getMonth() + 1;
	if (month > 11) {
		month = 0;
		year += 1;
	}
	var newDate = new Date(year, month, 1);
	return new Date(newDate.getTime() - 1000*60*60*24);
}

// 将日期格式化成 YY/MM/DD的格式
DatePicker.prototype.getYYMMDD = function(date){
	var yy = date.getFullYear(),
		mm = this.toFixed(date.getMonth()+1),
		dd = this.toFixed(date.getDate());
	return (yy + "/" + mm + "/" + dd);
}

// 将一位的数字变为两位， 1 => 01
DatePicker.prototype.toFixed = function(n) {
	return (n+"").length===1 ? ("0"+(n+"")) : n+"";
}


DatePicker.prototype.getPreMonth = function(date) {
	var year = date.getFullYear(),
		month = date.getMonth()-1;
	if (month === -1) {
		month = 11;
		year -= 1;
	}
	return (new Date(year,month,1));
}

DatePicker.prototype.getNextMonth = function(date) {
	var year = date.getFullYear(),
		month = date.getMonth()+1;
	if (month === 12) {
		month = 1;
		year += 1;
	}
	return (new Date(year,month,1));
}

// jquery 插件
$.fn.datePicker =function($node){
	new DatePicker($node)
};