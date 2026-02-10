import { faker } from '@faker-js/faker';

let nextMotionStateId = 16;

function addMotionState(data, meetingId, workflowId, options = {}) {
  data[`motion_state`][`${nextMotionStateId}`] = Object.assign({
    "id": nextMotionStateId,
    "name": "default",
    "weight": 1,
    "css_class": "lightblue",
    "allow_support": true,
    "allow_create_poll": true,
    "allow_submitter_edit": true,
    "allow_amendment_forwarding": true,
    "set_number": true,
    "merge_amendment_into_final": "undefined",
    "next_state_ids": [],
    "previous_state_ids": [],
    "motion_ids": [],
    "workflow_id": workflowId,
    "first_state_of_workflow_id": workflowId,
    "restrictions": [],
    "show_state_extension_field": false,
    "show_recommendation_extension_field": false,
    "set_workflow_timestamp": true,
    "allow_motion_forwarding": true,
    "meeting_id": meetingId
  }, options);

  data[`meeting`][`${meetingId}`][`motion_state_ids`].push(nextMotionStateId);
  
  // Add this state to the workflow's state_ids array
  data[`motion_workflow`][`${workflowId}`][`state_ids`].push(nextMotionStateId);

  // Set the workflow's first_state_id if not already set
  if (!data[`motion_workflow`][`${workflowId}`][`first_state_id`]) {
    data[`motion_workflow`][`${workflowId}`][`first_state_id`] = nextMotionStateId;
  }
  
  nextMotionStateId++;

  return nextMotionStateId - 1;
}

export { addMotionState, nextMotionStateId };
