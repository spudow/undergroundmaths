$(document).ready(function(){$('.toggle').each(function(){var showText='Show';var hideText='Hide';if($(this).attr('data-showtext')){showText=$(this).attr('data-showtext');}
if($(this).attr('data-hidetext')){hideText=$(this).attr('data-hidetext');}
var showButton=$('<input></input>').attr({'type':"button",'class':"toggleLink",'data-hidetext':hideText,'data-showtext':showText,value:showText});var hideButton=$('<input></input>').attr({'type':"button",'class':"toggleLink",'data-showtext':showText,'data-hidetext':hideText,value:hideText});showButton.insertBefore($(this));$(this).hide();});$('.toggleLink').click(function(){$(this).val($(this).val()==$(this).attr('data-hidetext')?$(this).attr('data-showtext'):$(this).attr('data-hidetext'));$(this).next('.toggle').toggle('slow');return false;});});$(document).ready(function(){var iFrameDetection=(window===window.parent)?false:true;if(iFrameDetection){$('.site-navigation a').each(function(){$(this).attr("target","_blank");});}
$("#open-menu").bind('click',function(e){$("body").removeClass("mobile-search");$("body").toggleClass("mobile");e.preventDefault();})
$(".mobile-sitename").bind('click',function(e){$("body").removeClass("mobile-search");$("body").toggleClass("mobile");e.preventDefault();})
$("#open-search").bind('click',function(e){$("body").removeClass("mobile");$("body").toggleClass("mobile-search");e.preventDefault();})
$("#viewmenuctrl").bind('click',function(e){if($(".site-navigation").css('visibility')=='hidden'){$("#header").css('height','118px');$(".site-navigation").css('visibility','visible');$("#problemviewmenu, #cloud, .footer-menu, .site-logo").toggle();$("#columntwo").toggleClass("col-sm-9").toggleClass("col-sm-12");$("#viewmenuctrl a").text("Hide Menu");}else{$(".site-navigation").css('visibility','hidden');$("#problemviewmenu, #cloud, .footer-menu, .site-logo").toggle();$("#columntwo").toggleClass("col-sm-9").toggleClass("col-sm-12");$("#header").css('height','73px');$("#viewmenuctrl a").text("Show Menu");ga('send','event','UI','hidemenu','UIanalysis');}
e.preventDefault();})});$(document).ready(function(){const log=false;const queryString=window.location.search;quietlog(queryString);const urlParams=new URLSearchParams(queryString);const stealth=urlParams.get('siteui');if((stealth&1)==1){quietlog('turn off main menu items leave logo');$(".pointer, .student-level-links, .teacher-level-links, .ancillary-links, .topics, .search-box").css('display','none');}
if((stealth&2)==2){quietlog('turn off sidebar');$("#columntwo").toggleClass("col-sm-9").toggleClass("col-sm-12");$("#problemviewmenu, #viewmenuctrl").css('display','none');}
if((stealth&4)==4){quietlog('turn off age range');$(".contdifflevel").css('display','none');}
if((stealth&8)==8){quietlog('turn off footer menu');$(".footer-menu").css('display','none');}
if((stealth&16)==16){quietlog('turn off footer');$(".footer").css('display','none');}
function quietlog(str){if(log==true){console.log(str);}}});