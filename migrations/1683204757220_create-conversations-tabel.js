/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('conversations', {
        id : {
            type : 'VARCHAR(100)',
            primaryKey : true
        },
        user1_id: { 
            type: 'VARCHAR(100)', 
            notNull: true, 
            references: 'users(id)', 
            onDelete: 'cascade' 
        },
        user2_id: { 
            type: 'VARCHAR(100)', 
            notNull: true, 
            references: 'users(id)', 
            onDelete: 'cascade' 
        },
        created_at: { 
            type: 'VARCHAR(50)', 
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('conversations')
};
