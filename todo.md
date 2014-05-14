fitTheTxtClss.js
=============

jQuery widget designed to make an entire group of text containers responsive.

If one textblock becomes to large to fit in it's containter, all textblocks will be reduced in font-size.
This ensures that no matter what input is recieved, the layout will remain contained and uniform.


currently the blocks can be aligned by height (multiline or single line)
and by width (single line -- using a method similar to fitText.js)

###The algorithm: 
-find the longest text block in the class.
-check if block fits
	-TRUE: check if it could fit a little more
	-FALSE: if block doesn't fit, reduce size and try again

TODO
=====
-fix width vars with new opts.params
-add width multiline functionality
-add scroll functionality.
-add max/min height/width functionality?
-test in ie6/7/8

