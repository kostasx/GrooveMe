(function($){

    var apiKey         = "YOUR_TINYSONG_API_KEY_HERE";
    var songsListArray = [];

    /**
     * Inject songs from retrieved song list into our Grooveshark.com page
     * @param  {Array}   
     * @return {Boolean} 
     */
    function putSongsInList( songsArray ){

        if ( typeof Grooveshark === "undefined" ) return;

        songsArray = prompt("Paste the Song List in here:");
        songsArray = rxCleanSongTextList(songsArray);


         var ajaxCalls = []; /*** <-- This is the array that will hold all of the Ajax objects ***/

        /*** For each song name, we need to fire one Ajax call to the TinySong API ***/
        songsArray.forEach(function(song){
            var url = "http://tinysong.com/b/" + encodeURI(song) + "?format=json&key=" + apiKey;
            console.log("Pushing Song: ", url,"\n");
            ajaxCalls.push(  $.get( url )  );
        });

        $.when.apply( null, ajaxCalls )
        .then(function(){

            var SongIdList        = [];
            var songsImported     = [];
            var songsRejected     = [];
            var ajaxCallsReturned = [].slice.apply(arguments); /*** arguments is an array of jqXHR objects returned from our Ajax calls ***/

            console.log( "ajaxCallsReturned", ajaxCallsReturned );

            ajaxCallsReturned.forEach(function(data,i){
                var _data   = JSON.parse(data[0]);
                var _songId = _data.SongID;

                /*** If the song is found by the API, add it to our array of Song IDs ***/
                if ( _songId !== undefined ) { 
                  SongIdList.push( _songId );
                  songsImported.push( _data.ArtistName + " - " +_data.SongName );
                } else {
                  songsRejected.push( _songId );
                }
            });

            /*** Add our list of songs to our current playlist: http://developers.grooveshark.com/docs/js_api/#addSongsByID ***/
            window.Grooveshark.addSongsByID( SongIdList );
            console.log( "#" + songsArray.length + " inputted.\n#" + SongIdList.length + " songs found and imported.\n#" + songsRejected.length + " songs were not found/imported.");
            console.log( "Songs Imported:\n", songsImported );

            return true;

        }, function(){ console.log("Error..."); });

    }

    /**
     * Scrape a page for song lists using jQuery Selectors
     * @return {String} The Song List in Plain Text 
     */
    function getSongsList(){

        var songList          = prompt("Enter the jQuery selector with the song list:");
        var songListArray     = []; /*** FOR FUTURE USE ***/
        var songListPlainText = "";

        var numOfSongsFound = $(songList).length;

        $(songList).each(function(index,el){

            var _song = $(el).text()
                _song = rxReplaceHashes(_song);

            songListArray.push( _song );
            songListPlainText += _song;
            if ( index < $(songList).length - 1 ) songListPlainText += "\r\n";

        });

        /* prompt("Copy to clipboard: Ctrl+C, Enter", songListArray); */
        prompt( "#" + numOfSongsFound + " songs found. Copy to clipboard: Ctrl+C, Enter", songListPlainText);
        return songListPlainText;

    }

    /**
     * Creates an Array of songs from an input String text
     * @param  {String}   
     * @return {Array} 
     */
    function rxCleanSongTextList(songlist){

        /*** songlist = songlist.replace(/\"|\[|\]/g,"").split(","); ***/
        songlist = songlist.replace( /\r?\n|\r/g , "," ).split(",");
        songlist = songlist.map(function(song){
            return song.trim();
        });

        return songlist;

    }

    /**
     * Replace hashes with 'No.' from String
     * @param {String} Input String which might contain hashes
     * @return {String} Input String with hashes replaced with 'No.' strings
     */
     function rxReplaceHashes(s){
      return s.replace("#","No.");
     }

    /**
     * Remove text inside parentheses from String
     * @param {String} Input String which might contain text inside parentheses
     * @return {String} Input String with removed text inside parentheses removed
     */
    function rxRemoveParentheses(s){

      var match = s.match(/\(.*\)/);

      if ( match !== null ) {
        s = s.replace(match,"");
      }

      return s;

    }

    /**
     * Remove double spaces from String
     * @param {String} Input String which might contain double spaces
     * @return {String} Input String with removed double spaces 
     */
    function rxRemoveDoubleSpaces(s){

      return s.replace( "  ", " " );

    }

    /**
     * Get Artist name from IMDB Soundtrack page
     * @param {String} 
     * @return {String}  
     */
    function rxGetArtistName(s){

      var match = s.match(/by(.*)/);

      if ( match !== null ){

        s = match[1].trim();
        /* console.log("match[1].trim() ",match[1].trim()); */

      } 

      return s;

    }

    /**
     * Parse IDMB elements list and produce an array of song+artist pair elements.
     * @param {}
     * @return {}  
     */
    function parseIMDBList( index, el ){

          var songName   = "";
          var songArtist = "";
          var performed  = jQuery(el)
            .text()
            .toLowerCase()
            .replace(/\r?\n|\n/gm,"|")
            .split("|");

            var _i = performed.reIndexOf(/performed/);

            songName = performed[0];

            if ( _i > -1 ){

              songArtist = performed[_i];   /* WE'VE GOT AN ENTRY! */

            } else {  /* We need the composer... */

              _i = performed.reIndexOf(/composed/);

              if ( _i > -1 ) {

                songArtist = performed[_i];

              } else { /* Look for something else? 'Written' by? */

                _i = performed.reIndexOf(/written/);

                if ( _i > -1 ) {

                  songArtist = performed[_i];

                } 

              }

            }

            songArtist = rxRemoveParentheses(songArtist);
            songArtist = rxRemoveDoubleSpaces(songArtist);
            songArtist = rxGetArtistName(songArtist);

            songsListArray.push({ songName : songName, songArtist: songArtist });

    }

    /**
     * 
     * @return {}  
     */
    function getSongsListFromIMDB(){

        /*** 
        Description: Helper function that searchs for String inside Array elements using Regular Expressions 
        Author:      Ryan Mueller
        Twitter:     @CreativeNotice
        Source:      http://creativenotice.com/2013/07/regular-expression-in-array-indexof/#comment-55460 
        ***/
        if (typeof Array.prototype.reIndexOf === 'undefined') {  
            Array.prototype.reIndexOf = function (rx) {  for (var i in this) {  if (this[i].toString().match(rx)) return i;  }  return -1;  };
        }

        var $soundtracksContent = jQuery("#soundtracks_content");

        var songsCount = $soundtracksContent.find(".header .nav .desc").text();
            songsCount = songsCount.match(/\d+/);

        console.log("Found " + songsCount + " songs on this list.");

        $soundtracksContent.find(".list").children().each(parseIMDBList);

        /* console.log(songsListArray); */

        var _songsListPlainText = [];
        songsListArray.forEach(function(song, index){
          _songsListPlainText += song.songArtist + " - " + song.songName;
          if ( index < songsListArray.length - 1 ) _songsListPlainText += "\r\n";
        });

        /* prompt("Copy to clipboard: Ctrl+C, Enter", songListArray); */
        prompt( "#" + songsListArray.length + " songs found. Copy to clipboard: Ctrl+C, Enter", _songsListPlainText );

    }

    /**
     * Our initialization function
     * @return {Array} 
     */
    function init(){

        /*** INJECT SONG LIST INTO GROOVESHARK.COM ***/
        if ( location.host.match(/grooveshark\.com/) ) {

            putSongsInList();
            return "GrooveShark.com";

        }

        /*** GET SONG LIST FROM IMDB.COM SOUNDTRACK PAGE ***/
        if ( location.host.indexOf("imdb.com") > -1 ){

            var _isSoundtrackPage = location.pathname.split("/");

            if ( _isSoundtrackPage[_isSoundtrackPage.length-1] === "soundtrack" ){

                getSongsListFromIMDB();
                return "IMDB.com";

            } else {

                alert("Error: Sorry, not an IMDB Soundtrack page!");
                return false;

            }

        } 

        /*** SCRAPE SONG LIST VIA JQUERY SELECTORS ***/
        getSongsList();


    }

    init();

}(jQuery));

