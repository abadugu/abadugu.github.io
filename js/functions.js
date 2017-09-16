/*
	Helper functions and polyfills

*/


// Namespace
var _app = _app || {};



/**  
 * Get window height
 * 
 * @return 	{Number} 
 */	
_app.winHeight =	window.innerHeight
					? function(){
						return window.innerHeight;
					} :
					function(){
						return document.documentElement.clientHeight;
					};
				
				
/**  
 * Get window width
 * 
 * @return 	{Number} 
 */	
_app.winWidth =	window.innerWidth
				? function(){
					return window.innerWidth;
				} :
				function(){
					return document.documentElement.clientWidth;
				};
				


/**  
 * Get width of element without padding and border 
 * 
 * @param 	{DOM element} obj 
 * @return 	{Number} 
 */				
_app.elementRealWidth =	window.getComputedStyle
						? function( obj ) {
							
							// Get padding
							var paddingLeft = parseInt( window.getComputedStyle( obj, null).paddingLeft, 10 );
							if( isNaN( paddingLeft ) ) paddingLeft = 0;
							var paddingRight = parseInt( window.getComputedStyle( obj, null).paddingRight, 10 );
							if( isNaN( paddingRight ) ) paddingRight = 0;	
							
							// Get borders
							var borderLeft = parseInt( window.getComputedStyle( obj, null).borderLeftWidth, 10 );
							if( isNaN( borderLeft ) ) borderLeft = 0;
							var borderRight = parseInt( window.getComputedStyle( obj, null).borderRightWidth, 10 );
							if( isNaN( borderRight ) ) borderRight = 0;	
							
							return obj.offsetWidth - paddingLeft - paddingRight - borderLeft - borderRight;							
						} 	
						: function ( obj ) {
							
							// Get padding
							var paddingLeft = parseInt( obj.currentStyle.paddingLeft, 10 );
							if( isNaN( paddingLeft ) ) paddingLeft = 0;
							var paddingRight = parseInt( obj.currentStyle.paddingRight, 10 );
							if( isNaN( paddingRight ) ) paddingRight = 0;	

							// Get border
							var borderLeft = parseInt( obj.currentStyle.borderLeftWidth, 10 );
							if( isNaN( borderLeft ) ) borderLeft = 0;
							var borderRight = parseInt( obj.currentStyle.borderRightWidth, 10 );
							if( isNaN( borderRight ) ) borderRight = 0;	
															
							return obj.offsetWidth - paddingLeft - paddingRight - borderLeft - borderRight;	
						};	
	


/**  
 * Get height of element without padding and border 
 * 
 * @param 	{DOM element} obj 
 * @return 	{Number} 
 */						
_app.elementRealHeight =	window.getComputedStyle
							? function( obj ) {
								
								// Get padding
								var paddingTop = parseInt( window.getComputedStyle( obj, null).paddingTop, 10 );
								if( isNaN( paddingTop ) ) paddingTop = 0;
								var paddingBottom = parseInt( window.getComputedStyle( obj, null).paddingBottom, 10 );
								if( isNaN( paddingBottom ) ) paddingBottom = 0;	
								
								// Get border
								var borderTop = parseInt( window.getComputedStyle( obj, null).borderTopWidth, 10 );
								if( isNaN( borderTop ) ) borderTop = 0;
								var borderBottom = parseInt( window.getComputedStyle( obj, null).borderBottomWidth, 10 );
								if( isNaN( borderBottom ) ) borderBottom = 0;	
								
								return obj.offsetHeight - paddingTop - paddingBottom - borderTop - borderBottom;							
							} 	
							: function ( obj ) {
							
								// Get padding
								var paddingTop = parseInt( obj.currentStyle.paddingTop, 10 );
								if( isNaN( paddingTop ) ) paddingTop = 0;
								var paddingBottom = parseInt( obj.currentStyle.paddingBottom, 10 );
								if( isNaN( paddingBottom ) ) paddingBottom = 0;	
								
								// Get border
								var borderTop = parseInt( obj.currentStyle.borderTopWidth, 10 );
								if( isNaN( borderTop ) ) borderTop = 0;
								var borderBottom = parseInt( obj.currentStyle.borderBottomWidth, 10 );
								if( isNaN( borderBottom ) ) borderBottom = 0;
								
								return obj.offsetHeight - paddingTop - paddingBottom - borderTop - borderBottom;															
							};	
						



/**  
 * Returns the top and left position relative to the document
 * 
 * @param 	{DOM element} obj 
 * @return 	{object} top and left properties 
 */							
_app.elementOffset =	function( obj ) {

							var l = t = 0;								// Set default values for left and top
							
							if( obj.offsetParent )						// if there is support for offset parent
							{
								do {									// Do
								
									l += obj.offsetLeft;				// Add the left offset
									t += obj.offsetTop;					// Add the top offset
									
								} while ( obj = obj.offsetParent )		// If there is an offset parent
							}
							
							return { left: l, top: t };					// Return object with left and top positions
						};							
						
	
						
/**  
 * Assigns event handler
 * 
 * @param 	{DOM element} obj - target of event 
 * @param	{String} type - event type
 * @param	{Function} func - event handler
 * @param	{Boolean} bubble - when set to true it bubbles
 * @return 	NULL
 */	
_app.addEvent =	document.addEventListener
			   	? function( obj, type, func, bubble ) {
			   		if( !bubble ) var bubble = false;
			   		obj.addEventListener( type, func, bubble );			   
			   	} :
			   	function( obj, type, func ) {
					obj.attachEvent( 'on' + type, func );   
				};



/**  
 * Removes event handler
 * 
 * @param 	{DOM element} obj - target of event 
 * @param	{String} type - event type
 * @param	{Function} func - event handler
 * @param	{Boolean} bubble - when set to true it bubbles
 * @return 	NULL
 */	
_app.removeEvent =	document.removeEventListener
					? function( obj, type, func, bubble ) {
						if( !bubble ) var bubble = false;	
						obj.removeEventListener( type, func, bubble );
					} :
					function( obj, type, func ) {
						obj.detachEvent( 'on' + type, func );
					};	
					
	
	
					
/**  
 * Recalculates source dimensions based on target dimensions
 * 
 * @param 	{Number} 	targetWidth - width of target
 * @param	{Number} 	targetHeight - height of target
 * @param	{Number} 	srcWidth - width of source
 * @param	{Number} 	srcHeight - height of source 
 * @param	{String} 	mode - specifies whether the sourced dimensions must be contained or cover the target ( 'cover', 'contain' )
 * @return 	{Object}	{ width, height }
 */						
_app.calculateDimensionsPerRatio =	function( targetWidth, targetHeight, srcWidth, srcHeight, mode  ) {
										if( !mode ) var mode = 'contain';												// If mode has not been specified set it to the default (contain)
										
										if( mode === 'contain' )														// If source dimensions must be contained whithin the target dimensions
											var ratio = Math.min( targetWidth / srcWidth, targetHeight / srcHeight );	// Calculate based on smaller ratio
										else																			// If source dimensions must be cover the target dimensions	
											var ratio = Math.max( targetWidth / srcWidth, targetHeight / srcHeight );	// Calculate based on higher ratio	
											
										return { width: srcWidth * ratio, height: srcHeight * ratio	};					// Return calculated dimensions		
									};					
					
					

/**  
 * Returns animation frame object (http://www.sitepoint.com/simple-animations-using-requestanimationframe/)
 * 
 * @param 	{object} 	win - window object
 * @param	{string} 	t
 * @return 	{Object}	animation frame object
 */	
_requestAnimationFrame =	function(win, t) {
	
									return win["r" + t] || win["webkitR" + t] || win["mozR" + t] || win["msR" + t] || function(fn) { setTimeout(fn, 100) };
									
								}(window, "equestAnimationFrame");


/**  
 * Cancels animation
 * 
 * @return 	{Object}	animation cancel request object
 */	
_cancelAnimationFrame =	(function(){
								return window.cancelAnimationFrame          	||
								    window.webkitCancelRequestAnimationFrame    ||
								    window.mozCancelRequestAnimationFrame       ||
								    window.oCancelRequestAnimationFrame     	||
								    window.msCancelRequestAnimationFrame        ||
								    clearTimeout;	
							})();					
					
								