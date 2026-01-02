/*      TASK NO . 01 ---> Data Structure.  

Problem Statement: Student Attendance Management System .                                                   */

import java.util.*;

public class StudentAttendanceSystem {

//    STUDENT MODEL ---------->>>
    static class Student {

        private int studentId;

        public Student(int studentId) {
            this.studentId = studentId;
        }

        public int getStudentId() {
            return studentId;
        }

        public void setStudentId(int studentId) {
            this.studentId = studentId;
        }
    }

    private static Queue<Student> attendanceQueue = new LinkedList<>();
    private static HashSet<Integer> attendanceSet = new HashSet<>();
    private static Stack<Student> undoStack = new Stack<>();

    // 1. ADD ATTENDANCE  ------>>>
    public static void addAttendance(int studentId) {

        if (attendanceSet.contains(studentId)) {
            System.out.println("[INFO] Attendance already marked for Student ID: " + studentId);
            return;
        }

        Student student = new Student(studentId);

        attendanceQueue.add(student);  
        attendanceSet.add(studentId);   
        undoStack.push(student);        

        System.out.println("[SUCCESS] Attendance added for Student ID: " + studentId);
    }

    // 2. SEARCH ATTENDANCE ------->>>>>>
    public static void searchAttendance(int studentId) {

        if (attendanceSet.contains(studentId)) {
            System.out.println("[RESULT] Student ID " + studentId + " is PRESENT");
        } else {
            System.out.println("[RESULT] Student ID " + studentId + " is NOT PRESENT");
        }
    }

    // 3. UNDO ATTENDANCE ------->>>
    public static void undoAttendance() {

        if (undoStack.isEmpty()) {
            System.out.println("[WARNING] No attendance record available to undo");
            return;
        }

        Student lastStudent = undoStack.pop();
        attendanceQueue.remove(lastStudent);
        attendanceSet.remove(lastStudent.getStudentId());

        System.out.println("[UNDO] Attendance undone for Student ID: "
                + lastStudent.getStudentId());
    }

    // 4. DISPLAY ALL ATTENDANCE ---------->>
    public static void displayAllAttendance() {

        if (attendanceQueue.isEmpty()) {
            System.out.println("[INFO] No students are currently present");
            return;
        }

        List<Student> attendanceList = new ArrayList<>(attendanceQueue);

        System.out.println("\n----- Present Students (Arrival Order) -----");
        for (Student student : attendanceList) {
            System.out.println("Student ID: " + student.getStudentId());
        }
        System.out.println("-------------------------------------------");
    }

    //  INPUT VALIDATION ---------->>
    public static int readStudentId(Scanner sc) {
        int id;
        while (true) {
            System.out.print("Enter Student ID (positive integer): ");
            id = sc.nextInt();
            if (id > 0) {
                return id;
            }
            System.out.println("[ERROR] Invalid ID. Please try again.");
        }
    }

    // ---------- MAIN METHOD ---------- 
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n --->>> Student Attendance Management System ---->>>");
            System.out.println("1. Add Attendance");
            System.out.println("2. Search Student Attendance");
            System.out.println("3. Undo Last Attendance");
            System.out.println("4. Display All Present Students");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");

            choice = sc.nextInt();

            switch (choice) {

                case 1:
                    addAttendance(readStudentId(sc));
                    break;

                case 2:
                    searchAttendance(readStudentId(sc));
                    break;

                case 3:
                    undoAttendance();
                    break;

                case 4:
                    displayAllAttendance();
                    break;

                case 5:
                    System.out.println("\n System closed successfully.");
                    System.out.println("Expected Outcome Achieved:");
                    System.out.println(" Add   Search  Undo   Display");
                    break;

                default:
                    System.out.println("[ERROR] Invalid choice. Please select 1–5.");
            }

        } while (choice != 5);

        sc.close();
    }
}




