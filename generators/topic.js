import { faker } from '@faker-js/faker';

let nextTopicId = 9;

function addTopic(data, meetingId, options = {}) {
  data[`topic`][`${nextTopicId}`] = Object.assign({
    "id": nextTopicId,
    "title": faker.lorem.words({ min: 1, max: 5 }),
    "text": faker.lorem.paragraph(),
    "meeting_id": meetingId
  }, options);

  data[`meeting`][`${meetingId}`][`topic_ids`].push(nextTopicId);
  
  nextTopicId++;
  return nextTopicId - 1;
}

export { addTopic, nextTopicId };
