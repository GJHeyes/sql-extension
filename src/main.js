const { db } = require("./db");

async function main(){

    const [numberOfEmployees,meta] = await db.query(`
        SELECT COUNT(*) AS 'Number of Employees' FROM employee_detail
    `)
    console.table(numberOfEmployees)

    const [employee,meta2] = await db.query(`
        SELECT MAX(salary) AS 'Salary' , job_title AS 'Job'
        FROM current_job_detail
    `)

    console.table(employee)

    const [seniorDevs,meta3] = await db.query(`
        SELECT COUNT(*) FROM current_job_detail AS 'Number of Senior Developers'
        WHERE job_title = 'Senior Developer' 
        
    `)

    console.table(seniorDevs)

    const [wageBrackets,meta4] = await db.query(`
        SELECT job_title AS 'Job Title', MAX(salary) - MIN(salary) AS 'Salary Gap'
        FROM current_job_detail 
        GROUP BY 1
        ORDER BY 2 DESC
    `)

    console.table(wageBrackets)

    const [notDevs,meta5] = await db.query(`
    SELECT job_title AS 'Job Title', salary AS 'Salary'
    FROM current_job_detail 
    WHERE job_title != 'Developer'
    GROUP BY 1
    ORDER BY 2 DESC
`)

console.table(notDevs)


}
main()
