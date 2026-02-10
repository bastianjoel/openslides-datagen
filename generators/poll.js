import { faker } from '@faker-js/faker';

let nextPollId = 6;
let nextOptionId = 14;
let nextVoteId = 10;

function addPoll(data, meetingId, contentObjectId, options = {}) {
  const type = faker.helpers.arrayElement(['analog', 'named', 'pseudoanonymous']);
  const pollmethod = faker.helpers.arrayElement(['Y', 'YN', 'YNA', 'N']);
  const state = faker.helpers.arrayElement(['created', 'started', 'finished']);
  const backend = 'fast';
  
  const globalYes = faker.datatype.boolean();
  const globalNo = faker.datatype.boolean();
  const globalAbstain = faker.datatype.boolean();
  
  const pollData = {
    "id": nextPollId,
    "title": faker.lorem.words({ min: 1, max: 3 }),
    "type": type,
    "backend": backend,
    "pollmethod": pollmethod,
    "state": state,
    "min_votes_amount": 1,
    "max_votes_amount": 1,
    "max_votes_per_option": 1,
    "global_yes": globalYes,
    "global_no": globalNo,
    "global_abstain": globalAbstain,
    "onehundred_percent_base": pollmethod === 'Y' ? 'Y' : pollmethod === 'YN' ? 'YN' : 'YNA',
    "content_object_id": contentObjectId,
    "option_ids": [],
    "meeting_id": meetingId,
    "live_voting_enabled": false
  };
  
  // Add vote counts if poll is finished
  if (state === 'finished') {
    pollData.votesvalid = faker.number.float({ min: 0, max: 100, fractionDigits: 6 }).toFixed(6);
    pollData.votesinvalid = faker.number.float({ min: 0, max: 20, fractionDigits: 6 }).toFixed(6);
    pollData.votescast = faker.number.float({ min: 0, max: 120, fractionDigits: 6 }).toFixed(6);
  }
  
  data[`poll`][`${nextPollId}`] = Object.assign(pollData, options);

  data[`meeting`][`${meetingId}`][`poll_ids`].push(nextPollId);
  
  nextPollId++;
  return nextPollId - 1;
}

function addOption(data, meetingId, pollId, contentObjectId, options = {}) {
  data[`option`][`${nextOptionId}`] = Object.assign({
    "id": nextOptionId,
    "yes": "0.000000",
    "no": "0.000000",
    "abstain": "0.000000",
    "weight": nextOptionId,
    "poll_id": pollId,
    "content_object_id": contentObjectId,
    "vote_ids": [],
    "meeting_id": meetingId
  }, options);

  data[`poll`][`${pollId}`][`option_ids`].push(nextOptionId);
  data[`meeting`][`${meetingId}`][`option_ids`].push(nextOptionId);
  
  // Update the content object's option_ids if it's a user
  if (contentObjectId && contentObjectId.startsWith('user/')) {
    const userId = parseInt(contentObjectId.split('/')[1]);
    if (data[`user`][`${userId}`]) {
      data[`user`][`${userId}`][`option_ids`].push(nextOptionId);
    }
  }
  
  nextOptionId++;
  return nextOptionId - 1;
}

function addVote(data, meetingId, optionId, options = {}) {
  const value = faker.helpers.arrayElement(['Y', 'N', 'A']);
  const weight = faker.number.float({ min: 0, max: 10, fractionDigits: 6 }).toFixed(6);
  
  data[`vote`][`${nextVoteId}`] = Object.assign({
    "id": nextVoteId,
    "weight": weight,
    "value": value,
    "user_token": faker.string.alphanumeric(16),
    "option_id": optionId,
    "meeting_id": meetingId
  }, options);

  data[`option`][`${optionId}`][`vote_ids`].push(nextVoteId);
  data[`meeting`][`${meetingId}`][`vote_ids`].push(nextVoteId);
  
  // If user_id is provided, update user relations
  if (data[`vote`][`${nextVoteId}`].user_id) {
    const userId = data[`vote`][`${nextVoteId}`].user_id;
    if (data[`user`][`${userId}`]) {
      data[`user`][`${userId}`][`vote_ids`].push(nextVoteId);
    }
  }
  
  nextVoteId++;
  return nextVoteId - 1;
}

export { addPoll, nextPollId, addOption, nextOptionId, addVote, nextVoteId };
