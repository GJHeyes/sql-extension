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
    SELECT employee_detail.name AS 'Name',
    current_job_detail.salary AS 'Salary'
    FROM employee_detail 
    INNER JOIN current_job_detail ON employee_detail.employee_id = current_job_detail.employee_id AND
    current_job_detail.job_title NOT LIKE '%developer%'
    ORDER BY 2 DESC;
    `)

 // WHERE job_title != 'Developer'
    // GROUP BY 1
    // ORDER BY 2 DESC

console.table(notDevs)


}
main()
