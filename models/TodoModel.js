'use strict';

const db = require('./conn');
class Todo {
    constructor(id, is_complete, task_content, user_id) {
        this.id = id;
        this.is_complete = is_complete;
        this.task_content = task_content;
        this.user_id = user_id;
    }

    static async getAllTasks(user_id) {
        try {
            const response = await db.any(
                `SELECT * FROM tasks
                WHERE user_id=${user_id}
                ORDER by id;`
            )
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async addTask(task_content, user_id) {
        try {
            const response = await db.one(
                `INSERT INTO tasks
                    (is_complete, task_content, user_id)
                VALUES
                    (false, '${task_content}', ${user_id})
                RETURNING id;`
            )
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async updateTask(id, is_complete) {
        try {
            const completed = !eval(is_complete);
            console.log({is_complete})
            console.log({completed})
            console.log('ID in updateTask' ,id)
            const response = await db.result(
                `UPDATE tasks
                SET is_complete = ${completed}
                WHERE id = ${id};`
            )
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async deleteTask(id) {
        try {
            const response = await db.result(
                `DELETE FROM tasks
                WHERE id=${id};`
            )
            return response;
        } catch(error) {
            console.log("ERROR: ", error);
        }
    }
}

module.exports = Todo;