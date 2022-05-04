const dbcPool = require('./db');

let Student = {};

Student.list = async function() {

    // SELECT `StudentId`,`first`,`last`,expiry from Student ORDER BY expiry desc

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT studentId as `id`,`first`,`last` FROM student");
    dbConn.end();
    //console.log(rows);
    return rows;
}

Student.getById = async (args) => {
    let dbConn = await dbcPool.getConnection();
    const row = await dbConn.query(
        "SELECT studentId as `id`,`first`,`last` FROM student WHERE studentId = ?",[args.id]);        
        dbConn.end();
        return row[0];
}

Student.listForCourse = async function(course) {

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT student.studentId as `id`,`first`,`last` FROM student JOIN course_student ON course_student.StudentId = student.studentId WHERE courseId = ?",[course.id]);
    dbConn.end();

    return rows;
}

module.exports = Student;