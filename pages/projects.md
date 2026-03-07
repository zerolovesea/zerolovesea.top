---
title: Projects - ZeroLoveSeA
display: Projects
description: List of projects that I am proud of
wrapperClass: 'text-center'
art: dots
projects:
  Current Focus:
    - name: 'AI DASH V2'
      link:
      desc: 'A React + Python data analytics reporting platform supporting multi-dimensional analysis, AI chat Q&A, and interactive visualization charts.'
    - name: 'NextRec'
      link:
      desc: 'A unified, efficient, and extensible PyTorch-based recommendation library, supporting DIEN, PLE, POSO, PEPNET, etc.'

  ML&Competitions:
    - name: 'Kaggle Notebooks'
      link: 'https://github.com/zerolovesea/Kaggle_Competitions'
      desc: 'My Repo for Kaggle competitons notebooks.'

    - name: 'Machine Learning Competitions'
      link: 'https://github.com/zerolovesea/Projects_Machine_Learning'
      desc: 'Some public machine learning competitions I have participated in.'

    - name: 'Computer Vision Backbones'
      link: 'https://github.com/zerolovesea/Computer_Vision_Clasification_Backbones'
      desc: 'Implementation of different cv backbone models.'

  Applications:
    - name: 'Photo Cleaner'
      link:
      desc: 'A photo album cleaning tool for iOS based on Swift.'
    - name: 'AI Dash'
      link:
      desc: 'A dashboard platform based on Streamlit, integrating data retrieval, visualization tools, and LLM.'
    - name: 'Master Chow'
      link: 'https://github.com/zerolovesea/master-chow'
      desc: 'A fortune teller who can predict your fortune through webcam, based on opencv&openai.'
---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
