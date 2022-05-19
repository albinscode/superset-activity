const axios = require('axios')
const { Sequelize, Model, DataTypes } = require('sequelize');
const mappingConfig = require('./mapping.js')
const config = require('./config.json')

// TODO put in mapping
const API_URL = 'https://ci.linagora.com/api/v4/'
// TODO in mapping and shall be an array
const PROJECT_ID = 3023


// token for auth is currently global...
axios.defaults.headers.common['PRIVATE-TOKEN'] = config.token

let sequelize = null

async function connectDb() {
    console.log("Connecting to database")

    sequelize = new Sequelize(config.source.database, config.source.username, config.source.password, {
        dialect: config.source.dialect,
        host: config.source.host,
    })

    try {
        sequelize.authenticate();
        console.log('Connected to Mysql');
    } catch (error) {
        console.error('Cannot connect to Mysql', error);
    }

}



async function run() {
    const url = `${API_URL}/projects/${PROJECT_ID}/repository/commits`

    const result = await axios.get(url, {
        params: {
            with_stats: true,
            since: '2021-01-01T00:00:00Z',
            per_page: 0,
            // all: true,
        }
    } )
    // console.log(result)
    console.log(Object.keys(result.data).length)

    // model
    const modelName = 'commit'
    const modelInstance = sequelize.define(modelName, mappingConfig.entities[modelName].model);

    // we create the table if not existing
    modelInstance.sync()
    modelInstance.destroy({
        truncate: true,
    })

    for (sourceData of result.data) {
        // console.log(sourceData)
        let destData = {}
        const mapping =  mappingConfig.entities[modelName].mapping
        // we map column names from source to destination
        Object.keys(mapping).forEach((sourceColumn) => {
            const sourceColumnTokens = sourceColumn.split('___')
            // FIXME quick trick to get the attribute of an object by using three underscores
            // console.log(sourceColumn)
            if (sourceColumnTokens.length == 2) {
                destData[mapping[sourceColumn]] = sourceData[sourceColumnTokens[0]][sourceColumnTokens[1]]
            }
            else {
                destData[mapping[sourceColumn]] = sourceData[sourceColumn]
            }
        })
        // we store line into database
        modelInstance.create(destData)
    }

}

async function main() {
    await connectDb()
    await run()
}

main()
