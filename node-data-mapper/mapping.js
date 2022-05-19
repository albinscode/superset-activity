const { DataTypes } = require('sequelize');

const config = {
    entities: {
        commit: {
            // model in database
            model: {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                shortId: DataTypes.STRING,
                authorName: DataTypes.STRING,
                // system attributes
                // createdAt: DataTypes.DATE,
                // updatedAt: DataTypes.DATE,
            },
            // mapping from source (api rest) to database
            mapping: {
                id: 'id',
                short_id: 'shortId',
                author_name: 'authorName',
                created_at: 'createdAt',
            }
        }
    },

}

module.exports = config
