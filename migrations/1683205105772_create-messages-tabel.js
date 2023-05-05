/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('messages', {
        id : {
            type : 'VARCHAR(100)',
            primaryKey : true
        },
        conversation_id : { 
            type: 'VARCHAR(100)', 
            notNull: true, 
            references: 'conversations(id)', 
            onDelete: 'cascade' 
        },
        sender_id: { 
            type: 'VARCHAR(100)', 
            notNull: true, 
            references: 'users(id)', 
            onDelete: 'cascade' 
        },
        message : {
            type: 'VARCHAR(100)', 
            notNull: true,
        },
        created_at: { 
            type: 'VARCHAR(50)', 
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('messages')
};
