const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const path = require('path');

const mentorsFile = path.join(__dirname, '../mentors.json');

let mentors = [];

async function loadMentors() {
  try {
    const data = await fs.readFile(mentorsFile, 'utf8');
    mentors = JSON.parse(data);
  } catch (err) {
    mentors = [];
  }
}

async function saveMentors() {
  await fs.writeFile(mentorsFile, JSON.stringify(mentors, null, 2));
}

loadMentors();

// GET /api/mentors
router.get('/', (req, res) => {
  res.json(mentors);
});

// POST /api/mentors
router.post('/', async (req, res) => {
  const { name, mentor_id, phone, subjects } = req.body;

  const newMentor = { id: Date.now().toString(), name, mentor_id, phone, subjects };

  mentors.push(newMentor);

  await saveMentors();

  res.json(newMentor);
});

// PUT /api/mentors/:id
router.put('/:id', async (req, res) => {
  const { name, mentor_id, phone, subjects } = req.body;

  const mentor = mentors.find(m => m.id === req.params.id);

  if (mentor) {
    mentor.name = name;
    mentor.mentor_id = mentor_id;
    mentor.phone = phone;
    mentor.subjects = subjects;

    await saveMentors();

    res.json(mentor);
  } else {
    res.status(404).json({ error: 'Mentor not found' });
  }
});

// DELETE /api/mentors/:id
router.delete('/:id', async (req, res) => {
  const index = mentors.findIndex(m => m.id === req.params.id);

  if (index !== -1) {
    mentors.splice(index, 1);

    await saveMentors();

    res.json({ message: 'Mentor deleted' });
  } else {
    res.status(404).json({ error: 'Mentor not found' });
  }
});

// Export to CSV
const { Parser } = require('json2csv');

router.get('/export', (req, res) => {
  const fields = ['name', 'mentor_id', 'phone', 'subjects'];

  const opts = { fields };

  const parser = new Parser(opts);

  const csv = parser.parse(mentors);

  res.header('Content-Type', 'text/csv');

  res.attachment('mentors.csv');

  res.send(csv);
});

module.exports = router;