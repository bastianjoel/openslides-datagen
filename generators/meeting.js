import { faker } from '@faker-js/faker';
import { addDefaultWorkflow } from './motion-workflow.js';
import { addDefaultGroups } from './group.js';
import { addProjector } from './projector.js';

let nextMeetingId = 2;

function addMeeting(data, committeeId, options = {}) {
  data[`meeting`][`${nextMeetingId}`] = Object.assign(structuredClone(data[`meeting`][`1`]), {
    "id": nextMeetingId,
    "name": faker.lorem.words({ min: 1, max: 4}),
    "description": faker.lorem.sentence(),
    "welcome_title": faker.lorem.sentence(),
    "welcome_text": faker.lorem.text(),
    "committee_id": committeeId,
    "default_meeting_for_committee_id": null,
    "motions_default_workflow_id": null,
    "motions_default_amendment_workflow_id": null,
    "list_of_speakers_countdown_id": null,
    "poll_countdown_id": null,
    "default_group_id": null,
    "admin_group_id": null,
    "motion_poll_default_group_ids": [],
    "assignment_poll_default_group_ids": [],
    "poll_default_group_ids": [],
    "meeting_user_ids": [],
    "all_projection_ids": [],
    "projector_message_ids": [],
    "projector_countdown_ids": [],
    "tag_ids": [],
    "agenda_item_ids": [],
    "list_of_speakers_ids": [],
    "speaker_ids": [],
    "topic_ids": [],
    "group_ids": [],
    "mediafile_ids": [],
    "motion_ids": [],
    "motion_submitter_ids": [],
    "motion_supporter_ids": [],
    "motion_comment_section_ids": [],
    "motion_comment_ids": [],
    "motion_state_ids": [],
    "motion_category_ids": [],
    "motion_block_ids": [],
    "motion_workflow_ids": [],
    "motion_change_recommendation_ids": [],
    "poll_ids": [],
    "option_ids": [],
    "vote_ids": [],
    "assignment_ids": [],
    "assignment_candidate_ids": [],
    "personal_note_ids": [],
    "chat_group_ids": [],
    "organization_tag_ids": [],
    "structure_level_ids": [],
    "present_user_ids": [],
    "user_ids": [],
    "reference_projector_id": null,
    "projector_ids": [],
    "default_projector_agenda_item_list_ids": [],
    "default_projector_topic_ids": [],
    "default_projector_list_of_speakers_ids": [],
    "default_projector_current_los_ids": [],
    "default_projector_motion_ids": [],
    "default_projector_amendment_ids": [],
    "default_projector_motion_block_ids": [],
    "default_projector_assignment_ids": [],
    "default_projector_mediafile_ids": [],
    "default_projector_message_ids": [],
    "default_projector_countdown_ids": [],
    "default_projector_assignment_poll_ids": [],
    "default_projector_motion_poll_ids": [],
    "default_projector_poll_ids": [],
    "projection_ids": [],
    "meeting_mediafile_ids": []
  }, options);

  data[`committee`][`${committeeId}`][`meeting_ids`].push(nextMeetingId);
  if (data[`committee`][`${committeeId}`][`default_meeting_id`] === null) {
    data[`committee`][`${committeeId}`][`default_meeting_id`] = nextMeetingId;
    data[`meeting`][`${nextMeetingId}`][`default_meeting_for_committee_id`] = committeeId;
  } else {
    delete data[`meeting`][`${nextMeetingId}`][`default_meeting_for_committee_id`];
  }

  data[`organization`][`1`][`active_meeting_ids`].push(nextMeetingId);
  
  // Create a default projector for the meeting
  const projectorId = addProjector(data, nextMeetingId, "Default projector", {
    "used_as_reference_projector_meeting_id": nextMeetingId,
    "used_as_default_projector_for_agenda_item_list_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_topic_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_motion_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_amendment_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_motion_block_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_assignment_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_mediafile_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_message_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_countdown_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_assignment_poll_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_motion_poll_in_meeting_id": nextMeetingId,
    "used_as_default_projector_for_poll_in_meeting_id": nextMeetingId
  });
  
  // Set the meeting's projector references
  data[`meeting`][`${nextMeetingId}`][`reference_projector_id`] = projectorId;
  data[`meeting`][`${nextMeetingId}`][`default_projector_agenda_item_list_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_topic_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_list_of_speakers_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_current_los_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_motion_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_amendment_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_motion_block_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_assignment_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_mediafile_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_message_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_countdown_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_assignment_poll_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_motion_poll_ids`] = [projectorId];
  data[`meeting`][`${nextMeetingId}`][`default_projector_poll_ids`] = [projectorId];
  
  addDefaultWorkflow(data, nextMeetingId);
  addDefaultGroups(data, nextMeetingId);
  nextMeetingId++;

  return nextMeetingId - 1;
}

export { addMeeting, nextMeetingId };
