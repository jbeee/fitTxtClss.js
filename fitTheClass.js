/*
 fitTheClass.js 
 From http://demo.jbee.io/fitTheClass  
 Copyright (c) 2013 ICRL 
*/

$.fn.rspTxt = function(options){ //hw,minF,maxF,fbScrll,innrEl,compR
 var defaults = {
      resizebyWidth: false,
      widthCompRatio: 1.5,
      innerTag:'p',     
      minSize:'10px',
      maxSize:'50px',
      throttleTime: 500
      /* todo: add this functionality ,
	  maxWidth:false,
      maxHeight:false,
      minHeight:false,
      minWidth:false,     
      addScroll:false 
      */
      
    };
     var opts = $.extend(defaults, options);
     var hw = opts.resizebyWidth ? 1 : 0;
     opts.minSize = parseInt(opts.minSize.replace("px",""));  opts.maxSize = parseInt(opts.maxSize.replace("px",""));
  	 
	 var $activeClass = this; 
	 var $lngInnrEl;
	 var lngInnrPx = 0;
     var defaultWrap = $activeClass.css('white-space');
	 var $nEl; var nPx;
	 this.each(function(){ 	 	
	 if(opts.innerTag == false){$nEl = $(this)}else{$nEl = $(this).find(opts.innerTag);}   
			 if(hw==0){
			  nPx = $nEl.height();
			 if(nPx>lngInnrPx){	$lngInnrEl = $nEl;lngInnrPx = nPx;}  
			 }
			 else
			 {
				nPx = $nEl.html().length;
				if(nPx>lngInnrPx){$lngInnrEl = $nEl;lngInnrPx = nPx;}				 
			 }
  		  });
    
alert(lngInnrPx);
if(hw==0){ newSize(adjustHeight());}
else{$activeClass.css('white-space','nowrap'); adjustWidth();}




//////////////////// adjust height
function adjustHeight()
{
	var cHt = $activeClass.height(); 
	var lngInnrFS = $lngInnrEl.css('font-size').replace("px","");	
	var bestFit = false;
	var cSize = lngInnrFS;

			
			while((cHt <= $lngInnrEl.height())&&(!bestFit))
			{				
				lngInnrFS--;
				$lngInnrEl.css('font-size',lngInnrFS+'px');
				if(cHt > $lngInnrEl.height())
				{
					cSize =lngInnrFS;
					bestFit=true;
					break;
				}			
			}

			while((cHt > $lngInnrEl.height())&&(!bestFit))
			{								
				lngInnrFS++;
				$lngInnrEl.css('font-size',lngInnrFS+'px');
				if(cHt < $lngInnrEl.height())
				{
					cSize =lngInnrFS;
					lngInnrFS--;				
					bestFit=true;
					break;
				}				
			}	

   return cSize;			
	
}

function adjustWidth()
{
	var cWth = $activeClass.width();	
	var idFS = lngInnrPx;
	var numWS = $lngInnrEl.html().split(/\s/).length - 1;	
	var numL = lngInnrPx - numWS;
	var wdSpace = $lngInnrEl.css('word-spacing').replace("px","");
	var ltSpace = $lngInnrEl.css('letter-spacing');
	if(ltSpace != 0){ ltSpace = ltSpace.replace("px","");}
	
	
	var	newFont = Math.floor((cWth - (numWS*wdSpace)-(numL*ltSpace))/((numL*opts.widthCompRatio)+(numWS*0.5)));
	return newFont;
}

//////////////////////////// Check if beyond set min/max
function newSize(nSize)
{

if(nSize >= opts.maxSize){
	nSize = opts.maxSize;
}
else if(nSize <= opts.minSize){
	nSize = opts.minSize
}
	$activeClass.css('font-size',nSize+'px');
	 $lngInnrEl.css('font-size',nSize+'px');


}

//////////////// fires on windows resize: throttles resize fxn to every o.8 seconds.
$(window).resize(function(){throttleRspTxt();});
var rspTBusy = false; var throttleRspTxtTimer;
function throttleRspTxt()
{if(rspTBusy){return;}
	else{clearTimeout(throttleRspTxtTimer);throttleRspTxtTimer = false;rspTBusy = true;
	throttleRspTxtTimer = setTimeout(execRspTxtResize,opts.throttleTime);}
}

function execRspTxtResize()
{rspTBusy = false;
if(hw==0){newSize(adjustHeight());}else{adjustWidth_sl();}clearTimeout(throttleRspTxtTimer);
throttleRspTxtTimer = false;
}
	  




};
    
    
