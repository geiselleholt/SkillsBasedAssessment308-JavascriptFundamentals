// ******  INSTRUCTIONS  ********
// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
// {
//     // the ID of the learner for which this data has been collected
//     "id": number, ✅

//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number, ✅

//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number, ✅

//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores ✅

//     // Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment. ✅

//     // If an ag does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program. ✅
//     // You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? ✅
//     // Use try/catch and other logic to handle these types of errors gracefully. ✅




//******** GIVEN DATA *******/
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




//***** START OF CODE ******

function getLearnerData(course, ag, submissions) {
  let expectedOutput = [];
  let learnerIDs = [];

  try {                                                   // check if course id matches- if not throw error
    if (course.id !== ag.course_id) {
      throw `Invaid Input: Course ID does not match`;
    } else {
      for (let i = 0; i < submissions.length; i++) {      // finding all learner IDs and pushing to array 'learnerIDs'
        if (learnerIDs.includes(submissions[i].learner_id)) {
          continue;
        } else {
          learnerIDs.push(submissions[i].learner_id);
        }
      }

      let learnerData = [];
      learnerIDs.forEach((ID) => {   //looping thru the learnerIDs array
        let searchID = submissions.filter((item) => item.learner_id === ID);  // matching the learner ID to ag leaner-id
        for (let i = 0; i < ag.assignments.length; i++) {
          let assignment = searchID.filter(                                  //matching assignment-id in submissions to ag assignment.id 
            (item) => item.assignment_id === ag.assignments[i].id
          );
          if (assignment == false) {                                       //if the learner id doesn't have that assignment skip it
            continue;
          } else {
            try {                                                          //check if points-possible is 0 or less- if so throw error
              if (ag.assignments[i].points_possible <= 0) {
                throw `Invalid Input: Possible point can't be zero`;
              } else {
                const assignmentInfo = {                                  //create an object with each assignments info
                  score: assignment[0].submission.score,
                  pointsPossible: ag.assignments[i].points_possible,
                  learner_id: ID,
                  submittedAt: assignment[0].submission.submitted_at,
                  dueAt: ag.assignments[i].due_at,
                  assignment_id: ag.assignments[i].id,
                };
                learnerData.push(assignmentInfo);                         //push each assignment object into an array 'learner data'
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      });

      learnerData.forEach((data) => {                                  // loop the each assignment in learnerData
        if (data.dueAt < data.submittedAt) {
          data.score = data.score * 0.9;                              // if the assignment was late, deduct 10%
        }
        if (data.dueAt > "2025-03-22") {                              // if assignment isn't due yet, take it out of the array
          let index = learnerData.indexOf(data);
          learnerData.splice(index, 1);
        }
      });

      // console.log(learnerData)                                   //revised learnerData to use to build expected output
      //LEARNER DATA:
      // [
      //   {
      //     score: 47,
      //     pointsPossible: 50,
      //     learner_id: 125,
      //     submittedAt: '2023-01-25',
      //     dueAt: '2023-01-25',
      //     assignment_id: 1
      //   },
      //   {
      //     score: 150,
      //     pointsPossible: 150,
      //     learner_id: 125,
      //     submittedAt: '2023-02-12',
      //     dueAt: '2023-02-27',
      //     assignment_id: 2
      //   },
      //   {
      //     score: 39,
      //     pointsPossible: 50,
      //     learner_id: 132,
      //     submittedAt: '2023-01-24',
      //     dueAt: '2023-01-25',
      //     assignment_id: 1
      //   },
      //   {
      //     score: 126,
      //     pointsPossible: 150,
      //     learner_id: 132,
      //     submittedAt: '2023-03-07',
      //     dueAt: '2023-02-27',
      //     assignment_id: 2
      //   }
      // ]

      for (let i = 0; i < learnerData.length - 1; i++) {              //loop thru each assignment in learnerData
        const learnerObj = { id: learnerData[i].learner_id };         //create object 'learnerObj' for each learner's data, add id as aproperty
        let assignmentID = learnerData[i].assignment_id;              //create variable for assignment number to use as key for 1st assignment
        let assignmentPercentage2 =                                   // create variable for assignment % to use as value for 1st assigment
          learnerData[i].score / learnerData[i].pointsPossible;
        learnerObj[assignmentID] = assignmentPercentage2;             // add 1st assignment as a property to Learner Object
        learnerObj.avg = learnerData[i].score / learnerData[i].pointsPossible;  //add average as aproperty to Learner Object
        if (learnerData[i].learner_id == learnerData[i + 1].learner_id) {      //check if learner id matches learner id in the next assignment odject
          let assignmentID2 = learnerData[i + 1].assignment_id;               //if yes- create variable for assignment number to use as key for 2nd assignment
          let score = learnerData[i].score + learnerData[i + 1].score;       //combine scores together
          let pointsPossible =                                                  //combine possible points together
            learnerData[i].pointsPossible + learnerData[i + 1].pointsPossible;
          learnerObj.avg = score / pointsPossible;                           // replace previous ave property in learnerObj
          learnerObj[assignmentID2] =                                         //// add 2nd assignment as a property to Learner Object
            learnerData[i + 1].score / learnerData[i + 1].pointsPossible;
        }
        expectedOutput.push(learnerObj);
      }
    }
  } catch (err) {
    console.log(err);
  }
  return expectedOutput;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

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
