'use strict';

let Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "users"
 * createTable "imChannels"
 * createTable "imChannelUsers"
 * createTable "imMessages"
 * createTable "imMessageShowUsers"
 *
 **/

let info = {
  "revision": 1,
  "name": "first-migration",
  "created": "2021-09-28T14:50:00.000Z",
  "comment": "Первичная миграция"
};

let migrationCommands = [
  // createTable users
  {
    fn: "createTable",
    params: [
      "users",
      {
        "id": {
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false,
          "type": Sequelize.INTEGER
        },
        "createdAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "updatedAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "deletedAt": {
          "type": Sequelize.DATE
        },
        "email": {
          "type": Sequelize.STRING
        },
        "mobile": {
          "type": Sequelize.STRING
        },
        "pwd_hash": {
          "type": Sequelize.STRING,
          "comment": "Хэш пароля"
        },
        "extra": {
          "type": Sequelize.JSONB
        },
      },
      {
        "comment": "Список пользователей"
      }
    ]
  },

  // createTable imChannels
  {
    fn: "createTable",
    params: [
      "imChannels",
      {
        "id": {
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false,
          "type": Sequelize.INTEGER
        },
        "createdAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "updatedAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "deletedAt": {
          "type": Sequelize.DATE
        },
        "title": {
          "type": Sequelize.STRING,
          "comment": "Название групповых каналов"
        },
        "private": {
          "type": Sequelize.BOOLEAN,
          "comment": "Признак, что канал приватный"
        },
      },
      {
        "comment": "Список каналов чата"
      }
    ]
  },

  // createTable imChannelUsers
  {
    fn: "createTable",
    params: [
      "imChannelUsers",
      {
        "id": {
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false,
          "type": Sequelize.INTEGER
        },
        "createdAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "updatedAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "deletedAt": {
          "type": Sequelize.DATE
        },
        "channelId": {
          "onDelete": "NO ACTION",
          "onUpdate": "CASCADE",
          "references": {
            "model": "imChannels",
            "key": "id"
          },
          "allowNull": true,
          "type": Sequelize.INTEGER
        },
        "userId": {
          "onDelete": "NO ACTION",
          "onUpdate": "CASCADE",
          "references": {
            "model": "users",
            "key": "id"
          },
          "allowNull": true,
          "type": Sequelize.INTEGER
        },
        "mute": {
          "defaultValue": false,
          "type": Sequelize.BOOLEAN
        },
      },
      {
        "comment": "Список каналов чата"
      }
    ]
  },

  // createTable imMessages
  {
    fn: "createTable",
    params: [
      "imMessages",
      {
        "id": {
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false,
          "type": Sequelize.INTEGER
        },
        "createdAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "updatedAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "deletedAt": {
          "type": Sequelize.DATE
        },
        "userId": {
          "onDelete": "NO ACTION",
          "onUpdate": "CASCADE",
          "references": {
            "model": "users",
            "key": "id"
          },
          "allowNull": true,
          "type": Sequelize.INTEGER
        },
        "channelId": {
          "onDelete": "NO ACTION",
          "onUpdate": "CASCADE",
          "references": {
            "model": "imChannels",
            "key": "id"
          },
          "allowNull": true,
          "type": Sequelize.INTEGER
        },
        "body": {
          "type": Sequelize.JSONB
        }
      },
      {
        "comment": "Сообщения из чата"
      }
    ]
  },

  // createTable imMessageShowUsers
  {
    fn: "createTable",
    params: [
      "imMessageShowUsers",
      {
        "id": {
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false,
          "type": Sequelize.INTEGER
        },
        "createdAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "updatedAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "deletedAt": {
          "type": Sequelize.DATE
        },
        "userId": {
          "onDelete": "NO ACTION",
          "onUpdate": "CASCADE",
          "references": {
            "model": "users",
            "key": "id"
          },
          "allowNull": true,
          "type": Sequelize.INTEGER
        },
        "messageId": {
          "onDelete": "NO ACTION",
          "onUpdate": "CASCADE",
          "references": {
            "model": "imMessages",
            "key": "id"
          },
          "allowNull": true,
          "type": Sequelize.INTEGER
        },
      },
      {
        "comment": "Сообщения, которые пользователя просмотрели"
      }
    ]
  },
];

let rollbackCommands = [{
  fn: "dropTable",
  params: ["imMessages"]
}, {
  fn: "dropTable",
  params: ["imChannelUsers"]
}, {
  fn: "dropTable",
  params: ["imChannels"]
}, {
  fn: "dropTable",
  params: ["users"]
}];

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else {
          resolve();
        }
      }
      next();
    });
  },
  down: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else {
          resolve();
        }
      }
      next();
    });
  },
  info: info
};