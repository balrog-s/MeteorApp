if(Meteor.isClient){
  Template.chatBox.helpers({
    messages: function(){
      return Messages.find();
    }
  });

  Template.messagebox.events({
    'submit form': function(event){
      event.preventDefault();
      var usermessage = event.target.mesg.value;
      console.log(usermessage);
      Messages.insert({
        body: usermessage,
        sentBy: Meteor.user().username,
        createdAt: new Date()
      });
    }
  });

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
 });
}
