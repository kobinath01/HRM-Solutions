import connection from "../config/db.js";

export default class Employee {
	constructor({
		emp_id,
		full_name,
		first_name,
		last_name,
		birthdate,
		marital_status,
		dept_id,
		email,
		nic,
		status_id,
		contract_id,
		title_id,
		supervisor_id,
		paygrade_id,
	}) {
		this.emp_id = emp_id;
		this.full_name = full_name;
		this.first_name = first_name;
		this.last_name = last_name;
		this.birthdate = birthdate;
		this.marital_status = marital_status;
		this.dept_id = dept_id;
		this.email = email;
		this.nic = nic;
		this.status_id = status_id;
		this.contract_id = contract_id;
		this.title_id = title_id;
		this.supervisor_id = supervisor_id;
		this.paygrade_id = paygrade_id;
	}

	static getAll(result) {
		connection.query(
			`SELECT * FROM employee 
			INNER JOIN department ON department.dept_id=employee.dept_id
			INNER JOIN title ON title.title_id=employee.title_id
			`,
			result
		);
	}

	static getById(emp_id, result) {
		connection.query(
			`SELECT * FROM employee INNER JOIN emp_detail ON emp_detail.emp_id=employee.emp_id WHERE employee.emp_id = ?`,
			[emp_id],
			result
		);
	}

	static getByDepartmentID(dept_id, result) {
		connection.query(
			`SELECT * FROM employee WHERE dept_id = ?`,
			[dept_id],
			result
		);
	}

	create(result) {
		connection.query(
			`INSERT INTO employee
			(
				emp_id,
				full_name,
				first_name,
				last_name,
				birthdate,
				marital_status,
				dept_id,
				email,
				nic,
				status_id,
				contract_id,
				title_id,
				supervisor_id,
				paygrade_id
			)
			VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				this.emp_id,
				this.full_name,
				this.first_name,
				this.last_name,
				this.birthdate,
				this.marital_status,
				this.dept_id,
				this.email,
				this.nic,
				this.status_id,
				this.contract_id,
				this.title_id,
				this.supervisor_id,
				this.paygrade_id,
			],
			result
		);
	}

	edit(result) {
		connection.query(
			`UPDATE employee SET
				full_name = ?,
				first_name = ?,
				last_name = ?,
				birthdate = ?,
				marital_status = ?,
				dept_id = ?,
				email = ?,
				nic = ?,
				status_id = ?,
				contract_id = ?,
				title_id = ?,
				supervisor_id = ?,
				paygrade_id = ? 
			WHERE emp_id = ?`,
			[
				this.full_name,
				this.first_name,
				this.last_name,
				this.birthdate,
				this.marital_status,
				this.dept_id,
				this.email,
				this.nic,
				this.status_id,
				this.contract_id,
				this.title_id,
				this.supervisor_id,
				this.paygrade_id,
				this.emp_id,
			],
			result
		);
	}

	static updateEmpDetail(emp_id, column, value, result) {
		connection.query(
			`UPDATE emp_detail SET ${column} = ? WHERE emp_id = ?`,
			[value, emp_id],
			result
		);
	}

	static remove(emp_id, result) {
		connection.query(`DELETE FROM employee WHERE emp_id = ?`, [emp_id], result);
	}

	// Get employee count
	static async getCount(result) {
		connection.query("CALL PR_no_of_records (?);", "employee", result);
	}
}
