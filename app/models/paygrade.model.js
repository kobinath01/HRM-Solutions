import connection from "../config/db";

class Paygrade{
    constructor(paygrade_id, level, annual, casual, maternity, no_pay){
        this.paygrade_id = paygrade_id;
        this.level = level;
        this.annual = annual;
        this.casual = casual;
        this.maternity = maternity;
        this.no_pay = no_pay;
    }

    create(result){
        connection.query(
            `INSERT INTO paygrade(level, annual, casual, maternity, no_pay)
                VALUES (${this.level}, ${this.annual}, ${this.casual}, ${this.maternity}, ${this.no_pay})`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);

                    return result(err, null);
                }

                this.paygrade_id = res.insertId
                result(null, { ...this })
            }
        )
    }


    static getAll(result){
        connection.query(
            `SELECT * FROM paygrade`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }

                return result(null, res)
            }
        )
    }


    static getById(paygrade_id, result){
        connection.query(
            `SELECT * FROM paygrade WHERE paygrade_id = ${paygrade_id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null)
                }
                return result(null, res)
            }
        )   
    }

    updateById(result){
        connection.query(
            `UPDATE paygrade SET 
            level = ${this.level}, 
            annual = ${this.annual}, 
            casual = ${this.casual}, 
            maternity = ${this.maternity}, 
            no_pay = ${this.no_pay} 
            WHERE paygrade_id = ${this.paygrade_id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null)
                }
                return result(null, res)
            }
        )
    }

    static deleteById(paygrade_id, result){
        connection.query(
            `DELETE FROM paygrade WHERE paygrade_id = ${paygrade_id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null)
                }
                return result(null, res)
            }
        )
    }

}

export default Paygrade;