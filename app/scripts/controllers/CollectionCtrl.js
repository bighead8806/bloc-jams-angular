 (function() {
     function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 12; i++) {
        this.albums = Fixtures.getCollection(12);
     }
 }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();