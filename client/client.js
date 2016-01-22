if(Meteor.isClient){
  //finds all the messages in the Collection and sorts them by the most recent message going to the top
  Template.chatBox.helpers({
    messages: function(){
      return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

  //this event will be the chatbox available for users of the website
  Template.messagebox.events({
    'submit .messageContent': function(event){
      //prevent default browser action on submit
      event.preventDefault();
      var usermessage = event.target.mesg.value;

      //inserting the message specified into the Messages Collection
      Messages.insert({
        body: usermessage,
        sentBy: Meteor.user().username,
        createdAt: new Date()
      });

      //reset the value in the messagebox
      event.target.mesg.value="";
    }
  });

  //allows users to login without having to use an email
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
