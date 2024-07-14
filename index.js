const { brands, types, countries } = require('./src/constants');
const db = require('./src/db/models');
const { Brand, Type, Country, Sequelize: {Op} } = db;

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
    title: 'Japaaaaaaan',
    description: 'Japan',
    createdAt: new Date(),
    updatedAt: new Date(),
}

const updatedCountry = {
    description: 'Unknown',
}

const addItem = async (model, values) => {
    try {
        const type = await model.create(values, {
            returning: ['id',], 
            raw: true,
            validate: false
    });
        console.log(type)
    } catch (error) {
        console.log('Cannot add item to table: ', error.message)
    }
}

const updateItems = async (model, values) => {
    try {
        const [number, result] = await model.update(values, {
            where: {
                title: {
                    [Op.like]: "U%" 
                }
            },
            returning: ['*'],
            raw: true
        });
        console.log(number);
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}


const deleteItem = async (model) => {
    try {
        const delItem = await model.destroy({where: {}})
        console.log(`Number of deleted rows: ${delItem}`);
    } catch (error) {
        console.log(`Cannot delete: ${error}`);
    }
}


const dropTable = async (model) => {
    try {
        await model.drop();
        console.log(`Table has been droped`)
    } catch (error) {
        console.log(`Cannot drop table: `, error.message)
    }
    
}

const syncTable = async (model) => {
    try {
        await model.sync({alter: true});
        console.log('Sync table has been done')
    } catch (error) {
        console.log('Cannot sync table: ', error.message)
    }
} 

const addItems = async(model, values) => {
    try {
        await model.bulkCreate(values, {
            fields: ['title', 'description', 'createdAt', 'updatedAt'],
        });
    } catch (error) {
        console.log(`Can't add: ${error.message}`);
    }
}


const getItems = async (model) => {
    try {
        const items = await model.findAll({
            where: {
                title: {
                    [Op.like]: 'L%'
                }
            },
            raw: true
        });
        items.forEach(item => {console.log(item)});
    } catch (error) {
        console.log(error.message)
    }
}

updateItems(Country, updatedCountry);

// deleteItem(Country);

// dropTable(Country) 

// syncTable(Country);

// addItems(Type, types);

// addItem(Country, newBrand);

// getItems(Type);
