/** 
 * author:JOsH Lindsay
 * email: joshdlindsay@gmail.com
 */ 

/**
 * dependancy jquery, jquery.url, jquery.cookies
 */

 /**
  * description: the ideal is to make interactive web-pages in part act like a powerpoint or keynote presentation, while preserving interactivity
  */

//Keynote
(function( $ ){

/*
	$.fn.keynote = function($config)
	{
		if ($.data(this, "plugin_gauge")){
			return;			
		} 

		return $(this).each(function() {
		        _instances.push( new GuageClass().init( this,$config ) );
		        $.data(this, "plugin_gauge");
		});
	}

	var _instances = [];
*/
	$.fn.keynote = Keynote;

	
	function Keynote()
	{
//		console.log("Keynote()");		

		function init($config)
		{
			console.log("Keynote.init()");		
			_config = $config? $config : _config;
			_pages = $config.pages ? $config.pages : _pages;
			_index = $config.index ? $config.index : DEFAULT_INDEX;
			focus( _index );
		}
		
		function reset() {
		    $.removeCookie('keynote');
		}

		function resetIndex()
		{
		    focus(_index);
		}

		function next()
		{
		    focus(_index+1);
		}

		function prev()
		{
		    focus(_index-1);
		}

		function focus(index)
		{
		    index = (index >= _pages.length)? 0 : index;
		    index = (index < 0)? _pages.length-1 : index;
		    _index = index;
		    _history.push(_index);
		    var page = _pages[_index];
		    //$.removeCookie('navigation');
		    $.cookie('keynote', _index);
		    var cookie = $.cookie('keynote');
		        console.log("focus:index:", _index, ", cookie:",cookie);


		        // var baseURL = document.location.href.match(/(^[^#]*)/);
		        // console.log("base: " + baseURL);

		        window.location = page.url +"?"+ "uuid="+page.uuid + "&has_notification=" + page.has_notification + "#"+ page.hash ;
		        $("html, body").animate({ scrollTop: 0 }, "fast");
		        
		}


		function uuid2index($uuid)
		{
		    for(var i=0; i<_pages.length; i++){
		        var page = _pages[i];
		        if( page.uuid == $uuid ){
		            return i;
		        }
		    }
		    return null;
		    
		}

		//interface
		this.init = init;
		this.next = next;
		this.prev = prev;
		this.focus = focus;
		this.resetIndex = resetIndex;
//		this.uuid2index = uuid2index;

		//static vars
		var DEFAULT_INDEX=0;

		//private var(s)
		var _config = {};
		var _uuidIndex;
		var _params;
		var _uuid;
		var _has_notification;
		var _url="/";
		var _index = DEFAULT_INDEX;
		var _history = [];


	}


	

})( jQuery );
