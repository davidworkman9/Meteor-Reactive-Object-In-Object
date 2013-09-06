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
          Meteor.call('updateWordCountByWordName', 'hey');

          
      }
  });
  Template.hello.helpers({
      JSONStructure: function (obj) {
          return JSON.stringify(obj);
      }
  });
}

if (Meteor.isServer) {

  Meteor.methods({
    updateWordCountByWordName: function (word) {
      Players.update({ "words.word": word }, { $inc: { "words.$.count":1 } });
    }
  });


  Meteor.startup(function () {
    Players.remove({});
    Players.insert({
        person: {
            name: 'George',
            age: 76
        },
        score: 5,
        words: [{word: "hey", count: 5}, {word: "there", count: 6}]
    });
  });
}
