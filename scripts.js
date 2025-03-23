//INSTRUCTIONS:
// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
// {
//     // the ID of the learner for which this data has been collected
//     "id": number,

//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,

//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,

//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores

//     // Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
// }

// Afterwards, alter the data to test for edge cases, error handling, and other potential issues.
// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
// You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string?
// Use try/catch and other logic to handle these types of errors gracefully.

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

//START OF CODE

let expectedOutput = [];
let learnerIDs = [];

for (let i = 0; i < LearnerSubmissions.length; i++) {
  if (learnerIDs.includes(LearnerSubmissions[i].learner_id)) {
    continue;
  } else {
    learnerIDs.push(LearnerSubmissions[i].learner_id);
    // let learnerData = { id: LearnerSubmissions[i].learner_id };
    // expectedOutput.push(learnerData);
  }
}

let learnerData = [];
learnerIDs.forEach((ID) => {
  let searchID = LearnerSubmissions.filter((item) => item.learner_id === ID);
  for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
    let assignment = searchID.filter(
      (item) => item.assignment_id === AssignmentGroup.assignments[i].id
    );
    if (assignment == false) {
      continue;
    } else {
      let assignmentInfo = {
        score: assignment[0].submission.score,
        pointsPossible: AssignmentGroup.assignments[i].points_possible,
        learner_id: ID,
        submittedAt: assignment[0].submission.submitted_at,
        dueAt: AssignmentGroup.assignments[i].due_at,
        assignment_id: AssignmentGroup.assignments[i].id,
      };
      learnerData.push(assignmentInfo);
    }
  }
});


learnerData.forEach((data) => {
  if (data.dueAt < data.submittedAt) {
    data.score = data.score * 0.9;
  }
  if (data.dueAt > "2025-03-22") {
    let index = learnerData.indexOf(data);
    learnerData.splice(index, 1);
  }
});
// console.log(learnerData)

let learnerIDs2 = [];
for (let i = 0; i < learnerData.length - 1; i++){
  let assignmentPercentage2 = learnerData[i].score / learnerData[i].pointsPossible;
  let learnerObj = {id: learnerData[i].learner_id, 1: assignmentPercentage2 }
  if (learnerData[i].learner_id == learnerData[i + 1].learner_id) {
    let score = learnerData[i].score + learnerData[i + 1].score;
    let pointsPossible = learnerData[i].pointsPossible + learnerData[i + 1].pointsPossible
    let average = score / pointsPossible;
    let assignmentID = learnerData[i + 1].assignment_id
    assignmentPercentage = learnerData[i + 1].score / learnerData[i + 1].pointsPossible
    learnerObj.avg = average;
    learnerObj[assignmentID] = assignmentPercentage;
  
    expectedOutput.push(learnerObj)
  }
}
console.log(expectedOutput)

// EXPECTED OUTPUT:
//  [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];
