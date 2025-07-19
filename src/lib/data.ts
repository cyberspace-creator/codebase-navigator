import type { DirectoryNode } from './types';

export const directoryData: DirectoryNode = {
  name: 'motoverse-firebase',
  type: 'folder',
  children: [
    {
      name: 'functions',
      type: 'folder',
      comment: '# Cloud Functions backend',
      children: [
        { name: 'index.js', type: 'file' },
        {
          name: 'utils',
          type: 'folder',
          children: [{ name: 'aiSynth.js', type: 'file' }],
        },
      ],
    },
    {
      name: 'public',
      type: 'folder',
      comment: '# Frontend for Firebase Hosting',
      children: [
        { name: 'index.html', type: 'file' },
        { name: 'app.js', type: 'file' },
        {
          name: 'assets',
          type: 'folder',
          children: [{ name: 'avatars', type: 'folder', children: [] }],
        },
      ],
    },
    { name: 'firestore.rules', type: 'file', comment: '# Firestore security rules' },
    { name: 'firebase.json', type: 'file', comment: '# Firebase config' },
    { name: '.firebaserc', type: 'file', comment: '# Firebase project alias' },
  ],
};
