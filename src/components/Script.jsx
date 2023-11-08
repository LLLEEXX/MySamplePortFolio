
import { useState } from 'react';

export const smoothScroll = (sectionId) => {
  const section = document.getElementById(sectionId);

  if(section){
    section.scrollIntoView({behavior: 'smooth'})
  }
};






