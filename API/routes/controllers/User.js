const User = require('../../db/models/User');
const Student = require('../../db/models/Student');
const Admin = require('../../db/models/Admin');
const Professor = require('../../db/models/Professor');
const { status } = require('./utils');

const bcrypt = require('bcryptjs');

module.exports = {
	selectAll: (req, res) => {
		User.findAll()
			.then((users) => res.json(users))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		User.findByPk(req.params.id)
			.then((user) => (user ? res.json(user) : status(res, 404)))
			.catch((err) => status(res, 500));
	},

	insert: async (req, res) => {
		try {
			//	Bcrypt the passwords
			req.body.users = req.body.users.map((user) => ({
				...user,
				password: bcrypt.hashSync(user.password, 14)
			}));

			//	Students
			const studentsJSON = req.body.users.filter(
				(user) => user.role.type === 'student'
			);
			const studentsUsers = await User.bulkCreate(studentsJSON, {
				individualHooks: true
			});
			const studentsData = studentsUsers.map((user, index) => ({
				userId: user.id,
				...studentsJSON[index].role.data
			}));

			const students = await Student.bulkCreate(studentsData, {
				individualHooks: true
			});

			//	Professors
			const professorsJSON = req.body.users.filter(
				(user) => user.role.type === 'professor'
			);
			const professorsUsers = await User.bulkCreate(professorsJSON, {
				individualHooks: true
			});
			const professorsData = professorsUsers.map((user, index) => ({
				userId: user.id,
				...professorsJSON[index].role.data
			}));
			const professors = await Professor.bulkCreate(professorsData, {
				individualHooks: true
			});

			//	Admins
			const adminsJSON = req.body.users.filter(
				(user) => user.role.type === 'admin'
			);
			const adminsUsers = await User.bulkCreate(adminsJSON, {
				individualHooks: true
			});
			const adminsData = adminsUsers.map((user, index) => ({
				userId: user.id,
				...adminsJSON[index].role.data
			}));
			const admins = await Admin.bulkCreate(adminsData, {
				individualHooks: true
			});

			return res.json({
				users: [...studentsUsers, ...adminsUsers, ...professorsUsers],
				students,
				professors,
				admins
			});
		} catch (err) {
			return status(res, 400);
		}
	},

	edit: (req, res) => {
		const avatarURL = req.file
			? req.file.location
				? req.file.location
				: `${process.env.APP_URL}/files/${req.file.key}`
			: null;
		User.findByPk(req.params.id)
			.then((user) =>
				user
					? user
							.update({
								password: req.body.user.password || '',
								status: req.body.user.status || '',
								avatarURL
							})
							.then((updatedUser) => res.json(updatedUser))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	},

	delete: (req, res) => {
		User.findByPk(req.params.id)
			.then((user) =>
				user ? user.destroy().then(() => status(res, 200)) : status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
