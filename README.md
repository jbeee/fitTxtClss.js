fitTxtClss.js
=============
### responsive, uniform blocks of text
A widget inspired by fitText.js designed to make an entire group of text containers responsive.
- see the demo: http://jbee.io/demos/fitTxtClss/


If one textblock becomes to large to fit in it's containter, all textblocks will be reduced in font-size.
This ensures that no matter what input is recieved, the layout will remain contained and uniform.


throttled to prevent slowing down the page. default throttleTime: 500


currently the blocks can be aligned by height (multiline or single line)
and by width (single line -- using a method similar to fitText.js)


###the algorithm: 
		find the largest element in the class (whether by height or string length).
		check if block fits
			TRUE: check if it could fit a little more (flag to prevent infinite loop)
			FALSE: reduce size and try again  (flag to prevent infinite loop)

TODO
=====
	-fix width vars with new opts.params
	-add width multiline functionality
	-add scroll functionality.
	-add max/min height/width functionality? (user-defined or derived from min/max font size?)
	-test in ie6/7/8
	-make seperate stylesheet.

