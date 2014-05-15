fitTxtClss.js
=============
### responsive, uniform blocks of text
A widget inspired by fitText.js designed to make an entire group of text containers responsive.
- see the demo: http://jbee.io/demos/fitTxtClss/


Determines optimal size for text so that font-size is as large as possible without overflowing its parent container.
throttled to prevent slowing down the page. default - throttleTime: 500
allows input of minimum and maximum font-size. default - minSize:10, maxSize:100


currently the blocks can be aligned by height (multiline or single line)
and by width (single line -- using a method similar to fitText.js)


###the algorithm: 
		find the largest element in the class (whether by height or string length).
		check if block fits
			TRUE: check if it could fit a little more (flag to prevent infinite loop)
			FALSE: reduce size and try again  (flag to prevent infinite loop)

TODO
=====
	- fix width vars with new opts.params
	- add width multiline functionality
	- add scroll functionality.
	- add max/min height/width functionality? (user-defined or derived from min/max font size?)
	- test in ie6/7/8
	- make seperate stylesheet.

