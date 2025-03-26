document.addEventListener("DOMContentLoaded", function () {
    const studentNameInput = document.getElementById("student-name");
    const studentList = document.getElementById("student-list").querySelector('tbody');
    const addStudentBtn = document.getElementById("add-student-btn");
    const pickStudentBtn = document.getElementById("pick-student-btn");
    const pickedStudentCard = document.getElementById("picked-student-card");
    const pickedAvatar = document.getElementById("picked-avatar");
    const pickedName = document.getElementById("picked-name");

    let students = [];

    function generateAvatar(studentName) {
        const avatar = studentName;
        return `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${encodeURIComponent(avatar)}`;
    }
    
    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function addStudentToList(name, color) {
        const avatarUrl = generateAvatar(name);

        const studentRow = document.createElement('tr');
        studentRow.classList.add('student-row');

        studentRow.innerHTML = `
            <td>
                <span class="student-color" style="background-color: ${color};"></span>
                <img src="${avatarUrl}" alt="avatar" class="img-thumbnail me-2" style="height: 2rem;">
                <span style="color: ${color};">${name}</span>
            </td>
            <td class="text-end">
                <button class="btn btn-outline-secondary btn-sm delete-btn">Delete</button>
            </td>
        `;

        const deleteBtn = studentRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            studentRow.remove();
            students = students.filter(student => student.name !== name);
        });

        studentList.appendChild(studentRow);
        students.push({ name, color, avatarUrl });
    }

    addStudentBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const studentName = studentNameInput.value.trim();

        if (studentName === "") {
            alert("Please enter a student name.");
            return;
        }

        const studentColor = generateRandomColor();
        addStudentToList(studentName, studentColor);
        studentNameInput.value = "";
    });

    pickStudentBtn.addEventListener("click", function () {
        if (students.length === 0) {
            alert("No students in the list.");
            return;
        }
        const randomIndex = Math.floor(Math.random() * students.length);
        const selectedStudent = students[randomIndex];

        pickedAvatar.src = selectedStudent.avatarUrl;
        pickedAvatar.style.borderColor = selectedStudent.color;
        pickedName.textContent = selectedStudent.name;
        pickedStudentCard.style.display = "block";
    });
});
