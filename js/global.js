$(document).ready(function (){
    init();
    initDatabase();
})
function initDatabase(){
    try{
        databaseSetup.createDatabase();
    }
    catch(e){
        console.error(e);
    }

    try {
        databaseSetup.createTables();
    }
    catch (e) {
        console.error(e);
    }
}
function init(){
    //ToDo: Set event handlers.

}

