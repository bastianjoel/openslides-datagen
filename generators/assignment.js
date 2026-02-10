import { faker } from '@faker-js/faker';

let nextAssignmentId = 3;
let nextAssignmentCandidateId = 6;

function addAssignment(data, meetingId, options = {}) {
  const phase = faker.helpers.arrayElement(['search', 'voting', 'finished']);
  
  data[`assignment`][`${nextAssignmentId}`] = Object.assign({
    "id": nextAssignmentId,
    "title": faker.lorem.words({ min: 1, max: 4 }),
    "description": faker.datatype.boolean() ? `<p>${faker.lorem.sentence()}</p>` : undefined,
    "open_posts": faker.number.int({ min: 1, max: 5 }),
    "phase": phase,
    "number_poll_candidates": faker.datatype.boolean(),
    "candidate_ids": [],
    "poll_ids": [],
    "meeting_id": meetingId
  }, options);
  
  // Remove description if undefined
  if (!data[`assignment`][`${nextAssignmentId}`].description) {
    delete data[`assignment`][`${nextAssignmentId}`].description;
  }

  data[`meeting`][`${meetingId}`][`assignment_ids`].push(nextAssignmentId);
  
  nextAssignmentId++;
  return nextAssignmentId - 1;
}

function addAssignmentCandidate(data, meetingId, assignmentId, meetingUserId, options = {}) {
  data[`assignment_candidate`][`${nextAssignmentCandidateId}`] = Object.assign({
    "id": nextAssignmentCandidateId,
    "weight": nextAssignmentCandidateId,
    "assignment_id": assignmentId,
    "meeting_user_id": meetingUserId,
    "meeting_id": meetingId
  }, options);

  data[`assignment`][`${assignmentId}`][`candidate_ids`].push(nextAssignmentCandidateId);
  data[`meeting`][`${meetingId}`][`assignment_candidate_ids`].push(nextAssignmentCandidateId);
  data[`meeting_user`][`${meetingUserId}`][`assignment_candidate_ids`].push(nextAssignmentCandidateId);
  
  nextAssignmentCandidateId++;
  return nextAssignmentCandidateId - 1;
}

export { addAssignment, nextAssignmentId, addAssignmentCandidate, nextAssignmentCandidateId };
