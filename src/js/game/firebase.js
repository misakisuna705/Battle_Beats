/***********************document***********************************************/
// !!!I already initialize a instance for you,and that instance is leader_board!!!!
//(1)function push_score(song,mode):This function is used to push current player's score to database.
//                                  It will return a promise so that you can add then(....) or catch(.....)
//                                  behind this function as you desired.
//                                  e.g. leader_board.push_score("only my railgun","easy",1212121).then(()=>{
//                                             console.log('push succeess');
//                                       });
//
//(2)function get_scores(song,mode,num=5):This function is used to get leaderboard and the number of people is determined by num.
//                                        It will return a promise so that you can add then(....) or catch(.....)
//                                        behind this function as you desired.(the snapshot that we get will be descending order)
//                                        e.g.leader_board.get_scores(song,mode).then((snapshot)=>{
//                                                  let infos = [];
//                                                  snapshot.forEach((s)=>{
//                                                     infos.push(s);
//                                                  });
//                                                  infos.sort((l,r)=>{return r.val()-l.val();});//then we get a ascending-orderd sequence
//                                                  for(let no=1;no<=infos.length;no++){
//                                                      let info = infos[no-1];
//                                                      console.log(info.key+'  '+info.val());//the key of info is username
//                                                  }
//                                            });
//
//(3)function get_my_score(song,mode):This function is used to get curent player's score from database.
//                                    It will return a promise so that you can add then(....) or catch(.....)
//                                    behind this function as you desired.
//                                    e.g.leader_board.get_my_score(song,mode).then((snapshot)=>{
//                                              console.log(snapshot.key+ '   '+snapshot.val());
//                                         });
/**************************************************************************************/

var database = firebase.database();

const leader_board = {
  //push your score into leaderboard,and this function will return a promise function
  push_score: function(song, mode, score) {
    let username = firebase.auth().currentUser.email;
    username = username.split("@")[0];
    let updates = {};
    updates["/leaderboard/" + song + "/" + mode + "/" + username] = Number(score);
    return database.ref().update(updates);
  },

  //get top five people's scores by song name and mode,and this function will return a promise function
  //parameter num is refered to the number of people that you want to get,and its default number is 5
  get_scores: function(song, mode, num = 5) {
    return database
      .ref("/leaderboard/" + song + "/" + mode + "/")
      .orderByValue()
      .limitToLast(num)
      .once("value");
  },

  //get current user's score by song name and mode,and this function will return a promise function
  get_my_score: function(song, mode) {
    let username = firebase.auth().currentUser.email;
    username = username.split("@")[0];
    return database.ref("/leaderboard/" + song + "/" + mode + "/" + username).once("value");
  }
};
