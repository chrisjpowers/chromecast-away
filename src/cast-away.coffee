EventEmitter = require('./event_emitter')
Session = require('./session')
MediaControls = require('./media_controls')

class CastAway extends EventEmitter
  constructor: ({@applicationID, @namespace} = {}) ->
    throw "chrome.cast namespace not found" unless chrome.cast
    @cast = chrome.cast

  initialize: (@callbacks) ->
    window['__onGCastApiAvailable'] = (loaded, errorInfo) =>
      if loaded
        app = @applicationID || @cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID

        sessionRequest = new @cast.SessionRequest(app)
        apiConfig = new @cast.ApiConfig sessionRequest,
          (data...) => @sessionListener(data...),
          (data...) => @receiverListener(data...)

        success = (args...) => callbacks.success?(args...)
        error = (args...) => callbacks.error?(args...)

        @cast.initialize(apiConfig, success, error)

  sessionListener: (session) ->
    if session.media.length != 0
      @currentSession = session
      @emit 'existingMediaFound',
        new Session(@currentSession),
        new MediaControls(@currentSession.media[0])
      session.addUpdateListener(@sessionUpdateListener)

  receiverListener: (receiver) ->
    available = @cast.ReceiverAvailability.AVAILABLE
    state = if receiver == available then 'available' else 'unavailable'
    @emit "receivers:#{state}"

  sessionUpdateListener: (isAlive) ->
    unless isAlive
      @currentSession = null

  requestSession: (callbacks) ->
    @cast.requestSession \
      (session) -> callbacks.success?(new Session(session)),
      (args...) -> callbacks.error?([args...])

window.CastAway = CastAway
