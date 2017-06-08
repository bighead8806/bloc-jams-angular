(function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        /**
         *@desc variable currentSong set to null
        //@type {Object}
        */
        SongPlayer.currentSong = null;
         
        var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
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
    */
  
           var playSong = function(song) {
                currentBuzzObject.play();
                song.playing = true;
            };
        
        /**
        *@function SongPLayer.play
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
         
          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         
          return SongPlayer;
         
        }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();