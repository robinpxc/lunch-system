const CONSTANTS = {
  WORKGROUP_COUNT: 7,
  ORDER_COUNT: 6,
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
      KEY_GROUP: "USER_GROUP_CURRENT"
    },

    STATISTICS: {
      KEY_DATE: "DATE_STATISTICS",
      KEY_YEAR: "KEY_YEAR",
      KEY_MONTH: "KEY_MONTH"
    }
  },

  USER: {
    ROLE: {
      ADMIN_SUPER: "ADMIN_SUPER",
      ADMIN_GROUP: "ADMIN_GROUP",
      USER: "USER",
      CN: {
        ADMIN_SUPER: "高级管理员",
        ADMIN_GROUP: "组管理员",
        USER: "用户",
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
      ORDER_1: 1,
      ORDER_2: 2,
      ORDER_3: 3,
      ORDER_4: 4,
      ORDER_5: 5,
      NO_ORDER: 6
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
  }
};