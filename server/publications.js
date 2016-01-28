Meteor.publish('messages', function(){
  return Messages.find();
});
Meteor.publish('geolocation', function(){
  return GLocation.find();
});
