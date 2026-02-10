# OpenSlides Data Generator

A data generator for OpenSlides that creates realistic test data including users, committees, meetings, topics, assignments, polls, and more.

## Installation

```bash
npm install
```

## Usage

1. Download the example data file:
```bash
curl -o example-data.json https://raw.githubusercontent.com/OpenSlides/openslides-backend/feature/relational-db/data/example-data.json
```

2. Run the generator:
```bash
node index.js > generated-data.json
```

The generator will create a large dataset with:
- 2000 users
- 50 committees
- Multiple meetings per committee
- Topics with agenda items and list of speakers
- Assignments with candidates and polls
- Polls with options and votes
- List of speakers with speakers

## Configuration

You can adjust the generation parameters in `index.js`:

```javascript
const NUM_COMMITTEES = 50;
const NUM_MEETINGS_PER_COMMITTEE = { min: 1, max: 8 };
const NUM_USERS = 2000;
const NUM_USERS_PER_MEETING = { min: 50, max: NUM_USERS };
const NUM_TOPICS_PER_MEETING = { min: 5, max: 20 };
const NUM_ASSIGNMENTS_PER_MEETING = { min: 1, max: 5 };
const NUM_POLLS_PER_MEETING = { min: 2, max: 8 };
```

## Generators

The following generators are available:

### Core Entities
- **user.js** - Generates users with demographics and authentication details
- **committee.js** - Creates committees within the organization
- **meeting.js** - Generates meetings with all required settings
- **meeting-user.js** - Links users to meetings with meeting-specific data

### Meeting Content
- **topic.js** - Creates topics for meetings with titles and text content
- **agenda-item.js** - Generates agenda items (common, internal, hidden types)
- **assignment.js** - Creates assignments with candidates for elections
- **poll.js** - Generates polls with options and votes (supports multiple types)
- **list-of-speakers.js** - Creates list of speakers with individual speakers

### Workflow
- **motion-workflow.js** - Sets up motion workflows
- **motion-state.js** - Configures motion states
- **group.js** - Creates permission groups

## Data Structure

Each generator:
- Follows the OpenSlides data model schema
- Maintains bidirectional relationships between entities
- Uses faker.js for realistic data generation
- Exports both the generator function and ID counter
- Updates all relevant `_ids` arrays in related objects

## Output

The generated JSON includes all entities with proper relationships:
- Topics linked to agenda items and list of speakers
- Assignments with candidates and polls
- Polls with options and votes
- Speakers linked to meeting users and list of speakers
- All entities properly linked to their parent meeting

The output is compatible with the OpenSlides backend data format.
