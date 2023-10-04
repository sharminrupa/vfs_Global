var demo = document.getElementById("demo");			
			document.getElementById('asia_time').onclick = asia_time;
			document.getElementById('global_time').onclick = global_time;
			
			function asia_time(clicked) {
                 const d = new Date();
				 document.getElementById("demo").innerHTML = d;
			}		
			
            function global_time(clicked) {
                var dt = new Date();
                var hours = dt.getHours() ; // gives the value in 24 hours format
                // var AmOrPm = hours >= 12 ? 'pm' : 'am';
                //hours = (hours % 12) || 12;
                var minutes = dt.getMinutes() ;
                var finalTime = "Time  - " + hours + ":" + minutes;
                finalTime // final time Time - 22:10



				 document.getElementById("demo").innerHTML = dt.toLocaleString('en-us',{
                    hour12: false,
                 });
                
			}	


//      new Date(year,month,day)
const currentDate = new Date();

const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
const currentYear = currentDate.getFullYear();

const dateString = currentDayOfMonth + " / " + (currentMonth + 1) + " / " + currentYear;

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const now = new Date(2021, 3, 1);
const onejan = new Date(now.getFullYear());

let day = weekday[onejan.getDay()];
document.getElementById("date-demo").innerHTML = day + " " + " - "+ " " + dateString;





// ********************* explore time start*************


function close_time_shedule(){
    var menu = $('.navigation-slide').SlidePanel({
        place: 'right',
        exit_selector: '.ns-exit',
        toggle: '#ns-product-toggle',
        no_scroll: true,
        body_slide: false,
        auto_close: true,
        onSlideOpening: function () {
            // Displays the overlay for UI stuffs.
            $(".navigation-overlay").removeClass("is-hidden").addClass("is-visible");
        }, onSlideClosing: function () {
            // Hides the overlay for UI stuffs.
            $(".navigation-overlay").removeClass("is-visible").addClass("is-hidden");
        }
    });
    
    menu.activate();
}
// ********************* explore time end*************
var menu = $('.navigation-slide').SlidePanel({
    place: 'right',
    exit_selector: '.ns-exit',
    toggle: '#ns-product-toggle',
    no_scroll: true,
    body_slide: false,
    auto_close: true,
    onSlideOpening: function () {
        // Displays the overlay for UI stuffs.
        $(".navigation-overlay").removeClass("is-hidden").addClass("is-visible");
    }, onSlideClosing: function () {
        // Hides the overlay for UI stuffs.
        $(".navigation-overlay").removeClass("is-visible").addClass("is-hidden");
    }
});

menu.activate();
if ('WebSocket' in window) {
(function () {
    function refreshCSS() {
        var sheets = [].slice.call(document.getElementsByTagName("link"));
        var head = document.getElementsByTagName("head")[0];
        for (var i = 0; i < sheets.length; ++i) {
            var elem = sheets[i];
            var parent = elem.parentElement || head;
            parent.removeChild(elem);
            var rel = elem.rel;
            if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
            }
            parent.appendChild(elem);
        }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
        if (msg.data == 'reload') window.location.reload();
        else if (msg.data == 'refreshcss') refreshCSS();
    };
    if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
        console.log('Live reload enabled.');
        sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
    }
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
// ]]>