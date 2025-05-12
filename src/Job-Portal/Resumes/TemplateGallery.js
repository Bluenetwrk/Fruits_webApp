import React from 'react';
import './gallery.css';
import template1 from "../img/template1.png"
import template2 from "../img/template2.png"
const TemplateGallery = ({ onSelect }) => {
  return (
    <div className="template-gallery">
      <div className="template-card" onClick={() => onSelect('one')}>
        <img src={template1} alt="Template One" className="blurred" />
        <p>Template 1</p>
      </div>
      <div className="template-card" onClick={() => onSelect('two')}>
        <img src={template2} alt="Template Two" className="blurred" />
        <p>Template 2</p>
      </div>
    </div>
  );
};

export default TemplateGallery;


