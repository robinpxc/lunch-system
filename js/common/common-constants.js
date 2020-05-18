const CONSTANTS = {
  WORKGROUP_COUNT: 7,
  ORDER_COUNT: 7,
  MENU: {
    COUNT: 7,
    SUB_COUNT: 3,
    CONFIRMATION: {
      TYPE:  {
        CHECK: "CHECK",
        UPDATE: "UPDATE"
      },
      STATUS: {
        CONFIRMED: "confirmed",
        NOT_CONFIRMED: "not-confirmed"
      }
    },
    STATUS: {
      EXIST: "menu-exist",
      NO_MENU: "no-menu"
    }
  },
  TIME_LIMIT: {
    HOUR: 9,
    MINUTE: 30
  },

  AJAX: {
    TYPE: {
      POST: "POST",
      GET: "GET"
    },
    DATA_TYPE: {
      DEFAULT: "STRING",
      JSON: "JSON",
      TEXT: "TEXT",
      XML: "XML",
      HTML: "HTML",
      SCRIPT: "SCRIPT",
      JSONP: "JSONP"
    }
  },

  COOKIE: {
    USER: {
      KEY_ID: "USER_ID_CURRENT",
      KEY_ID_MODIFIED: "USER_ID_MODIFIED",
      KEY_NAME: "USERNAME_CURRENT",
      KEY_ROLE: "USER_ROLE_CURRENT",
      KEY_GROUP: "USER_GROUP_CURRENT",
    },
    STATISTICS: {
      KEY_DATE: "DATE_STATISTICS",
      KEY_YEAR: "KEY_YEAR",
      KEY_MONTH: "KEY_MONTH",
      KEY_DETAIL_ID: "KEY_DETAIL_ID",
      KEY_DETAIL_NAME: "KEY_DETAIL_NAME"
    },
    ORDER: {
      KEY_DATE: "KEY_ORDER_DATE"
    },
    MENU: {
      KEY_SELECTED_DATE: "KEY_SELECTED_DATE"
    },
    KEY_DATE_TYPE: "DATE_TYPE"
  },

  USER: {
    ROLE: {
      ADMIN_SUPER: "admin-super",
      ADMIN_GROUP: "admin-group",
      ADMIN_MENU: "admin-menu",
      USER: "user",
      GUEST: "guest",
      CN: {
        ADMIN_SUPER: "高级管理员",
        ADMIN_GROUP: "组管理员",
        ADMIN_MENU: "菜单管理员",
        USER: "用户",
        GUEST: "临时人员"
      }
    },
  },

  WORKGROUP: {
    GROUP_0: "group0",
    GROUP_1: "group1",
    GROUP_2: "group2",
    GROUP_3: "group3",
    GROUP_4: "group4",
    GROUP_5: "group5",
    GROUP_6: "group6",
    GROUP_ALL: "GROUP_ALL",
    CN :{
      GROUP_0: "市委巡察办",
      GROUP_1: "市委第一巡察组",
      GROUP_2: "市委第二巡察组",
      GROUP_3: "市委第三巡察组",
      GROUP_4: "市委第四巡察组",
      GROUP_5: "市委第五巡察组",
      GROUP_6: "物业",
      GROUP_ALL: "所有部门",
      SIMPLIFY: {
        GROUP_0: "巡察办",
        GROUP_1: "一组",
        GROUP_2: "二组",
        GROUP_3: "三组",
        GROUP_4: "四组",
        GROUP_5: "五组",
        GROUP_6: "物业",
        GROUP_ALL: "所有部门",
      }
    },
  },

  ORDER: {
    CHECK_TYPE: {
      ORDER_STATUS: "TYPE_ORDER_STATUS",
      ORDER_CONTENT: "TYPE_ORDER_CONTENT"
    },
    STATUS: {
      NO_ORDER: "NO_ORDER",
      ORDER_EXIST: "ORDER_EXIST"
    },
    STATUS_USER: {
      ORDERED: "ORDERED",
      NOT_ORDER: "NOT_ORDER"
    },
    CONTENT: {
      NO_ORDER: 8
    },
    INFO_TEXT: {
      NO_ORDER: "不订餐"
    },
    INFO_TEXT_STATUS: {
      ORDERED: "已订餐",
      NOT_ORDER: "未订餐",
      NO_ORDER: "不订餐"
    }
  },

  PRICE: {
    TYPE_ORIGINAL: "ORIGINAL_PRICE",
    TYPE_DISCOUNT: "DISCOUNT_PRICE"
  },

  STRING: {
    FOOTER: {
      COPY_RIGHT: "&copy; 2019 - Robin.Pan",
      CONTACT_ME: "有问题请联系 804 潘潘"
    }
  },

  DATE: {
    TODAY: "TODAY",
    TOMORROW: "TOMORROW",
    CN: {
      TODAY: "今天",
      TOMORROW: "明天",
    }
  },

  COLOR: {
    GREEN_SUCCESS: "#177828",
    YELLOW_WARNING: "#FFC107",
    RED_DANGER: "#BD2130"
  }
};