
////
// Variable declarations
//
const fourthree = 1.3333333;
const sixteennine = 1.7777777;
const svgHeightRatio = 1.0588;
const svgWidthRatio = 1.191;
////
// Document measurements, state, dimensions, and accepted application pages.
//
var currentWidth = parseInt($('.reveal-wrapper').css('width'));
var height = Math.round(currentWidth / fourthree);
var sixnineHeight = Math.round(currentWidth / sixteennine);
var sixnineImgHeight = Math.round((currentWidth - 60) / sixteennine);
var currentTarget;
var previousTarget;
var scrollPositionToggle = 1;
var scrollPosition;
var pages = ["sps", "ab", "de", "pw", "about"];
var projects = {sps:"Columbia University", ab:"Amalgamated Bank", de:"1.State", pw:"Personal Work"};
var firstVisit = true;

////
// css objects
//
var nav = {
	height: "80px",
	paddingTop: "5px",
	paddingBottom: "0px"
};
var logoChars = $('.logo-back').children();
////
// slide show objects
//
var gotv = new Reveal(document.querySelector('.sps-gotv'), slideShowConfig(currentWidth, height));
var spsStationary = new Reveal(document.querySelector('.sps-stationary'), slideShowConfig(currentWidth, height));
var spsEvents = new Reveal(document.querySelector('.sps-events'), slideShowConfig(currentWidth, height));
var cWalk = new Reveal(document.querySelector('.cwalk'), slideShowConfig(currentWidth, height));
var idealist = new Reveal(document.querySelector('.idealist'), slideShowConfig(currentWidth, height));
var alpBrochure = new Reveal(document.querySelector('.alp-brochure'), slideShowConfig(currentWidth, height));
var annualReport = new Reveal(document.querySelector('.annual-report'), slideShowConfig(currentWidth, height));
var spsFlyers = new Reveal(document.querySelector('.sps-flyers'), slideShowConfig(currentWidth, height));
var abMarketing = new Reveal(document.querySelector('.ab-marketing'), slideShowConfig(currentWidth, height));
var abStationary = new Reveal(document.querySelector('.ab-stationary'), slideShowConfig(currentWidth, height));
var abScreens = new Reveal(document.querySelector('.ab-tv-screens'), slideShowConfig(currentWidth, height));
var deMedia = new Reveal(document.querySelector('.de-media'), slideShowConfig(currentWidth, height));
var rIsland = new Reveal(document.querySelector('.r-island'), slideShowConfig(currentWidth, height));
var typeSpa = new Reveal(document.querySelector('.type-spa'), slideShowConfig(currentWidth, height));
////
// Initialize slide show image dimensions
//
$('.reveal img').css('height', height + "px");
$('.ab-image, .de-image, sps-image').css('height', sixnineImgHeight + "px");
var aboutImgHeight = height;
var svgImgHeight = aboutImgHeight / svgHeightRatio;
var svgImgWidth = svgImgHeight * svgWidthRatio;
////
// Function declarations
//
function increaseHeight(target){
	if(currentTarget == 'about'){
		$('.' + currentTarget + '-img').show();
	}
	$('.' + target).css('height', height+"px");
	$('.' + target + ' ' + '.reveal-wrapper').css('height', height + "px");
	slideShowLayoutRefresh();
	$('.' + target + '-text').show();
	$('.' + target + '-text').velocity({ opacity: 1 }, { duration: 450 });
	$('.' + target).velocity({ opacity: 1 }, { duration: 450 });
};
function decreaseHeight(){
	if(currentTarget == 'about'){
		$('.' + currentTarget + '-img').hide();
		$('.' + currentTarget + '-svg').hide();
	}
	$('.' + currentTarget).velocity({ opacity: 0 }, { duration: 250 });
	$('.' + currentTarget + '-text').velocity({ opacity: 0 }, { duration: 250 });
	$('.' + currentTarget + '-text').hide();
	$('.' + currentTarget).css('height', "0px");
	$('.' + currentTarget + ' ' + '.reveal-wrapper').css('height', "0px");
};
function mainSelectionHide(){
	$('.main-container').velocity({opacity: 0}, {duration:450});
	$('.main-container').hide();
	$('.back').show();
};
function mainSelectionShow(){
	$('.main-container').show();
	$('.main-container').velocity({opacity: 1}, {duration:250});
	$('.back').hide();
};
function slideShowLayoutRefresh(){
	gotv.layout();
	spsStationary.layout();
	spsEvents.layout();
	cWalk.layout();
	idealist.layout();
	alpBrochure.layout();
	annualReport.layout();
	spsFlyers.layout();
	abMarketing.layout();
	abStationary.layout();
	deMedia.layout();
	rIsland.layout();
	typeSpa.layout();
	abScreens.layout();
};
function displayPage(){
	scrollPositionToggle = 0;
	increaseHeight(currentTarget);
	if(currentTarget == 'about'){
		// do nothing
	};
	mainSelectionHide();
	$("html").velocity("scroll", {duration: 500, offset: 0});
};
function back(){
	scrollPositionToggle = 1;
	if(currentTarget==undefined){
		//do nothing
	}
	else
	{
		history.back();
		decreaseHeight();
		$('.about-img').hide();
		$('.about-svg').hide();
		mainSelectionShow();
		window.scroll(0, scrollPosition)
	};
};
function slideShowConfig(width, height){
	var obj = {
				width: width,
				height: height,
				touch: true,
				margin: 0.00,
				progress: true,
				embedded: true,
				center: false,
				help: true,
				keyboardCondition: 'focused'
			};
	return obj;
};
function footerNavLinks() {
	for(var i= 0; i<Object.keys(projects).length; i++) {
		if(currentTarget == Object.keys(projects)[i]){
			if(i==0){
				$('.prev-project').hide();
				$('.next-project').text(Object.values(projects)[i+1]+ " >");
				$('.next-project').show();
			} else if(i > 0 && i < Object.keys(projects).length - 1) {
				$('.prev-project').text("< " + Object.values(projects)[i-1]);
				$('.prev-project').show();
				$('.next-project').text(Object.values(projects)[i+1]+ " >");
				$('.next-project').show();
			} else if (i == Object.keys(projects).length - 1){
				$('.prev-project').text("< " + Object.values(projects)[i-1]);
				$('.prev-project').show();
				$('.next-project').hide();
			};
		} else if (currentTarget == undefined || currentTarget == "about") {
			$('.prev-project').hide();
			$('.next-project').hide();
		};
	};
};
function showAboutImg(){
	$('.about-img').show();
	$('.about-svg').show();
	$('.about-svg').velocity({strokeDashoffset: 0}, {duration:3000, easing:[.7,0,.05,1], delay:1000});
	$('.about-svg').velocity({opacity: 0}, {duration:1000, easing: [0,.2,.8,1], display:'none'});
	$('.about-img').velocity({opacity: 1}, {duration:1000, easing: [.8,0,1,1], delay:4000});
};
function mainAnimation(){
	for(var i=0; i<logoChars.length; i++) {
		$(logoChars[i]).velocity({opacity:1},{duration: Math.abs(Math.random()*2000), delay:Math.abs(Math.random()*1175)});
	};
	$('nav').velocity(nav, {duration: 1000, easing: "easeInOutSine", delay:2400,complete: function(elements) {
		$('body').removeClass('hide-scroll');
	}});
};
function init(){
	if(location.hash !== '' || location.hash == undefined || location.hash.length==0){
		var tmpString = location.hash;
		var len = tmpString.length;
		var hash = tmpString.substring(1,len);

		if(firstVisit && hash == '') {
			mainAnimation();
			firstVisit = false;
		} else {
			$('body').removeClass('hide-scroll');
			$('nav').css(nav);
			$('.logo-back').children().css({opacity:1});

			if(pages.indexOf(hash)>=0){
				currentTarget = hash;
				footerNavLinks();
				displayPage();
				previousTarget = currentTarget;
				if(currentTarget == 'about'){
					showAboutImg();
				}
			} else {
				back();
			};
		};
	};
};
////
//	SVG overlay ratio
//
$('.about-svg').css('height', svgImgHeight + "px");
$('.about-svg').css('width', svgImgWidth + "px");

////
// Bowser navigation event listener
//
window.onpopstate = function(event) {
	if(location.hash !== '' || location.hash == undefined || location.hash.length==0){
			var tmpString = location.hash;
			var len = tmpString.length;
			var hash = tmpString.substring(1,len);
			if(pages.indexOf(hash) >= 0) {
					if(hash != previousTarget) {
						decreaseHeight(previousTarget);
					};
					if(hash == 'about') {
							showAboutImg();
							// decreaseHeight()
							currentTarget = hash;
					} else if(currentTarget!== undefined) {
							mainSelectionHide()
					};
					currentTarget = hash;
					footerNavLinks();
					displayPage();
					previousTarget = currentTarget;
				} else if(currentTarget == undefined && previousTarget == undefined) {
					footerNavLinks();
				} else {
					decreaseHeight();
					currentTarget = undefined;
					footerNavLinks();
					previousTarget = currentTarget;
					location.hash = '';
					mainSelectionShow();
				};
	};
};
////
// Initialization of each slide show
//
gotv.initialize();
spsStationary.initialize();
spsEvents.initialize();
cWalk.initialize();
idealist.initialize();
alpBrochure.initialize();
annualReport.initialize();
spsFlyers.initialize();
abMarketing.initialize();
abStationary.initialize();
deMedia.initialize();
rIsland.initialize();
typeSpa.initialize();
abScreens.initialize();
////
// Event listeners
//
$('.main-container img').on('click', function(e){
	event.preventDefault();
	currentTarget = e.srcElement.attributes.data.value;
	location.hash = currentTarget;
});
$('.back').on('click', function(e){
	e.preventDefault();
	back();
	currentTarget = undefined;
	previousTarget = currentTarget;
});
$('.logo-back').on('click', function(e){
	decreaseHeight();
	currentTarget = undefined;
	previousTarget = currentTarget;
	location.hash = '';
	$('.about-img').hide();
	mainSelectionShow();
});
$('.about-link').on('click', function(e){
	if(currentTarget == 'about'){
		//do nothing
	} else {
		decreaseHeight();
		currentTarget = e.srcElement.attributes.data.value;
		location.hash = currentTarget;
	};
});
$('.next-project, .prev-project').on('click', function(e){
	if($(e.target).hasClass('next-project')){
		for(var i= 0; i<Object.keys(projects).length; i++) {
			if(currentTarget == Object.keys(projects)[i]) {
				location.hash = Object.keys(projects)[i+1];
				break;
			};
		};
	} else {
		for(var i= 0; i<Object.keys(projects).length; i++) {
			if(currentTarget == Object.keys(projects)[i]) {
				location.hash = Object.keys(projects)[i-1]
			};
		};
	};
});
window.addEventListener('resize', function(){
  	var currentWidth = parseInt($('.reveal-wrapper').css('width'));
  	var height = Math.round(currentWidth / fourthree);
  	$('.' + currentTarget).css('height', height+"px");
  	$('.' + currentTarget + ' ' + '.reveal-wrapper').css('height', height + "px");
  	slideShowLayoutRefresh();
  	var aboutImgHeight = parseInt($('.about-img').css('height'));
	var svgImgHeight = aboutImgHeight / svgHeightRatio;
	var svgImgWidth = svgImgHeight * svgWidthRatio;
	$('.about-svg').css('height', svgImgHeight + "px");
	$('.about-svg').css('width', svgImgWidth + "px");
});
window.addEventListener('scroll', function(e){
	if (scrollPositionToggle) {
		scrollPosition = Math.round(window.scrollY);
	};
});
window.onload = function() {
  init();
};

