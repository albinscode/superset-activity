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
                additions: DataTypes.INTEGER,
                deletions: DataTypes.INTEGER,
                total: DataTypes.INTEGER,
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
                stats___additions: 'additions',
                stats___deletions: 'deletions',
                stats___total: 'total',
            }
        }
    },

}

module.exports = config
