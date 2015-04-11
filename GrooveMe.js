(function($){

    var apiKey = "YOU_TINYSONG_API_KEY_HERE";

    function putSongsInList( songsArray, _apiKey ){

        if ( typeof Grooveshark === "undefined" ) return;

        songsArray = prompt("Paste the Song List in here:");

        songsArray = songsArray.replace(/\"|\[|\]/g,"").split(",");
        songsArray = songsArray.map(function(song){

            return song.trim();

        });

         var ajaxCalls = []; /*** <-- This is the array that will hold all of the Ajax objects ***/

        /*** For each song name, we need to fire one Ajax call to the TinySong API ***/
        songsArray.forEach(function(song){
            var url = "http://tinysong.com/b/" + song + "?format=json&key=" + apiKey;
            console.log("Pushing Song: ", url,"\n");
            ajaxCalls.push(  $.get( url )  );
        });

        $.when.apply( null, ajaxCalls )
        .then(function(){

            var SongIdList = [];
            var ajaxCallsReturned  = [].slice.apply(arguments); /*** arguments is an array of jqXHR objects returned from our Ajax calls ***/

            ajaxCallsReturned.forEach(function(data,i){
                var _songId = JSON.parse(data[0]).SongID;
                /*** If the song is found by the API, add it to our array of Song IDs ***/
                if ( _songId !== undefined ) SongIdList.push( _songId );
            });

            /*** Add our list of songs to our current playlist: http://developers.grooveshark.com/docs/js_api/#addSongsByID ***/
            window.Grooveshark.addSongsByID( SongIdList );

        }, function(){ console.log("Error..."); });

    }

    function getSongsList(){

        var songList = prompt("Enter the jQuery selector with the song list:");

        var songListArray = [];

        $(songList).each(function(index,el){

            songListArray.push( $(el).text() );

        });

        putSongsInList( songListArray, apiKey );

        console.log(songListArray);

        prompt("Copy to clipboard: Ctrl+C, Enter", songListArray);

        return songListArray;

    }

    if ( location.host.match(/grooveshark\.com/) ) {

        putSongsInList();

    } else {

        getSongsList();

    }

    /*
    putSongsInList([
        "Danny Norbury - I turn off the last light and close the door", 
        "Monolake  - Mass Transit Railway", 
        "Alva Noto - Xerrox Monophaser 1", 
        "Lee Gamble - Rufige", 
        "Laurie Spiegel - Pentachrome", 
        "Dopplereffekt - Calabi Yau Manifold", 
        "Oneohtrix Point Never - Russian Mind", 
        "Ekoclef - Here Comes Trouble"
    ], apiKey );
    */

}(jQuery));

