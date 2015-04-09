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

	
function Keynote()
{
//		console.log("Keynote()");		

	function init($config)
	{
		console.log("Keynote.init()");		
		_config = $config? $config : _config;
		_pages = ( _config.pages )? $config.pages : _pages;
		_index = ( _config.index )? $config.index : DEFAULT_INDEX;
//		focus( _index );
		initKeyBoard();
	}

	function initKeyBoard()
	{
		console.log("Keynote.initKeyBoard()");	

	    var _url = $(location).attr('href');

        try{
            _params = $.url().param();
        }catch(e){
            //
        }
	        
	        _uuid = _params.uuid;

        // for notification
/*
        if(typeof _params.has_notification !== 'undefined') {
            if(_params.has_notification === "true") {
                $("body").addClass("has_notification");
            }
        }
*/
	    var _uuidIndex = uuid2index( _uuid );
	        console.log("uuidIndex : " +  _uuidIndex );
	        console.log("debug:str:" + _uuid );
	        console.log("debug:url:" +  _url);

	    var cookie = $.cookie('navigation', Number);

	        _index = Number(cookie);

	        if( _uuidIndex && ( _index != _uuidIndex ) ){
	            _index = _uuidIndex;
	            focus(_index);
	        }
	       
	       // handle NaN, must be a blank cookie issue.
	       if(isNaN(_index)) {
	            _index = 0;
	       }
	    
	    $(document).keydown(function(e) {
	        switch(e.keyCode)
	        {
	            case 32: // spacebar
	                next();
	                console.log("spacebar");
	                break;
	            case 39: // right arrow
	                next();
	                console.log("right-arrow");
	                break;
	            case 37: // left arrow
	                prev();
	                console.log("left-arrow");
	                break;
	            case 38://up
	                resetIndex();
	                break;
	            case 40://down
	                resetIndex(); 
	                break;
	            case 48: // delete cookie
	                reset();
	                _index = 0;
	                focus(0);
	            default:
	                break;
	        }
	    });

	    $("html, body").animate({ scrollTop: 0 }, "fast");
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

	function focus($index)
	{
		console.log("focus:", $index);

	    var index = ($index >= _pages.length)? 0 : $index;
	    	index = (index < 0)? _pages.length-1 : index;
	    	_index = index;
	    	_history.push(_index);
	    
	    var page = _pages[_index];
/*
	    if( !page )
		{
			return ;
		}
*/
//	    	$.removeCookie('navigation');
	    	$.cookie('keynote', _index);
	    var cookie = $.cookie('keynote');
	        console.log("focus:index:", _index, ", cookie:",cookie);

//	    var baseURL = document.location.href.match(/(^[^#]*)/);
//	    	console.log("base: " + baseURL);
		
		
			try{
//				window.location = page.url +"?"+ "uuid="+page.uuid + "&has_notification=" + page.has_notification + "#"+ page.hash ;	
				window.location = page.url +"?"+ "uuid="+page.uuid + "#"+ page.hash ;	
				console.log( "window.location:", window.location );
				$("html, body").animate({ scrollTop: 0 }, "fast");
			}catch(e)
			{
				//console.log("error: page does not exist" );
			}
	        
	        
      
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
	var _pages = [];


}


