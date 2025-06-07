---
title: Projects - ZeroLoveSeA
display: Projects
description: List of projects that I am proud of
wrapperClass: 'text-center'
art: dots
projects:
  Current Focus:
    - name: 'MLPiplineLib'
      link: 
      desc: 'An integrated Python library for data preprocessing and machine learning algorithms, supporting both Python and PySpark.'
    - name: 'RecLib'
      link: 
      desc: 'An integrated Python library implementing various recommendation algorithms, supporting industry-standard machine learning methods such as SVD, CF, NCF, MMOE, and PLE.'

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
