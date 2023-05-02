/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id : {
            type : 'VARCHAR(100)',
            primaryKey : true
        },
        username : {
            type : 'VARCHAR(100)',
            notNull : true,
            unique : true,
        },
        password : {
            type : 'VARCHAR(100)',
            notNull : true
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('users')
};
