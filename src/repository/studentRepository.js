import {Student} from "../model/student.js";

const students = new Map();


export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(+id, new Student(+id, name, password));
    return true;
};


export const findStudent = (id) => students.get(id);

export const updateStudent = (id, student) => students.set(+id, student);

export const addScore = (id, subject, score) => students.get(id).scores[subject] = score;

export const deleteStudent = (id) => students.delete(id);

export const findByName = (name) => {
    const normalizedName = name.trim().toLowerCase();
    const result = [];

    for (const student of students.values()) {
        if (student.name.trim().toLowerCase() === normalizedName) {
            result.push(student);
        }
    }

    return result;
};

export const countByNames = (names) => {
    let count = 0;

    for (const student of students.values()) {
        if (names.includes(student.name)) {
            count++;
        }
    }

    return count;
};

export const getAll = () => students.values();

export const findByMinScore = (exam, minScore) => {
    const result = [];

    for (const student of students.values()) {
        if (!student.scores) {
            continue;
        }

        const score = student.scores[exam];

        if (typeof score === 'number') {
            if (score >= minScore) {
                result.push(student);
            }
        }
    }

    return result;
};



