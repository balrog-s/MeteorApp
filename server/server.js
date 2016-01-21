if(Meteor.isServer){
  if(Messages.find({}).count() === 0){
    Messages.insert({
      body: 'Welcome to MeteorChat',
      sentBy: 'System',
      createdAt: new Date()
    });
  }
}
