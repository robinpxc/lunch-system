const CONSTANTS = {
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
    USER_ID: "USER_ID",
    USER_ID_MODIFIED: "USER_ID_MODIFIED",
    USER_ROLE_CURRENT: "USER_ROLE_CURRENT",
    USER_GROUP_CURRENT: "USER_GROUP_CURRENT"
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
    }
  }
};