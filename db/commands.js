import db from './informations.js';

db.connect();
let result = await getAll();

async function getAll() {
    try {
        const result = await db.query("SELECT * FROM todolist ORDER BY id ASC ");
        return result;
    } catch(err) {
        console.log(err);
        return null;
    }
}

async function getRows() {
    result = await getAll();
    return result.rows;
}

async function addTasks(value) {
    try {
        await db.query("INSERT INTO todolist (id, title) VALUES ($1, $2);",[result.rowCount+1, value]);
        return true;
    } catch(err) {
        console.log(err);

        return false;
    }
}

async function deleteTasks(id) {
    try {
        await db.query("DELETE FROM todolist WHERE id = $1;",[id]);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

async function updateTasks(value,id) {
    try {
        await db.query("UPDATE todolist SET title = $1 WHERE id = $2;",[value,id]);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export {getRows, addTasks, deleteTasks,updateTasks};