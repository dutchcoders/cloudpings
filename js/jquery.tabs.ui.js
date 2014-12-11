


$(document).ready(function() {

	// The "tab widgets" to handle.
    var tabs = $('#tab'),
    
    // This selector will be reused when selecting actual tab widget A elements.
    tab_a_selector = 'ul.ui-tabs-nav a';

    tabs.tabs({ event: 'change' });
    
    // Define our own click handler for the tabs, overriding the default.
    tabs.find( tab_a_selector ).click(function(){
    var state = {},
      // Get the id of this tab widget.
      id = $(this).closest( '.tabs' ).attr( 'id' ),
      // Get the index of this tab.
      idx = $(this).parent().prevAll().length;
    // Set the state!
    state[ id ] = idx;
    $.bbq.pushState( state );
  });
  
  // Bind an event to window.onhashchange that, when the history state changes,
  // iterates over all tab widgets, changing the current tab as necessary.
    $(window).bind( 'hashchange', function(e) {
    
    // Iterate over all tab widgets.
    tabs.each(function(){
        var idx = $.bbq.getState( this.id, true ) || 0;
        $(this).find( tab_a_selector ).eq( idx ).triggerHandler( 'change' );
    });
  });
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
  $(window).trigger( 'hashchange' );
  
  $('#tab').show();
  
});