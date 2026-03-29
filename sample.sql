-- This is just a sample sql query to add example data for developing

-- Delete child tables first
DELETE FROM student_attendances;
DELETE FROM batch_attendances;
DELETE FROM lecture_schedule;
DELETE FROM lecture_curriculum_topics;
DELETE FROM lecture_curriculum;
DELETE FROM enrollments;
DELETE FROM students;
DELETE FROM batches;
DELETE FROM teachers;
DELETE FROM users;

INSERT INTO users (id,name,email,department,institution,role,avatar,password) VALUES
('11111111-1111-4111-8111-111111111111','Dr. Raj Sharma','raj@college.edu','Computer Science','ABC College','teacher','https://i.pravatar.cc/150?img=1','hashedpass'),
('22222222-2222-4222-8222-222222222222','Prof. Meera Iyer','meera@college.edu','Electronics','ABC College','teacher','https://i.pravatar.cc/150?img=2','hashedpass'),
('33333333-3333-4333-8333-333333333333','Amit Das','amit@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=3','hashedpass'),
('44444444-4444-4444-8444-444444444444','Neha Singh','neha@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=4','hashedpass'),
('55555555-5555-4555-8555-555555555555','Rahul Roy','rahul@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=5','hashedpass'),
('66666666-6666-4666-8666-666666666666','Priya Nair','priya@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=6','hashedpass'),
('77777777-7777-4777-8777-777777777777','Karan Mehta','karan@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=7','hashedpass'),
('88888888-8888-4888-8888-888888888888','Sneha Paul','sneha@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=8','hashedpass'),
('99999999-9999-4999-8999-999999999999','Arjun Patel','arjun@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=9','hashedpass'),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','Riya Ghosh','riya@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=10','hashedpass'),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','Vikram Rao','vikram@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=11','hashedpass'),
('cccccccc-cccc-4ccc-8ccc-cccccccccccc','Pooja Verma','pooja@student.edu','Computer Science','ABC College','student','https://i.pravatar.cc/150?img=12','hashedpass');

INSERT INTO teachers (teacher_id,default_mode,default_threshold) VALUES
('11111111-1111-4111-8111-111111111111','manual',75),
('22222222-2222-4222-8222-222222222222','manual',75);

INSERT INTO batches (id,name,batch_code,threshold,total_students,teacher_id) VALUES
('d1111111-1111-4111-8111-111111111111','CS Semester 5','CS5',75,5,'11111111-1111-4111-8111-111111111111'),
('d2222222-2222-4222-8222-222222222222','CS Semester 3','CS3',75,5,'22222222-2222-4222-8222-222222222222');

INSERT INTO students (student_id,user_id,roll_no,attendance_percentage,face_registered) VALUES
('e1111111-1111-4111-8111-111111111111','33333333-3333-4333-8333-333333333333','20CS001',80,true),
('e2222222-2222-4222-8222-222222222222','44444444-4444-4444-8444-444444444444','20CS002',60,false),
('e3333333-3333-4333-8333-333333333333','55555555-5555-4555-8555-555555555555','20CS003',70,true),
('e4444444-4444-4444-8444-444444444444','66666666-6666-4666-8666-666666666666','20CS004',90,true),
('e5555555-5555-4555-8555-555555555555','77777777-7777-4777-8777-777777777777','20CS005',50,false),
('e6666666-6666-4666-8666-666666666666','88888888-8888-4888-8888-888888888888','20CS006',85,true),
('e7777777-7777-4777-8777-777777777777','99999999-9999-4999-8999-999999999999','20CS007',40,false),
('e8888888-8888-4888-8888-888888888888','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','20CS008',75,true),
('e9999999-9999-4999-8999-999999999999','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','20CS009',65,false),
('efffffff-ffff-4fff-8fff-ffffffffffff','cccccccc-cccc-4ccc-8ccc-cccccccccccc','20CS010',88,true);

INSERT INTO enrollments (id,batch_id,student_id) VALUES
('f1111111-1111-4111-8111-111111111111','d1111111-1111-4111-8111-111111111111','e1111111-1111-4111-8111-111111111111'),
('f2222222-2222-4222-8222-222222222222','d1111111-1111-4111-8111-111111111111','e2222222-2222-4222-8222-222222222222'),
('f3333333-3333-4333-8333-333333333333','d1111111-1111-4111-8111-111111111111','e3333333-3333-4333-8333-333333333333'),
('f4444444-4444-4444-8444-444444444444','d1111111-1111-4111-8111-111111111111','e4444444-4444-4444-8444-444444444444'),
('f5555555-5555-4555-8555-555555555555','d1111111-1111-4111-8111-111111111111','e5555555-5555-4555-8555-555555555555'),
('f6666666-6666-4666-8666-666666666666','d2222222-2222-4222-8222-222222222222','e6666666-6666-4666-8666-666666666666'),
('f7777777-7777-4777-8777-777777777777','d2222222-2222-4222-8222-222222222222','e7777777-7777-4777-8777-777777777777'),
('f8888888-8888-4888-8888-888888888888','d2222222-2222-4222-8222-222222222222','e8888888-8888-4888-8888-888888888888'),
('f9999999-9999-4999-8999-999999999999','d2222222-2222-4222-8222-222222222222','e9999999-9999-4999-8999-999999999999'),
('faaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','d2222222-2222-4222-8222-222222222222','efffffff-ffff-4fff-8fff-ffffffffffff');

INSERT INTO lecture_curriculum (id,batch_id,created_at) VALUES
('a1111111-1111-4111-8111-111111111111','d1111111-1111-4111-8111-111111111111','2025-01-01'),
('a2222222-2222-4222-8222-222222222222','d2222222-2222-4222-8222-222222222222','2025-01-01');

INSERT INTO lecture_curriculum_topics (id,curriculum_id,unit_name,topic_name) VALUES
('b1111111-1111-4111-8111-111111111111','a1111111-1111-4111-8111-111111111111','Unit 1','Introduction to Algorithms'),
('b2222222-2222-4222-8222-222222222222','a1111111-1111-4111-8111-111111111111','Unit 1','Time Complexity'),
('b3333333-3333-4333-8333-333333333333','a1111111-1111-4111-8111-111111111111','Unit 2','Sorting Algorithms'),
('b4444444-4444-4444-8444-444444444444','a1111111-1111-4111-8111-111111111111','Unit 2','Searching Algorithms'),
('b5555555-5555-4555-8555-555555555555','a2222222-2222-4222-8222-222222222222','Unit 1','Digital Logic Basics'),
('b6666666-6666-4666-8666-666666666666','a2222222-2222-4222-8222-222222222222','Unit 1','Boolean Algebra'),
('b7777777-7777-4777-8777-777777777777','a2222222-2222-4222-8222-222222222222','Unit 2','Flip Flops'),
('b8888888-8888-4888-8888-888888888888','a2222222-2222-4222-8222-222222222222','Unit 2','Counters');

INSERT INTO lecture_schedule (id,batch_id,topic_id,week_no,planned_date,classes,objectives) VALUES
('c1111111-1111-4111-8111-111111111111','d1111111-1111-4111-8111-111111111111','b1111111-1111-4111-8111-111111111111',1,'2025-01-05',2,'Understand basic algorithm concepts'),
('c2222222-2222-4222-8222-222222222222','d1111111-1111-4111-8111-111111111111','b2222222-2222-4222-8222-222222222222',2,'2025-01-12',2,'Analyze time complexity'),
('c3333333-3333-4333-8333-333333333333','d1111111-1111-4111-8111-111111111111','b3333333-3333-4333-8333-333333333333',3,'2025-01-19',3,'Learn sorting algorithms'),
('c4444444-4444-4444-8444-444444444444','d1111111-1111-4111-8111-111111111111','b4444444-4444-4444-8444-444444444444',4,'2025-01-26',2,'Learn searching algorithms');

INSERT INTO student_attendances (id,student_id,batch_id,date,present) VALUES
('d1111111-1111-4111-8111-111111111111','e1111111-1111-4111-8111-111111111111','d1111111-1111-4111-8111-111111111111','2025-01-05',true),
('d2222222-2222-4222-8222-222222222222','e2222222-2222-4222-8222-222222222222','d1111111-1111-4111-8111-111111111111','2025-01-05',false);

INSERT INTO batch_attendances (id,batch_id,attendance_percentage,presences,date) VALUES
('ba111111-1111-4111-8111-111111111111','d1111111-1111-4111-8111-111111111111',60,3,'2025-01-05'),
('ba222222-2222-4222-8222-222222222222','d2222222-2222-4222-8222-222222222222',50,2,'2025-01-05');