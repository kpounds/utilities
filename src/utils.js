// function to interpolate data between a template and data of object. 
// Regex matches mustache formatted values in the template and replaces them with the matching data.
function interpolateData(template, data) {
  let rendered = template;
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    rendered = rendered.replace(
      regex,
      typeof data[key] === 'undefined' ? '' : data[key]
    );
  });
  return rendered;
}

// jQuery free way to change CSS attribute by ID 
function changeCSS(id, attribute, value) {
  document.getElementById(id).style[attribute] = value;
};
