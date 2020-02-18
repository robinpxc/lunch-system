$(document).ready(function(){
  let workgroup = new Object();
  // let dataArray = fetchDailyOrderStatus(getDateToday(), false);
  let dataArray = fetchDailyOrderStatus("2020-02-11", false);
  configUI();
  addDropdownListEvent();
  setData(dataArray);

  function configUI() {
    for(let i = 0; i < 7; i++) {
      let cardHeaderClassName = ".table-group-" + i + " .card-header";
      let originalText = $(cardHeaderClassName).text();
      $(cardHeaderClassName).text(originalText + "（ " +  getGroupOrderNumber(dataArray, i) + " 人 ）");
    }
  }

  function addDropdownListEvent() {
    $(".dropdown-item").each(function(){
      $(this).click(function() {
        setDropdownInactive();
        addNewClass($(this), "active");
        $(".dropdown-workgroup").text($(this).text());
        setListMenuClickEventUI($(this));
      });
    });
  }

  function setDropdownInactive() {
    $(".dropdown-item").each(function() {
      removeOldClass($(this), "active");
    });
  }

  function setListMenuClickEventUI(listItem) {
    switch (listItem.attr("id")) {
      case "group-0":
        filterTables(0);
        break;
      case "group-1":
        filterTables(1);
        break;
      case "group-2":
        filterTables(2);
        break;
      case "group-3":
        filterTables(3);
        break;
      case "group-4":
        filterTables(4);
        break;
      case "group-5":
        filterTables(5);
        break;
      case "group-6":
        filterTables(6);
        break;
      default:
        unhideAllGroup();
    }
  }

  function filterTables(currentItemNum) {
    let itemPrefix = ".table-group-";
    for(let i = 0; i < 7; i++) {
      hideElement($(itemPrefix + i));
    }
    unhideElement($(itemPrefix + currentItemNum));
  }

  function unhideAllGroup() {
    let itemPrefix = ".table-group-";
    for(let i = 0; i < 7; i++) {
      unhideElement($(itemPrefix + i));
    }
  }

  function setData(dataArray) {

    for(let i = 0; i < 7; i++) {
      setDataToGroupTable(getGroupData(dataArray, i), i);
    }
  }

  function getGroupOrderNumber(dataArray, groupNumber) {
    let groupOrder = 0;
    let group = "group" + groupNumber;
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][3] == group) {
        groupOrder ++;
      }
    }
    return groupOrder;
  }

  function getGroupData(dataArray, groupNumber) {
    let group = "group" + groupNumber;
    let groupOrderData = new Array();
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][3] == group) {
        groupOrderData.push(dataArray[i]);
      }
    }
    return groupOrderData;
  }

  function setDataToGroupTable(data, group) {
    for(let i = 0; i < data.length; i++) {
      let personClass = "group" + "-" + group + "-" + "person" + "-" + i; ;
      $(".tb-group" + group).append("<tr class=" + personClass + ">");
      $("." + personClass).append("<td>" + data[i][0]);
      $("." + personClass).append("<td>" + data[i][1]);
      $("." + personClass).append("<td>" + data[i][2] + " 号");
    }
  }
});