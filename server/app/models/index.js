const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');
const { dbSettings } = require('settings');
const basename = path.basename(__filename);
const db = {};

console.log('\n\n\n dbSettings = ',dbSettings);

const sequelize = new Sequelize(
	dbSettings.database,
	dbSettings.username,
	dbSettings.password,
	{
		host: dbSettings.host,
		dialect: dbSettings.dialect,
		dialectOptions: {
			decimalNumbers: true
		}

	}
);

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
