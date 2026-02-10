import { readFileSync } from 'fs';
import { addUser, nextUserId } from './generators/user.js';
import { addMeetingUser } from './generators/meeting-user.js';
import { addCommittee } from './generators/committee.js';
import { addMeeting } from './generators/meeting.js';
import { addTopic } from './generators/topic.js';
import { addAgendaItem } from './generators/agenda-item.js';
import { addListOfSpeakers, addSpeaker } from './generators/list-of-speakers.js';
import { addAssignment, addAssignmentCandidate } from './generators/assignment.js';
import { addPoll, addOption, addVote } from './generators/poll.js';
import { faker } from '@faker-js/faker';

const fileData = readFileSync('./example-data.json');
const data = JSON.parse(fileData);

const NUM_COMMITTEES = 50;
const NUM_MEETINGS_PER_COMMITTEE = { min: 1, max: 8 };
const NUM_USERS = 2000;
const NUM_USERS_PER_MEETING = { min: 50, max: NUM_USERS };
const NUM_TOPICS_PER_MEETING = { min: 5, max: 20 };
const NUM_ASSIGNMENTS_PER_MEETING = { min: 1, max: 5 };

for (let i = nextUserId; i <= NUM_USERS; i++) {
  addUser(data);
}

for (let i = 4; i <= NUM_USERS; i++) {
  addMeetingUser(data, 1, i);
}

for (let cI = 2; cI <= NUM_COMMITTEES; cI++) {
  const committeeId = addCommittee(data);
  const addMeetingsAmount = faker.helpers.rangeToNumber(NUM_MEETINGS_PER_COMMITTEE);
  for (let mI = 1; mI <= addMeetingsAmount; mI++) {
    const meetingId = addMeeting(data, committeeId);
    const users = faker.helpers.arrayElements(data[`organization`][`1`][`user_ids`], NUM_USERS_PER_MEETING);
    for (let uId of users) {
      addMeetingUser(data, meetingId, uId);
    }
    
    const meetingUsers = data[`meeting`][`${meetingId}`][`meeting_user_ids`];
    
    // Generate topics with agenda items and list of speakers
    const numTopics = faker.helpers.rangeToNumber(NUM_TOPICS_PER_MEETING);
    for (let tI = 0; tI < numTopics; tI++) {
      const topicId = addTopic(data, meetingId);
      const agendaItemId = addAgendaItem(data, meetingId, `topic/${topicId}`);
      const listOfSpeakersId = addListOfSpeakers(data, meetingId, `topic/${topicId}`);
      
      // Link agenda item and list of speakers to topic
      data[`topic`][`${topicId}`][`agenda_item_id`] = agendaItemId;
      data[`topic`][`${topicId}`][`list_of_speakers_id`] = listOfSpeakersId;
      
      // Add some speakers to the list
      const numSpeakers = faker.number.int({ min: 0, max: 5 });
      if (meetingUsers && meetingUsers.length > 0) {
        for (let sI = 0; sI < numSpeakers && sI < meetingUsers.length; sI++) {
          const randomMeetingUserId = faker.helpers.arrayElement(meetingUsers);
          addSpeaker(data, meetingId, listOfSpeakersId, randomMeetingUserId);
        }
      }
    }
    
    // Generate assignments with candidates and polls
    const numAssignments = faker.helpers.rangeToNumber(NUM_ASSIGNMENTS_PER_MEETING);
    for (let aI = 0; aI < numAssignments; aI++) {
      const assignmentId = addAssignment(data, meetingId);
      const agendaItemId = addAgendaItem(data, meetingId, `assignment/${assignmentId}`);
      const listOfSpeakersId = addListOfSpeakers(data, meetingId, `assignment/${assignmentId}`);
      
      // Link agenda item and list of speakers to assignment
      data[`assignment`][`${assignmentId}`][`agenda_item_id`] = agendaItemId;
      data[`assignment`][`${assignmentId}`][`list_of_speakers_id`] = listOfSpeakersId;
      
      // Add candidates
      const numCandidates = faker.number.int({ min: 1, max: 5 });
      if (meetingUsers && meetingUsers.length > 0) {
        const candidates = faker.helpers.arrayElements(meetingUsers, Math.min(numCandidates, meetingUsers.length));
        for (let candidateMeetingUserId of candidates) {
          addAssignmentCandidate(data, meetingId, assignmentId, candidateMeetingUserId);
        }
        
        // Add assignment poll with options for candidates
        if (faker.datatype.boolean(0.7)) {
          const pollId = addPoll(data, meetingId, `assignment/${assignmentId}`);
          data[`assignment`][`${assignmentId}`][`poll_ids`].push(pollId);
          
          // Create options for each candidate
          for (let candidateMeetingUserId of candidates) {
            const userId = data[`meeting_user`][`${candidateMeetingUserId}`].user_id;
            const optionId = addOption(data, meetingId, pollId, `user/${userId}`);
            
            // Add some votes
            if (faker.datatype.boolean(0.5)) {
              const numVotes = faker.number.int({ min: 1, max: 3 });
              for (let vI = 0; vI < numVotes; vI++) {
                addVote(data, meetingId, optionId);
              }
            }
          }
        }
      }
      
      // Add some speakers to assignment list
      if (meetingUsers && meetingUsers.length > 0) {
        const numSpeakers = faker.number.int({ min: 0, max: 3 });
        for (let sI = 0; sI < numSpeakers && sI < meetingUsers.length; sI++) {
          const randomMeetingUserId = faker.helpers.arrayElement(meetingUsers);
          addSpeaker(data, meetingId, listOfSpeakersId, randomMeetingUserId);
        }
      }
    }
    
    // Note: Standalone polls are not generated here as polls must be tied to motions or assignments
    // Topics do not support poll_ids field
  }
}

console.log(
  JSON.stringify(data, (key, value) => key.endsWith(`_ids`) && value instanceof Array ? [...new Set(value)] : value)
);
