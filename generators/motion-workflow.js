import { addMotionState } from './motion-state.js';

let nextMotionWorkflowId = 2;

function addDefaultWorkflow(data, meetingId, options = {}) {
  data[`motion_workflow`][`${nextMotionWorkflowId}`] = Object.assign({
    "id": nextMotionWorkflowId,
    "name": "Simple Workflow",
    "sequential_number": Object.values(data[`motion_workflow`]).length,
    "state_ids": [],
    "first_state_id": null,
    "default_workflow_meeting_id": meetingId,
    "default_amendment_workflow_meeting_id": meetingId,
    "default_statute_amendment_workflow_meeting_id": meetingId,
    "meeting_id": meetingId
  }, options);

  data[`meeting`][`${meetingId}`][`motion_workflow_ids`].push(nextMotionWorkflowId);
  data[`meeting`][`${meetingId}`][`motions_default_workflow_id`] = nextMotionWorkflowId;
  data[`meeting`][`${meetingId}`][`motions_default_amendment_workflow_id`] = nextMotionWorkflowId;
  data[`meeting`][`${meetingId}`][`motions_default_statute_amendment_workflow_id`] = nextMotionWorkflowId;
  addMotionState(data, meetingId, nextMotionWorkflowId);
  nextMotionWorkflowId++;

  return nextMotionWorkflowId - 1;
}

export { addDefaultWorkflow, nextMotionWorkflowId };
