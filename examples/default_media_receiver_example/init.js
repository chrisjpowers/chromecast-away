// Generated by CoffeeScript 1.7.1
(function() {
  var attachControls, castAway;

  castAway = new CastAway();

  castAway.on('receivers:available', function() {
    console.log('receivers available, safe to request a session');
    $('.music .cast').click(function(ev) {
      return castAway.requestSession({
        success: function(session) {
          var config;
          config = {
            url: 'https://s3.amazonaws.com/roysfunfun/ghostbuster_ringtone.mp3',
            contentType: 'audio/mpeg',
            albumName: 'Album name',
            albumArtist: 'Album artist',
            artist: 'Music artist',
            composer: 'Composer',
            images: ["http://www.biography.com/imported/images/Biography/Images/Profiles/S/Will-Smith-9542165-1-402.jpg"]
          };
          return session.music(config, {
            success: function(controls) {
              return attachControls($('.music'), session, controls);
            }
          });
        }
      });
    });
    $('.tv_show .cast').click(function(ev) {
      return castAway.requestSession({
        success: function(session) {
          var config;
          config = {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/ED_1280.mp4',
            title: 'Elephant Dream',
            seriesTitle: 'TV show name here',
            images: ['http://img1.wikia.nocookie.net/__cb20130823094044/disney/images/a/a2/Will-smith-image3.jpg'],
            contentType: 'video/mp4'
          };
          return session.tvShow(config, {
            success: function(controls) {
              return attachControls($('.tv_show'), session, controls);
            }
          });
        }
      });
    });
    $('.movie .cast').click(function(ev) {
      return castAway.requestSession({
        success: function(session) {
          var config;
          config = {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/tears_of_steel_1080p.mov',
            title: 'Tears of Steel',
            images: ['http://img1.wikia.nocookie.net/__cb20130823094044/disney/images/a/a2/Will-smith-image3.jpg'],
            subtitle: 'subtitle',
            studio: 'By Blender Foundation',
            releaseYear: '2006',
            contentType: 'video/mp4'
          };
          return session.movie(config, {
            success: function(controls) {
              return attachControls($('.movie'), session, controls);
            }
          });
        }
      });
    });
    return $('.photo .cast').click(function(ev) {
      return castAway.requestSession({
        success: function(session) {
          var config;
          config = {
            url: 'http://www.videws.com/eureka/castv2/images/San_Francisco_Fog.jpg',
            title: 'San Francisco Fog',
            contentType: 'image/jpg',
            artist: 'Photo artist',
            location: 'San Francisco',
            longitude: 37.7833,
            latitude: 122.4167,
            width: 1728,
            height: 1152,
            creationDateTime: '1999'
          };
          return session.photo(config, {
            success: function(controls) {
              return attachControls($('.photo'), session, controls);
            }
          });
        }
      });
    });
  });

  castAway.on('receivers:unavailable', function() {
    return console.log('no receivers found');
  });

  castAway.on('existingMediaFound', function(session, controls) {
    console.log('found existing media session');
    $('.pause').click(function(ev) {
      return controls.pause();
    });
    $('.play').click(function(ev) {
      return controls.play();
    });
    $('.stop').click(function(ev) {
      return controls.stop();
    });
    return $('.release').click(function(ev) {
      return session.release();
    });
  });

  castAway.initialize({
    success: function(data) {
      return console.log('successfully initialized');
    },
    error: function(data) {
      return console.log('unsuccessfully initialized');
    }
  });

  attachControls = function($el, session, controls) {
    $('.pause', $el).click(function(ev) {
      return controls.pause();
    });
    $('.play', $el).click(function(ev) {
      return controls.play();
    });
    $('.stop', $el).click(function(ev) {
      return controls.stop();
    });
    $('.release', $el).click(function(ev) {
      return session.release();
    });
    session.on('pause', function() {
      return console.log('paused');
    });
    session.on('play', function() {
      return console.log('playing');
    });
    session.on('stop', function() {
      return console.log('stopped');
    });
    session.on('seek', function() {
      return console.log('seeking');
    });
    session.on('error', function() {
      return console.log('errored');
    });
    session.on('idle', function() {
      return console.log('idle');
    });
    return session.on('load', function() {
      return console.log('loading');
    });
  };

}).call(this);
