import { faker } from '@faker-js/faker';

let nextMotionSubmitterId = 5;

function addMotionSubmitter(data, meetingId, motionId, meetingUserId, options = {}) {
  data[`motion_submitter`][`${nextMotionSubmitterId}`] = Object.assign({
    "id": nextMotionSubmitterId,
    "weight": nextMotionSubmitterId,
    "meeting_user_id": meetingUserId,
    "motion_id": motionId,
    "meeting_id": meetingId
  }, options);

  data[`motion`][`${motionId}`][`submitter_ids`].push(nextMotionSubmitterId);
  data[`meeting`][`${meetingId}`][`motion_submitter_ids`].push(nextMotionSubmitterId);
  data[`meeting_user`][`${meetingUserId}`][`motion_submitter_ids`].push(nextMotionSubmitterId);
  
  nextMotionSubmitterId++;
  return nextMotionSubmitterId - 1;
}

export { addMotionSubmitter, nextMotionSubmitterId };
