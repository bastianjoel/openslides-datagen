import { faker } from '@faker-js/faker';

let nextListOfSpeakersId = 17;
let nextSpeakerId = 14;

function addListOfSpeakers(data, meetingId, contentObjectId, options = {}) {
  data[`list_of_speakers`][`${nextListOfSpeakersId}`] = Object.assign({
    "id": nextListOfSpeakersId,
    "content_object_id": contentObjectId,
    "closed": faker.datatype.boolean(),
    "speaker_ids": [],
    "meeting_id": meetingId
  }, options);

  data[`meeting`][`${meetingId}`][`list_of_speakers_ids`].push(nextListOfSpeakersId);
  
  nextListOfSpeakersId++;
  return nextListOfSpeakersId - 1;
}

function addSpeaker(data, meetingId, listOfSpeakersId, meetingUserId, options = {}) {
  const speakerData = {
    "id": nextSpeakerId,
    "weight": nextSpeakerId,
    "list_of_speakers_id": listOfSpeakersId,
    "meeting_user_id": meetingUserId,
    "meeting_id": meetingId
  };
  
  // Optionally add begin_time and end_time
  if (faker.datatype.boolean(0.3)) {
    const beginTime = faker.date.past().getTime() / 1000;
    speakerData.begin_time = Math.floor(beginTime);
    if (faker.datatype.boolean()) {
      speakerData.end_time = Math.floor(beginTime + faker.number.int({ min: 60, max: 600 }));
    }
  }
  
  data[`speaker`][`${nextSpeakerId}`] = Object.assign(speakerData, options);

  data[`list_of_speakers`][`${listOfSpeakersId}`][`speaker_ids`].push(nextSpeakerId);
  data[`meeting`][`${meetingId}`][`speaker_ids`].push(nextSpeakerId);
  data[`meeting_user`][`${meetingUserId}`][`speaker_ids`].push(nextSpeakerId);
  
  nextSpeakerId++;
  return nextSpeakerId - 1;
}

export { addListOfSpeakers, nextListOfSpeakersId, addSpeaker, nextSpeakerId };
