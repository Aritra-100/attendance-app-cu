const supabase = require("../config/supabaseClient");

// Get student details
exports.getStudentsByBatch = async (req, res) => {
  const { batchId } = req.params;

  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select(
        `
        student_id,
        students!enrollments_student_id_fkey (
          student_id,
          roll_no,
          face_registered,
          attendance_percentage,
          users!students_user_id_fkey (
            name,
            email,
            department,
            avatar
          )
        )
      `,
      )
      .eq("batch_id", batchId);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }

    const formatted = data.map((e) => ({
      id: e.students.student_id,
      name: e.students.users?.name,
      email: e.students.users?.email,
      avatar: e.students.users?.avatar,
      department: e.students.users?.department,
      roll: e.students.roll_no,
      faceRegistered: e.students.face_registered,
      attendance: e.students.attendance_percentage || 0,
    }));

    res.json(formatted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ADD STUDENT
exports.addStudent = async (req, res) => {
  const { name, email, roll, batchId, department } = req.body;

  try {
    // 1. Create user
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          department,
          role: "student",
          avatar: "https://i.pravatar.cc/150",
        },
      ])
      .select()
      .single();

    if (userError) throw userError;

    // 2. Create student
    const { data: student, error: studentError } = await supabase
      .from("students")
      .insert([
        {
          user_id: user.id,
          roll_no: roll,
          attendance_percentage: 0,
        },
      ])
      .select()
      .single();

    if (studentError) throw studentError;

    // 3. Enroll student in batch
    const { error: enrollError } = await supabase.from("enrollments").insert([
      {
        student_id: student.student_id,
        batch_id: batchId,
      },
    ]);

    if (enrollError) throw enrollError;

    // 4. Increase batch student count
    await supabase.rpc("increment_student_count", { batch_id: batchId });

    res.json({
      id: student.student_id,
      name,
      roll,
      attendance: 0,
      faceRegistered: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Remove student from batch
exports.removeStudentFromBatch = async (req, res) => {
  const { id, batchId } = req.params;

  try {
    // Delete enrollment only
    const { error } = await supabase
      .from("enrollments")
      .delete()
      .eq("student_id", id)
      .eq("batch_id", batchId);

    if (error) throw error;

    // Decrement batch student count
    const { data: batch } = await supabase
      .from("batches")
      .select("total_students")
      .eq("id", batchId)
      .single();

    await supabase
      .from("batches")
      .update({ total_students: batch.total_students - 1 })
      .eq("id", batchId);

    res.json({ message: "Student removed from batch" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete student completely
exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Get user_id
    const { data: student } = await supabase
      .from("students")
      .select("user_id")
      .eq("student_id", studentId)
      .single();

    const userId = student.user_id;

    // Delete from users → cascade deletes everything
    await supabase.from("users").delete().eq("id", userId);

    res.json({ message: "Student deleted completely" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
