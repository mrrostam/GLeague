var ss = SpreadsheetApp.getActiveSpreadsheet();
var gameSheet = ss.getSheets()[0];
var tableSheet = ss.getSheets()[1];
var nameSheet = ss.getSheets()[2];

function freezeTitle() {

    tableSheet.setFrozenRows(1);
  gameSheet.setFrozenRows(2)

}

function showMsg() {
    //Browser.msgBox("Hello World!");
    //Logger.log(1 + 2); // The value 3 is logged.
};

function updateFixture() {
      var startRow = 2;  // First row of data to process
    var playerNumber = nameSheet.getRange("D3").getValue();
    var nameRange = nameSheet.getRange(startRow, 1, playerNumber, 1)

    // Fetch values for each row in the Range.
    var players = nameRange.getValues();
};
function updateTable() {
    var startRow = 2;  // First row of data to process
    var playerNumber = nameSheet.getRange("D3").getValue();
    var nameRange = nameSheet.getRange(startRow, 1, playerNumber, 1)

    // Fetch values for each row in the Range.
    var players = nameRange.getValues();
    var playerLeague = [];

    for (var i = 0; i < players.length; i++) {
        var p = new Player(players[i]);
      gameNumber = factorialize(playerNumber)/(factorialize(2)*factorialize(playerNumber-2))
        for (var j = 3; j < gameNumber+3; j++) {
            var check = gameSheet.getRange(j, 2);
            if (!check.isBlank()) {
                var player1 = gameSheet.getRange(j, 1).getValue()
                var player1Score = gameSheet.getRange(j, 2).getValue()
                var player2 = gameSheet.getRange(j, 5).getValue()
                var player2Score = gameSheet.getRange(j, 4).getValue()
                if (p.name == player1) {
                    p.f += player1Score
                    p.a += player2Score
                    p.p += 1;
                    if (player1Score > player2Score) { p.w += 1; p.pts += 3; }
                    else if (player2Score > player1Score) { p.l += 1; }
                    else { p.d += 1; p.pts += 2; }
                }
                else if (p.name == player2) {
                    p.f += player2Score
                    p.a += player1Score
                    p.p += 1;
                    if (player1Score > player2Score) { p.l += 1; }
                    else if (player2Score > player1Score) { p.w += 1; p.pts += 3; }
                    else { p.d += 1; p.pts += 2; }
                }
            }
        };
        p.gd = p.f - p.a
        playerLeague.push(p)
    };

    for (var i = 0; i < players.length; i++) {
        var maxPts = -1;
        var maxIndex = 0;
      Logger.log(i);
        for (var j = 0; j < players.length; j++) {
          if (playerLeague[j].pts > maxPts){       
                maxPts = playerLeague[j].pts;
          maxIndex = j;
          };
        };
        var write1 = [[playerLeague[maxIndex].name, playerLeague[maxIndex].p, playerLeague[maxIndex].w, playerLeague[maxIndex].l, playerLeague[maxIndex].d, playerLeague[maxIndex].f, playerLeague[maxIndex].a, playerLeague[maxIndex].gd, playerLeague[maxIndex].pts]];
        tableSheet.getRange(i + 2, 2, 1, 9).setValues(write1);
        playerLeague[maxIndex].pts = -2;
    };
};

var Player = function (name) {
    this.name = name;
    this.p = 0;
    this.w = 0;
    this.d = 0;
    this.l = 0;
    this.f = 0;
    this.a = 0;
    this.pts = 0;
    this.gd = 0;
};

function updateForm(){
  // call your form and connect to the drop-down item
  var form = FormApp.openById("1h1NthsDAiW0y2GBgWj5NwWCp3oX3bOEeG0M0u_Lkh60");
  
  var namesList1 = form.getItemById("454483155").asListItem();
  var namesList2 = form.getItemById("1769347571").asListItem();

    var startRow = 2;  // First row of data to process
    var playerNumber = nameSheet.getRange("D3").getValue();
    var nameRange = nameSheet.getRange(startRow, 1, playerNumber, 1)

    // Fetch values for each row in the Range.
    var players = nameRange.getValues();


  var playerName = [];

  // convert the array ignoring empty cells
  for(var i = 0; i < players.length; i++)   
    if(players[i][0] != "")
      playerName[i] = players[i][0];

  // populate the drop-down with the array data
  namesList1.setChoiceValues(playerName);
 namesList2.setChoiceValues(playerName);
}

function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
};
