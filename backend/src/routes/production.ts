import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

let photoWorkflows: any[] = [];
let videoWorkflows: any[] = [];

// Photo Workflow
router.get('/photo', authenticate, (req, res) => {
  res.status(200).json({ workflows: photoWorkflows });
});

router.post('/photo', authenticate, (req, res) => {
  const workflow = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    stage: 'backup',
    progressPercentage: 0,
    createdAt: new Date(),
  };
  photoWorkflows.push(workflow);
  res.status(201).json(workflow);
});

router.patch('/photo/:id/stage', authenticate, (req, res) => {
  const workflow = photoWorkflows.find(w => w.id === req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  workflow.stage = req.body.stage;
  workflow.progressPercentage = req.body.progressPercentage || workflow.progressPercentage;
  res.status(200).json(workflow);
});

// Video Workflow
router.get('/video', authenticate, (req, res) => {
  res.status(200).json({ workflows: videoWorkflows });
});

router.post('/video', authenticate, (req, res) => {
  const workflow = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    stage: 'backup',
    progressPercentage: 0,
    createdAt: new Date(),
  };
  videoWorkflows.push(workflow);
  res.status(201).json(workflow);
});

router.patch('/video/:id/stage', authenticate, (req, res) => {
  const workflow = videoWorkflows.find(w => w.id === req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  workflow.stage = req.body.stage;
  workflow.progressPercentage = req.body.progressPercentage || workflow.progressPercentage;
  res.status(200).json(workflow);
});

export default router;