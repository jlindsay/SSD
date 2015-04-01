
require(['jquery','ge-bootstrap', 'cookies', 'url'], function($) {
   initKeyBoard();
});

var _uuidIndex;
var _params;
var _uuid;
var _has_notification;
var _url="/";
var _index = 0;
var _history = [];


function initKeyBoard()
{
    var _url = $(location).attr('href');

        try{
            _params = $.url().param();    
        }catch(e){
            //
        }
        
        _uuid = _params.uuid;

        // for notification
        if(typeof _params.has_notification !== 'undefined') {
            if(_params.has_notification === "true") {
                $("body").addClass("has_notification");
            }
        }

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
    $.removeCookie('navigation');
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
    $.cookie('navigation', _index);
    var cookie = $.cookie('navigation');
        console.log("focus:index:", _index, ", cookie:",cookie);


        // var baseURL = document.location.href.match(/(^[^#]*)/);
        // console.log("base: " + baseURL);

        window.location = page.url +"?"+ "uuid="+page.uuid + "&has_notification=" + page.has_notification + "#"+ page.hash ;
        $("html, body").animate({ scrollTop: 0 }, "fast");
        
}


function uuid2index($uuid)
{
    //var isMatch = false;
    for(var i=0; i<_pages.length; i++){
        var page = _pages[i];
        if( page.uuid == $uuid ){
            return i;
        }
    }
    return null;
    
}


var _pages = [

    { url: 'index.html' , hash: "" , uuid:"000", has_notification: false},

    { url: 'fleet_title.html', hash: "" , uuid:"020", has_notification: false},
    { url: 'fleet_summary.html', hash: "" , uuid:"001", has_notification: false},
    { url: 'fleet_segment_1.html', hash: "home" , uuid:"002", has_notification: false},
    { url: 'fleet_segment_1.html', hash: "overview" , uuid:"003", has_notification: false},
    { url: 'fleet_segment_1.html', hash: "alarms" , uuid:"006", has_notification: false},
    { url: 'fleet_segment_1.html', hash: "analysis" , uuid:"007", has_notification: false},
    { url: 'time.html', hash: "Time passes..." , uuid:"008", has_notification: false},
    { url: 'fleet_segment_2.html', hash: "analysis" , uuid:"009", has_notification: false},
    { url: 'time.html', hash: "Time passes..." ,  uuid:"010", has_notification: false},
    { url: 'fleet_segment_3.html', hash: "overview" , uuid:"011", has_notification: true},
    { url: 'fleet_segment_3.html', hash: "issues" , uuid:"012", has_notification: true},
    { url: 'fleet_segment_3.html', hash: "detail" , uuid:"013", has_notification: false},
    { url: 'fleet_segment_3.html', hash: "maintenance" , uuid:"014", has_notification: false},
    { url: 'fleet_segment_3.html', hash: "overview" , uuid:"015", has_notification: false},
    { url: 'time.html', hash: "After the planned outage..." , uuid:"016", has_notification: false},
    { url: 'fleet_segment_4.html', hash: "analysis" , uuid:"017", has_notification: false},
    { url: 'fleet_segment_4.html', hash: "overview" , uuid:"018", has_notification: false},
    { url: 'thankyou.html', hash: "" , uuid:"019", has_notification: false},

    { url: 'index.html', hash: "" , uuid:"030", has_notification: false},

    { url: 'lng_title.html', hash: "" , uuid:"050", has_notification: false},
    { url: 'lng_summary.html', hash: "" , uuid:"031", has_notification: false},
    { url: 'lng_segment_1.html', hash: "home" , uuid:"032", has_notification: false},
    { url: 'lng_segment_1.html', hash: "overview" , uuid:"033", has_notification: false},
    { url: 'lng_segment_1.html', hash: "alarms" , uuid:"036", has_notification: false},
    { url: 'lng_segment_1.html',  hash: "analysis" , uuid:"037", has_notification: false},
    { url: 'time.html', hash: "Time passes..." ,  uuid:"038", has_notification: false},
    { url: 'lng_segment_2.html', hash: "analysis", uuid:"039", has_notification: false},
    { url: 'time.html', hash: "Time passes..." ,  uuid:"040", has_notification: false},
    { url: 'lng_segment_3.html', hash: "overview" , uuid:"041", has_notification: true},
    { url: 'lng_segment_3.html', hash: "issues" , uuid:"042", has_notification: true},
    { url: 'lng_segment_3.html', hash: "detail" , uuid:"043", has_notification: false},
    { url: 'lng_segment_3.html', hash: "maintenance" , uuid:"044", has_notification: false},
    { url: 'lng_segment_3.html', hash: "overview" , uuid:"045", has_notification: false},
    { url: 'time.html', hash: "After the planned outage..." , uuid:"046", has_notification: false},
    { url: 'lng_segment_4.html', hash: "analysis" , uuid:"047", has_notification: false},
    { url: 'lng_segment_4.html', hash: "overview" , uuid:"048", has_notification: false},
    { url: 'lng_thankyou.html', hash: "" , uuid:"049", has_notification: false},



    { url: 'index.html', hash: "" , uuid:"060", has_notification: false},

    { url: 'pipeline_title.html', hash: "" , uuid:"080", has_notification: false},
    { url: 'pipeline_summary.html', hash: "" , uuid:"061", has_notification: false},
    { url: 'pipeline_segment_1.html', hash: "home" , uuid:"062", has_notification: false},
    { url: 'pipeline_segment_1.html', hash: "overview" , uuid:"063", has_notification: false},
    { url: 'pipeline_segment_1.html', hash: "alarms" , uuid:"066", has_notification: false},
    { url: 'pipeline_segment_1.html', hash: "analysis" , uuid:"067", has_notification: false},
    { url: 'time.html', hash: "Time passes..." ,  uuid:"068", has_notification: false},
    { url: 'pipeline_segment_2.html', hash: "analysis" , uuid:"069", has_notification: false},
    { url: 'time.html', hash: "Time passes..." ,  uuid:"070", has_notification: false},
    { url: 'pipeline_segment_3.html', hash: "overview" , uuid:"071", has_notification: true},
    { url: 'pipeline_segment_3.html', hash: "issues" , uuid:"072", has_notification: true},
    { url: 'pipeline_segment_3.html', hash: "detail" , uuid:"073", has_notification: false},
    { url: 'pipeline_segment_3.html', hash: "maintenance" , uuid:"074", has_notification: false},
    { url: 'pipeline_segment_3.html', hash: "overview" , uuid:"075", has_notification: false},
    { url: 'time.html', hash: "After the planned outage..." , uuid:"076", has_notification: false},
    { url: 'pipeline_segment_4.html', hash: "analysis" , uuid:"077", has_notification: false},
    { url: 'pipeline_segment_4.html', hash: "overview" , uuid:"078", has_notification: false},
    { url: 'pipeline_thankyou.html', hash: "" , uuid:"079", has_notification: false},


    { url: 'index.html', hash: "" , uuid:"100"},

    { url: 'reinjection_title.html', hash: "" , uuid:"120", has_notification: false},
    { url: 'reinjection_summary.html', hash: "" , uuid:"101", has_notification: false},
    { url: 'reinjection_segment_1.html', hash: "home" , uuid:"102", has_notification: false},
    { url: 'reinjection_segment_1.html', hash: "overview" , uuid:"103", has_notification: false},
    { url: 'reinjection_segment_1.html', hash: "alarms" , uuid:"106", has_notification: false},
    { url: 'reinjection_segment_1.html', hash: "analysis" , uuid:"107", has_notification: false},
    { url: 'time.html', hash: "Time passes..." , uuid:"108", has_notification: false},
    { url: 'reinjection_segment_2.html', hash: "analysis" , uuid:"109", has_notification: false},
    { url: 'time.html', hash: "Time passes..." ,  uuid:"110", has_notification: false},
    { url: 'reinjection_segment_3.html', hash: "overview" , uuid:"111", has_notification: true},
    { url: 'reinjection_segment_3.html', hash: "issues" , uuid:"112", has_notification: true},
    { url: 'reinjection_segment_3.html', hash: "detail" , uuid:"113", has_notification: false},
    { url: 'reinjection_segment_3.html', hash: "maintenance" , uuid:"114", has_notification: false},
    { url: 'reinjection_segment_3.html', hash: "overview" , uuid:"115", has_notification: false},
    { url: 'time.html', hash: "After the planned outage..." , uuid:"116", has_notification: false},
    { url: 'reinjection_segment_4.html', hash: "analysis" , uuid:"117", has_notification: false},
    { url: 'reinjection_segment_4.html', hash: "overview" , uuid:"118", has_notification: false},
    { url: 'reinjection_thankyou.html', hash: "" , uuid:"119", has_notification: false},


    { url: 'index.html', hash: "" , uuid:"130", has_notification: false},


    { url: 'downstream_title.html', hash: "" , uuid:"150", has_notification: false},
    { url: 'downstream_summary.html', hash: "" , uuid:"131", has_notification: false},
    { url: 'downstream_segment_1.html', hash: "home" , uuid:"132", has_notification: false},
    { url: 'downstream_segment_1.html', hash: "overview" , uuid:"133", has_notification: false},
    { url: 'downstream_segment_1.html', hash: "performance" , uuid:"134", has_notification: false},
    { url: 'downstream_segment_1.html', hash: "overview" , uuid:"135", has_notification: false},
    { url: 'downstream_segment_1.html', hash: "alarms" , uuid:"136", has_notification: false},
    { url: 'downstream_segment_1.html', hash: "analysis" , uuid:"137", has_notification: false},
    { url: 'time.html', hash: "Time passes..." , uuid:"138", has_notification: false},
    { url: 'downstream_segment_2.html', hash: "analysis" , uuid:"139", has_notification: false},
    { url: 'time.html', hash: "Time passes..." , uuid:"140", has_notification: false},
    { url: 'downstream_segment_3.html', hash: "overview" , uuid:"141", has_notification: true},
    { url: 'downstream_segment_3.html', hash: "issues" , uuid:"142", has_notification: true},
    { url: 'downstream_segment_3.html', hash: "detail" , uuid:"143", has_notification: false},
    { url: 'downstream_segment_3.html', hash: "maintenance" , uuid:"144", has_notification: false},
    { url: 'downstream_segment_3.html', hash: "overview" , uuid:"145", has_notification: false},
    { url: 'time.html', hash: "After the planned outage..." , uuid:"146", has_notification: false},
    { url: 'downstream_segment_4.html', hash: "analysis" , uuid:"147", has_notification: false},
    { url: 'downstream_segment_4.html', hash: "overview" , uuid:"148", has_notification: false},
    { url: 'downstream_thankyou.html', hash: "", uuid:"149", has_notification: false},


    
];


