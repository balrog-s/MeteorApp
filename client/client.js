
if(Meteor.isClient){

  //reactive variable for determining whether chat is open or not. Initialized to a closed chat.
  Session.set('isChatOpen', false);
  //when the ctrl key is clicked the chat will open
  Meteor.startup(function () {
      GoogleMaps.load();
      $('#chat').hide();
      $(document).on('keyup', function (e) {
      if(e.keyCode === 17){
        Session.set('isChatOpen', !Session.get('isChatOpen'));
        if(Session.get('isChatOpen') == true){
          $('#chat').show();
        }else{
          $('#chat').hide();
        }
      }
    });
  });

  Template.map.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(43, -79),
          zoom: 7
        };
      }
    }
  });

  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      Messages.find().observe({
        added: function(){
          Messages.find().forEach(function(loc){
            console.log(loc.latitude + " "+ loc.longitude);
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(loc.latitude, loc.longitude),
              animation: google.maps.Animation.DROP,
              map: map.instance,
              title: loc.sentBy
            });
          });
        }
      })
    });
  });

  //finds all the messages in the Collection and sorts them by the most recent message going to the top
  Template.chatBox.helpers({
    messages: function(){
      return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.helpers({
    checkChat: function(){
      return Session.get('isChatOpen');
    }
  });


  Template.messagebox.helpers({
    geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
    }
  });



  //this event will be the chatbox available for users of the website
  Template.messagebox.events({
    'submit .messageContent': function(event){
      //prevent default browser action on submit
      event.preventDefault();
      var usermessage = event.target.mesg.value;

      if(usermessage.length != 0){
      //inserting the message specified into the Messages Collection

      Messages.insert({
        body: usermessage,
        sentBy: Meteor.user().username,
        createdAt: new Date(),
        latitude: Geolocation.latLng().lat,
        longitude: Geolocation.latLng().lng
      });
            //reset the value in the messagebox
      event.target.mesg.value="";

    }else{
      alert("Say something..I'm giving up on you..");
    }
    }
  });


  //allows users to login without having to use an email
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
