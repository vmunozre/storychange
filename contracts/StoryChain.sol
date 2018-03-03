pragma solidity ^0.4.18;

contract StoryChain {
  //type definition

  struct Chapter{
    address author;
    string alias;
    string chaptertitle;
    string chaptertext;
    address[] votes;
  }


  uint contestants; //OPCIONAL
  uint maxchapters; //OPCIONAL
  uint pricechapter;
  uint votestowin;
  uint pricevote;
  Chapter[] chapters;
  Chapter[] contestantchapters;




  //state variables
  //events
  //historia añadida
  event newStory(bool resp);
  //Capitulo añadido
  event newChapter(bool resp, uint currentcontestantindex); //indice del nuevo añadido
  //Voto añadido
  event newVote(bool resp, uint currentvotes);
  //Capitulo cerrado
  event closedChapter(bool resp, uint closedchapterindex);
  //Historia cerrada
  event closedStory(bool resp);

  //Modificadores
  modifier addChapterMod() {
    require(checkIfAddChapter()<=contestants);
    _;
  }
  modifier addVoteMod() {
    require(checkIfCanVote());
    _;
  }

  //-----------------------HISTORIAS Y CAPITULOS
  // create a new Story TODO: Ownable OJO: MACHACAS LA ANTERIOR
  function createStory(uint _contestants, uint _maxchapters, uint _pricechapter,uint _votestowin, uint _pricevote) external {
    //Chapter memory _defaultChapter = Chapter(0x0,"","",new address[_votestowin](0));
    contestants = _contestants;
    maxchapters = _maxchapters;
    pricechapter = _pricechapter;
    votestowin = _votestowin;
    pricevote = _pricevote;

    for(uint i = 0; i<_maxchapters; i++){
      chapters.push(Chapter(0x0,"","",new address[](_votestowin)));
    }

    Chapter[] storage initialcontestantchapters;
    for(i = 0; i<_contestants; i++){
      contestantchapters.push(Chapter(0x0,"","",new address[](_votestowin)));
    }
    newStory(true);
  }
  // add a chapter TODO: deposit TODO: PRECONDICION comprobar el numero de capitulos; TODO: EVENTO
  function addChapter(string _alias, string _chaptertext, string _chaptertitle) external {
      //comprobacion ojocuidao concurrencia (modificador)
      //Bucar el primer capitulo nulo
      //Si no hay se cancela ()
      //Lanzaria evento capitulo añadido
      uint index = checkIfAddChapter();
      require(index<=contestants);
      contestantchapters[index].author = msg.sender;
      contestantchapters[index].alias = _alias;
      contestantchapters[index].chaptertitle = _chaptertitle;
      contestantchapters[index].chaptertext = _chaptertext;
  }
  // comprobar si se puede subir un capitulo
  function checkIfAddChapter() public view returns(uint) {
    for (uint i=0;i<contestantchapters.length ;i++){
      if(contestantchapters[i].author == 0x0){
        return i;
      }
    }
    return contestants+1;
  }
  function checkIfPromoteChapter() public view returns(uint) {
    for (uint i=0;i<chapters.length ;i++){
      if(chapters[i].author == 0x0){
        return i;
      }
    }
    return maxchapters+1;
  }
  //GetStory()
  function getContestantChapters(uint i) public view returns(address,string,string,string,address[]){
    return (contestantchapters[i].author,contestantchapters[i].alias,contestantchapters[i].chaptertext, contestantchapters[i].chaptertitle,contestantchapters[i].votes);
  }
  function getChapters(uint i) public view returns(address,string,string,string,address[]){
    return (chapters[i].author,chapters[i].alias,chapters[i].chaptertext,chapters[i].chaptertitle,chapters[i].votes);
  }
  function getStory() public view returns(uint,uint,uint,uint,uint) {
    return(contestants,maxchapters,pricechapter,votestowin,pricevote);
  }

  //------------------VOTOS
  //votar TODO: deposit PRECONDICION comprobar el numero de capitulos; TODO: EVENTO
  function vote(uint _index) external {
    //Lanzaria evento voto añadido
    //comprobacion ojocuidao concurrencia (modificador)
    //Bucar el primer capitulo nulo
    //Si no hay se cancela ()
  }


  //comprobar votos (nº votes no nulos)
  // comprobar si se puede votar un capitulo
  function checkIfCanVote() internal returns(bool) {
    for (uint i=0;i<contestantchapters.length ;i++){
      for (uint j=0;j<contestantchapters[i].votes.length; j++)
        if( contestantchapters[i].votes[j] == 0x0){
          return true;
      }
    }
    return false;
  }
  //cerrar un capitulo TODO: deposit
  function closeChapter(uint index) public {
    uint insert = checkIfPromoteChapter();
    require(insert<=maxchapters);
    chapters[insert].author = msg.sender;
    chapters[insert].alias = contestantchapters[index].alias;
    chapters[insert].chaptertext = contestantchapters[index].chaptertext;
    chapters[insert].chaptertitle = contestantchapters[index].chaptertitle;
  }

}
