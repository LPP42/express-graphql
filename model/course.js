const dbcPool = require('./db');
const Student = require('./student');

let Course = {};

Course.list = async function () {

    // SELECT SELECT courseId AS `id`, `name`,`description` FROM course

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT courseId AS `id`, `name`,`description` FROM course");

    let list = [];
    for (let i = 0; 1 < rows.length; i++) {
        list.push(rows[i]);
    }
    dbConn.end();
    return list;
}


Course.listForTeacher = async (teacher) => {
    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT courseId AS `id`, `name`,`description` FROM course WHERE teacherId = ?", [teacher.id]);
    
    dbConn.end();
    return rows;
}

Course.listForStudent = async (student) => {
    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT course.courseId AS `course.id`,course.`name`,description from course JOIN course_student ON course_student.courseId = course.courseId WHERE studentId = ?", [student.id]);
    
    dbConn.end();
    return rows;
}


module.exports = Course;