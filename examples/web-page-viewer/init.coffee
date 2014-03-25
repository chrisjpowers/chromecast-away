castAway = window.castAway = new CastAway applicationID: "517348B1", namespace: "urn:x-cast:json"

castAway.on "receivers:available", ->
  console.log "receivers available"
  castAway.requestSession (err, session) ->
    if err
      return console.log "Error getting session", err
    $("#send-message").click (e) ->
      val = $("#urls").val()
      console.log "Sending #{val}"
      $("#urls").val("")
      session.send "update", urls: val.split("\n"), (err, data) ->
        if err
          console.log "error", err

castAway.initialize (err, data) ->
  if err
    console.log "error initialized", err
  else
    console.log "initialized", data
