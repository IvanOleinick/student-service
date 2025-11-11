import * as repo from "../repository/studentRepository.js";


export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}
export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).send();
    }
}
export const updateStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (!student) {
        return res.status(404).send();
    }
    if (req.body.name) {
        student.name = req.body.name;
    }
    if (req.body.password) {
        student.password = req.body.password;
    }
    repo.updateStudent(+req.body.id, student);
    res.status(200).json(student)
}

export const deleteStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (student) {
        repo.deleteStudent(+req.params.id);
        res.status(204).send();
    } else {
        res.status(404).send();
    }

}

export const addScore = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (!student) {
        return res.status(404).send();
    }
    const {examName, score} = req.body;
    student.scores[examName] = score;
    res.json(student);

}

export const findByName = (req, res) => {
    const students = repo.findByName(req.params.name);
    const studentsWithoutPassword = students.map(({password, ...rest}) => rest);

    if (!students.length) {
        return res.status(404).json({message: 'No students with this name'});
    }

    if (studentsWithoutPassword.length === 1) {
        return res.json(studentsWithoutPassword[0]);
    }

    res.json(studentsWithoutPassword);
}

export const countByNames = (req, res) => {
    const names = req.query.names;
    let count = 0;

    for (const student of repo.getAll()) {
        if (typeof names === 'string') {
            if (student.name === names) count++;
        } else {
            for (const n of names) {
                if (student.name === n) count++;
            }
        }
    }

    res.json(count);
};


export const findByMinScore = (req, res) => {
    const exam = req.params.exam;
    const minScore = (+req.params.minScore);
    const students = repo.findByMinScore(exam, minScore);

    if (!students.length) {
        return res.status(404).json({message: 'No students with this exam and score'});
    }

    const studentsWithoutPassword = students.map(student => {
        const {password, ...rest} = student;
        return rest;
    });

    res.json(studentsWithoutPassword);
};