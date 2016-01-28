

if(Meteor.isClient){

  //reactive variable for determining whether chat is open or not. Initialized to a closed chat.
  Session.set('isChatOpen', false);
  Session.set('coordinates');
  //when the ctrl key is clicked the chat will open
  Meteor.startup(function () {
      $(document).on('keyup', function (e) {
      if(e.keyCode === 17){
        Session.set('isChatOpen', !Session.get('isChatOpen'));
      }
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
      Session.set('coordinates', Geolocation.latLng());
      return Session.get('isChatOpen');
    }
  });

  Template.location.helpers({
    geolocation: function(){
      return GLocation.find({});
    }
  })

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
      var findLat = Session.get('coordinates').lat;
      var findLongi = Session.get('coordinates').lng;

      if(usermessage.length != 0){
      //inserting the message specified into the Messages Collection
      Messages.insert({
        body: usermessage,
        sentBy: Meteor.user().username,
        createdAt: new Date(),
      });
      GLocation.insert({
        lat: findLat,
        longi: findLongi
      });
      console.log(GLocation.find({}));
    }

      //reset the value in the messagebox
      event.target.mesg.value="";
    }
  });


  //allows users to login without having to use an email
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
