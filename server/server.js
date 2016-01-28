if(Meteor.isServer){
  //Empty Messages collection adds a system message to the collection
  if(Messages.find({}).count() === 0){
    Messages.insert({
      body: 'Welcome to 9Tails!',
      sentBy: 'System',
      createdAt: new Date(),
      lat: 0,
      longi: 0
    });
  }

}
