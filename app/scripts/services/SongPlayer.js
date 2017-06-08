(function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        /**
         *@desc variable currentSong set to null
        //@type {Object}
        */
        SongPlayer.currentSong = null;
         
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
         
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
         
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
         
            /**
    *@function playSong
    *@desc Starts playing a song
    *@param {Object} song
    */
  
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
    
    /**
    *@function stopSong
    *@dec Stops playing a song
    *@param {Object} song
    */
    
        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        };
         
       /**
       *@function getSongIndex
       *@desc returns index of current album's song list. Will be used for next and previous buttons.
       */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };  
         
        /**
        *@function SongPlayer.play
        *@desc checks if current song is the same as the song passed to the function and if it is not it starts to playing the new song. If it is equal then it pauses currently playing song and begins playing passed song. 
        *@param {Object}song
        */ 
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);

           }else if(SongPlayer.currentSong === song){
                 if(currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
            
        };
         /**
         *@function SongPlayer.pause(song)
         *@desc pause the currently playing song 
         *@param {Object} song
         *@return songPlayer
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
         
         /**
          *@function SongPlayer.previous
          *@desc Play previous song. If currentSongIndex is less than zero, just stop the song. If it is greater than zero  play the previous song. 
          */
         
          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         
         /**
         *@function SongPlayer.next
         *@desc Play the next song in the index
         */
         
            SongPlayer.next = function(){
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex++;
                
                if (currentSongIndex > currentAlbum.length) {
                    stopSong(SongPlayer.currentSong);
                } 
                else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
            }
                return SongPlayer;
         
        }
    
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();