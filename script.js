$(function() {

  var img = $("#croppee");

  var theImage = new Image();
  theImage.src = img.attr('src');

  var trueWidth = theImage.width;
  var trueHeight = theImage.height;

  var jcrop_api;

  $('#w').attr( 'max', trueWidth );
  $('#h').attr( 'max', trueHeight );

  $('#croppee').Jcrop({
    onChange: updateHiddenCoords,
    onSelect: updateCoords,
    bgColor: 'black',
    bgOpacity: .4,
    trueSize: [trueWidth,trueHeight]
  }, function() {
    jcrop_api = this;
  });

  function updateCoords(c) {
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
  };

  function updateHiddenCoords(c) {
    $('#x').val(c.x);
    $('#y').val(c.y);
  };

  var xdifference = 0, ydifference = 0, xcoord = 0, x2coord = 0, ycoord = 0, y2coord = 0;

  $('#w').on( 'keyup, keydown, blur, change', function() {

    var hasValue = $.trim(this.value).length;

    xdifference = trueWidth - $(this).val();
    xcoord = parseInt(xdifference, 10) / 2;
    x2coord = parseInt($(this).val(), 10) + xcoord;

    if ( !hasValue ) { xcoord = 0; x2coord = 0; }

    jcrop_api.animateTo([ xcoord, ycoord, x2coord, y2coord ]);

  });

  $('#h').on( 'keyup, keydown, blur, change', function() {

    var hasValue = $.trim(this.value).length;

    ydifference = trueHeight - $(this).val();
    ycoord = parseInt(ydifference, 10) / 2;
    y2coord = parseInt($(this).val(), 10) + ycoord;

    if ( !hasValue ) { ycoord = 0; y2coord = 0; }

    jcrop_api.animateTo([ xcoord, ycoord, x2coord, y2coord ]);

  });

});