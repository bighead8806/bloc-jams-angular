(function() {
     function SongPlayer() {
        var SongPlayer = {};
        
        /**
         *@desc variable currentSong set to null
        //@type {Object}
        */
        var currentSong = null;
         
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
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
            if(currentSong !== song){
                setSong(song);
                playSong(song);

           }else if(currentSong === song){
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
            currentBuzzObject.pause();
            song.playing = false;
        };
         
          return SongPlayer;
         
        }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();