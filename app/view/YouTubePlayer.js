Ext.define('Desafio.view.YouTubePlayer', {
 extend: 'Ext.Component',
 alias: 'widget.YouTubePlayer',

 config: {
  url: 'http://www.youtube.com/v/',
  videoId: '',
  vWidth: 420,
  vHeight: 315,
  autoPlay: 0,
  autoHide: 1,
  loop: 0,
  modestBranding: 1,
  start: 0
 },

 onPlayerApiChange: function() {
  this.fireEvent('playerapichange',this,arguments);
 },

 onPlayerError: function() {
  this.fireEvent('playererror',this,arguments);
 },

 onPlayerPlaybackQualityChange: function() {
  this.fireEvent('playbackqualitychange',this,arguments);
 },

 onPlayerReady: function() {
  this.fireEvent('playerready',this,arguments);
 },

 onPlayerStateChange: function() {
  this.fireEvent('statechange',this,arguments);
 },

 initialize: function() {
  this.callParent(arguments);

  var me = this;

  window.onYouTubeIframeAPIReady = function() {
   me.player = new YT.Player(me.element.id, {
    height: me.getVHeight(),
    width:  me.getVWidth(),
    videoId: me.getVideoId(),
    playerVars: {
     autohide: me.getAutoHide(),
     autoplay: me.getAutoPlay(),
     loop: me.getLoop(),
     modestbranding: me.getModestBranding(),
     start: me.getStart()
    },
    events: {
     onApiChange : Ext.Function.bind(me.onPlayerApiChange,me),
     onError: Ext.Function.bind(me.onPlayerError, me),
     onPlaybackQualityChange: Ext.Function.bind(me.onPlayerPlaybackQualityChange,me),
     onReady: Ext.Function.bind(me.onPlayerReady,me),
     onStateChange: Ext.Function.bind(me.onPlayerStateChange, me)
    }
   });
   me.fireEvent('youtubeiframeapiready',arguments);
  }

  // load api if necessary
  if (typeof YT == 'undefined'){ 
   var tag = document.createElement('script');
   tag.src = "//www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
 },

 stop: function() {
  this.player.stopVideo();
 },

 play: function() {
  this.player.playVideo();
 },

 pause: function() {
  this.player.pauseVideo();
 },

 loadVideoById: function(videoId, startSeconds, endSeconds, suggestedQuality) {
  this.player.loadVideoById({
    videoId: videoId,
    startSeconds: startSeconds,
    endSeconds: endSeconds,
    suggestedQuality: suggestedQuality
   });
  }
});