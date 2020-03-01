const { Model, DataTypes } = require('sequelize');

class Program extends Model {
	static init(sequelize) {
		super.init(
			{
                name: DataTypes.STRING,
                cycle: DataTypes.INTEGER,
                description: DataTypes.STRING
			},
			{
				sequelize
			}
		);
    }
    //static associate(models) {
        //this.belongsToMany(models.Course, {through: "programCourses"});
	//}
}

module.exports = Program;
