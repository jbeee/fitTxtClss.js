/*
 fitTxtClss.js 
 From http://jbee.io/demos/fitTxtClss/ 
 Copyright (c) 2013 ICRL 
*/
/*
 fitTxtClss.js 
 From http://jbee.io/demos/fitTxtClss  
 Copyright (c) 2013 ICRL 
*/

$.fn.fitTxtClss = function(options){ //$activeClass.hw,minF,maxF,fbScrll,innrEl,compR
 var defaults = {
      resizeBy: 0,          //// 0 == height, 1 == widthSL, 2 == widthML;   
      //widthCompRatio: 1.5,  //// from fitText algorithm, decided not to use it, but might be handy one day 
      innerTag:false,       //// false if none, else tag name: li,p,span etc.
      minSize:10,			//// can be in the form 10 or 10px, but can only be done with pixels
      maxSize:100,		  	//// 			theres no jQuery support for rems/ems/% unfortunately
      throttleTime: 500,  //// how often is resize aknowledged
      addScroll:false     //// false = doesn't add scroll, 500 == adds scroll when parent el is smaller than 500 px   
    };

    var aClass = this; 
    aClass.opts = $.extend(defaults, options);
    aClass.opts.addScroll = cleanDimsString(aClass.opts.addScroll);  
    aClass.opts.maxSize = cleanDimsString(aClass.opts.maxSize); 
    aClass.opts.minSize = cleanDimsString(aClass.opts.minSize);  

    aClass.lngInnrEl;
	aClass.defaultWrap = $(aClass).css('white-space');
	aClass.lngInnrPx = 0;
	aClass.init = function()	///// get the longest/widest element of the group, and get its pixel length
	{
		var nEl; var nPx;
		
		$(aClass).each(function(){ 
	 	if(aClass.opts.innerTag == false){nEl=this}else{nEl = $(aClass).find(aClass.opts.innerTag);}   
			 if(aClass.opts.resizeBy==0){
				  nPx = $(nEl).height();
				 if( nPx > aClass.lngInnrPx)
				 	{	 
				 		aClass.lngInnrEl = nEl;
				 		aClass.lngInnrPx = nPx;
				 	}  
			 }
			 else
			 {
				nPx = $(nEl).html().length;
				if(nPx > aClass.lngInnrPx)
					{
					 aClass.lngInnrEl = nEl; 
					 aClass.lngInnrPx = nPx;  //// has char num rather than width for horizontal
					}				 
			 }
  		  });

		if(aClass.opts.resizeBy ==1)
		{
			var totalWidth = $(aClass.lngInnrEl).width();		
			var numWhiteSpace = $(aClass.lngInnrEl).html().split(/\s/).length - 1;	  ///returns # of all whitespace chars
			var wordSpace = cleanDimsString($(aClass.lngInnrEl).css('word-spacing'));  ///returns wordsSpacing
			var letterSpace = cleanDimsString($(aClass.lngInnrEl).css('letter-spacing')); ///returns letterSpacing	
			var currentFontSize = cleanDimsString($(aClass.lngInnrEl).css('font-size'));

			aClass.letterWidthRatio = (totalWidth/aClass.lngInnrPx)/currentFontSize;
				
		

			//var numL = aClass.lngInnrPx - numWS; 
			//var idFS = aClass.lngInnrPx;	
			//var numL =  aClass.lngInnrPx - numWS;
		}
		

	} 

		

aClass.byHeight = function()
{
	var cHt = $(aClass).height(); 
	var lngInnrFS = $(aClass.lngInnrEl).css('font-size').replace("px","");	
	var bestFit = false;
	var cSize = lngInnrFS;
			
			while(((cHt-10) <= $(aClass.lngInnrEl).height())&&(!bestFit))
			{				
				lngInnrFS--;
				$(aClass.lngInnrEl).css('font-size',lngInnrFS+'px');
				if(cHt > $(aClass.lngInnrEl).height())
				{
					cSize=lngInnrFS;
					bestFit=true;
					break;
				}			
			}

			while((cHt > $(aClass.lngInnrEl).height())&&(!bestFit))
			{								
				lngInnrFS++;
				$(aClass.lngInnrEl).css('font-size',lngInnrFS+'px');
				if((cHt-10) < ($(aClass.lngInnrEl).height()))
				{					
					lngInnrFS--;
					cSize =lngInnrFS;				
					bestFit=true;
					break;
				}				
			}	

   return cSize;			
	
}

////////////////////////////// Adjusts font size of single line based on width
aClass.byWidthSL = function() 
{
	var cWidth = $(aClass).width()-10; 
	var lngInnrFS = $(aClass.lngInnrEl).css('font-size').replace("px","");	
	var bestFit = false;
	var cSize = lngInnrFS;
			
			while((cWidth <= $(aClass.lngInnrEl).width())&&(!bestFit))
			{				
				lngInnrFS--;
				$(aClass.lngInnrEl).css('font-size',lngInnrFS+'px');
				if(cWidth> $(aClass.lngInnrEl).width())
				{
					cSize=lngInnrFS;
					bestFit=true;
					break;
				}			
			}

			while((cWidth > $(aClass.lngInnrEl).width())&&(!bestFit))
			{								
				lngInnrFS++;
				$(aClass.lngInnrEl).css('font-size',lngInnrFS+'px');
				if(cWidth < ($(aClass.lngInnrEl).width()))
				{					
					lngInnrFS--;
					cSize =lngInnrFS;				
					bestFit=true;
					break;
				}				
			}
	//return Math.floor((cWth - (numWS*wdSpace)-(numL*ltSpace))/((numL*aClass.opts.widthCompRatio)+(numWS*0.5)));
}

////////////////////////////// Adjusts font size of multiple lines based on width
aClass.byWidthML =  function() 
{
	
}



aClass.newFontSize = function()
	{
	  var nSize = aClass.opts.maxSize;	
	  switch(aClass.opts.resizeBy)
 	   {
 	 	case 0:
 	 		nSize = aClass.byHeight();
 	 	break;
 	 	case 1:
 	 		$(aClass).css('white-space','nowrap');
 	 		nSize = aClass.byWidthSL();
 	 	break;
 	 	case 2:
 	 		//return aClass.byWidthML();
 	 	break;
 	 	}

 	 	////// check if mins/maxs haven't been exceeded
	 	if(nSize >= aClass.opts.maxSize)
	 	 {
			nSize = aClass.opts.maxSize;
		 }
		else if(nSize <= aClass.opts.minSize)
		 {
			nSize = aClass.opts.minSize
		 }

		$(aClass).css('font-size', nSize+'px');
		$(aClass.lngInnrEl).css('font-size',nSize+'px');  /// since its the testing element, it should be reset
 	} 


 	aClass.rspTBusy = false; 
	aClass.throttlefitTxtClssTimer;
	//////////////// fires on windows resize: throttles resize fxn to every $activeClass.opts.throttleTime milliseconds
	$(window).resize(function(){throttlefitTxtClss();});
	function throttlefitTxtClss()
	{
		if(aClass.rspTBusy){return;}
	else{clearTimeout(aClass.throttlefitTxtClssTimer); aClass.throttlefitTxtClssTimer = false; aClass.rspTBusy = true;
	aClass.throttlefitTxtClssTimer = setTimeout(execfitTxtClssResize,aClass.opts.throttleTime);}
}

	function execfitTxtClssResize()
	{
		aClass.rspTBusy = false;
			console.log('resize! '+ aClass.opts.resizeBy);
		aClass.newFontSize();
		clearTimeout(aClass.throttlefitTxtClssTimer);
		aClass.throttlefitTxtClssTimer = false;
	}
		  	 



	function cleanDimsString(val)
	{
		if(!val){return false};
		
		if(isNaN(val))
			{
				val = parseInt(val.replace("px",""));
			}
		return val;
	}



	///lets go!
	aClass.init();
	aClass.newFontSize();

};
    
    
