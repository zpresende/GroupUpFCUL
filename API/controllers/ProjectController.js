const connection = require('../db/config/connection');
const errors = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

class ProjectController {
	constructor() {
		this.index = this.index.bind(this);
		this.store = this.store.bind(this);

		this.findCourse = this.findCourse.bind(this);
		this.findUnit = this.findUnit.bind(this);
	}

	async index(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const projects = await connection('projects').select([
			'name',
			'min_students',
			'max_students',
			'description',
			'objectives',
			'assignment_url',
		]);
		return response.json(projects);
	}

	async store(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		let { min_students, max_students } = request.body.project;
		const {
			name,
			description,
			objectives,
			assignment_url,
		} = request.body.project;
		if (max_students < min_students) max_students = min_students;
		let number = 1;
		const unit_code = unit.code;
		const id = uuidv4();
		const date = new Date();
		const academic_year =
			date.getMonth() > 7
				? `${date.getFullYear()}-${date.getFullYear() + 1}`
				: `${date.getFullYear() - 1}-${date.getFullYear()}`;
		const [existingProject] = await connection('projects')
			.select('number')
			.where({ academic_year, unit_code })
			.orderBy('number', 'desc')
			.limit(1);
		if (existingProject) number = existingProject.number + 1;
		try {
			const [project] = await connection('projects').insert(
				{
					id,
					number,
					unit_code,
					name,
					academic_year,
					min_students,
					max_students,
					description,
					objectives,
					assignment_url,
				},
				['number', 'name', 'academic_year']
			);
			return response.status(201).json(project);
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async findCourse(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		return course;
	}

	async findUnit(request, response, next) {
		const course = await this.findCourse(request, response, next);
		if (!course) return next();
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, 'params'));
		return unit;
	}
}

module.exports = new ProjectController();
