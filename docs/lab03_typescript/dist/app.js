import { StudentManager } from "./managers/StudentManager.js";
import { showList } from "./utils/ShowList.js";
const manager = new StudentManager();
manager.loadFromLocalStorage();
function renderTable(students = manager.getAllStudents(), elementId = "studentTableBody") {
    const tableBody = document.getElementById(elementId);
    tableBody.innerHTML = "";
    showList(students);
    students.forEach((s) => {
        tableBody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.title_name}</td>
        <td>${s.first_name}</td>
        <td>${s.last_name}</td>
        <td>${s.email}</td>
        <td>${s.year}</td>
        <td>${s.major}</td>
      </tr>
    `;
    });
}
/* เพิ่มนักศึกษา */
document.getElementById("addBtn").onclick = () => {
    const student = {
        id: document.getElementById("id").value,
        title_name: document.getElementById("title_name").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        year: Number(document.getElementById("year").value),
        major: document.getElementById("major").value,
    };
    manager.addStudent(student);
    renderTable();
};
/* ค้นหาด้วยชื่อ */
document.getElementById("searchNameBtn").onclick = () => {
    const keyword = document.getElementById("searchName").value;
    const results = manager.findStudentsByName(keyword);
    renderTable(results);
    alert(`ผลการค้นหา: ${results.length} คน`);
};
/* ค้นหาด้วยสาขา */
document.getElementById("searchMajorBtn").onclick = () => {
    const keyword = document.getElementById("searchMajor").value;
    const results = manager.findStudentsByMajor(keyword);
    renderTable(results);
    alert(`พบในสาขา: ${results.length} คน`);
};
/* ค้นหาด้วย Email */
const emailBtn = document.getElementById("searchEmailBtn");
if (emailBtn) {
    emailBtn.onclick = () => {
        const email = document.getElementById("searchEmail").value;
        const result = manager.findStudentByEmail(email);
        renderTable(result ? [result] : []);
        alert(result ? "พบข้อมูลนักศึกษา" : "ไม่พบนักศึกษา");
    };
}
/* โหลดครั้งแรก */
renderTable();
