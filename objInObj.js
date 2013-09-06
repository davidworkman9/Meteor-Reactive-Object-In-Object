Players = new Meteor.Collection('players');
if (Meteor.isClient) {
  Template.hello.player = function () {
    return Players.findOne();
  };
  Template.hello.events({
      'click #changeAge': function () {
          var newAge = $('#age').val();
          var set = {};
          set["person.age"] = newAge;
          var playerID = Players.findOne()._id;
          Players.update({_id: playerID}, {$set: set});
      }
  });
  Template.hello.helpers({
      JSONStructure: function (obj) {
          return JSON.stringify(obj);
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Players.remove({});
    Players.insert({
        person: {
            name: 'George',
            age: 76
        },
        score: 5
    });
  });
}
