console.log('Hi everybody')

const { brands, types, countries } = require('./src/constants');
const db = require('./src/db/models');
const { Brand, Type, Country } = db;

const dbCheck = async () => {
    try {
        await db.sequelize.authenticate();
        console.log(`Connection with DB <<<${process.env.DB_NAME.toUpperCase()}>>> has been successfully done`)
        
    } catch (error) {
        console.log('Cannot connect to DB: ', error.message)
    }
}
dbCheck()

const newBrand = {
    title: 'ZAaaaafaaZ',
    description: 'Famous Ukrainian brand.',
    createdAt: new Date(),
    updatedAt: new Date(),
}

const addItem = async (model, values) => {
    try {
        const type = await model.create(values, {
            returning: ['id', 'updatedAt'], raw: true
    });
        console.log(type)
    } catch (error) {
        console.log('Cannot add item to table: ', error.message)
    }
}

const deleteItem =async (model) => {
    try {
        const delItem = await model.destroy({where: {}})
        console.log(`Number of deleted rows: ${delItem}`);
    } catch (error) {
        console.log(`Cannot delete: ${error}`);
    }
}

// deleteItem(Country);


// addItem(Brand, newBrand);

 const dropTable = async (model) => {
    try {
        await model.drop();
        console.log(`Table has been droped`)
    } catch (error) {
        console.log(`Cannot drop table: `, error.message)
    }
    
}

// dropTable(Country) 

 const syncTable = async (model) => {
     try {
         await model.sync({alter: true});
         console.log('Sync table has been done')
     } catch (error) {
         console.log('Cannot sync table: ', error.message)
     }
} 

// syncTable(Country);

// Insert many items

const addItems = async(model, values) => {
    try {
        await model.bulkCreate(values, {
            fields: ['title', 'description', 'createdAt', 'updatedAt'],
        });
    } catch (error) {
        console.log(`Can't add: ${error.message}`);
    }
}

addItems(Country, countries);