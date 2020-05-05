

function initPriceModifyComponent(oriPrice, discountPrice) {
  initPriceCard(oriPrice, discountPrice);
  setPriceBtnClickEvent(oriPrice, discountPrice);
}

function initPriceCard(oriPrice, discountPrice) {
  $("#input-ori-price").val(oriPrice);
  $("#input-discount-price").val(discountPrice);
}

function setPriceBtnClickEvent(oriPrice, discountPrice) {
  $(".btn-price").click(function() {
    let self = $(this);
    if(!self.hasClass("btn-price-modify")) {
      setEnable(self.parent().parent().find("input"));
      self.text("提交");
      addNewClass(self, "btn-price-modify");
      self.parent().append("<button class='btn btn-outline-secondary btn-price-discard' type='button'>取消");
      setPriceDiscardBtnEvent(oriPrice, discountPrice);
    } else {
      switch(self.attr("id")) {
        case "btn-price-ori":
          let originalPriceNew = $("#input-ori-price").val();
          if(originalPriceNew === oriPrice) {
            jqInfo("无修改", "原始单价数值前后无变化", function() {});
          } else {
            jqConfirm("修改确认", "确认修改【原价】为 " + originalPriceNew + "元?", function() {
              updateOrderPrice(originalPriceNew, CONSTANTS.PRICE.TYPE_ORIGINAL).done(function(response) {
                if(response == "success") {
                  jqInfo("修改成功", "成功地修改原始单价为 " + originalPriceNew + "元", function() {
                    refresh();
                  });
                } else {
                  jqAlert("修改失败", "原始单价修改失败，请重试");
                }
              });
            });
          }
          break;
        case "btn-price-discount":
          let discountPriceNew = $("#input-discount-price").val();
          if(discountPriceNew === discountPrice) {
            jqInfo("无修改", "折扣价数值前后无变化", function() {});
          } else {
            jqConfirm("修改确认", "确认修改【折扣价】为 " + discountPriceNew + "元?", function() {
              updateOrderPrice(discountPriceNew, CONSTANTS.PRICE.TYPE_DISCOUNT).done(function(response) {
                if(response == "success") {
                  jqInfo("修改成功", "成功地修改折扣价为 " + discountPriceNew + "元", function() {
                    refresh();
                  });
                } else {
                  jqAlert("修改失败", "折扣价修改失败，请重试");
                }
              });
            });
          }
          break;
        default:
          jqAlert("更新失败", "单价更新异常，请重试!");
      }
    }
  });
}

function setPriceDiscardBtnEvent(oriPrice, discountPrice) {
  $(".btn-price-discard").click(function() {
    let self = $(this);
    let priceModifyBtn = self.parent().find(".btn-price");
    priceModifyBtn.text("修改");
    removeOldClass(priceModifyBtn, "btn-price-modify");
    switch(priceModifyBtn.attr("id")) {
      case "btn-price-ori":
        $("#input-ori-price").val(oriPrice);
        setDisable($("#input-ori-price"));
        break;
      case "btn-price-discount":
        $("#input-discount-price").val(discountPrice);
        setDisable($("#input-discount-price"));
        break;
    }
    self.remove();
  });
}